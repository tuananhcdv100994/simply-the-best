import React, { useState, useContext, useEffect, useCallback } from 'react';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { ContentProvider, ContentContext } from './contexts/ContentContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import CommunityShowcase from './components/CommunityShowcase';
import Leaderboard from './components/Leaderboard';
import Events from './components/Events';
import Merchandise from './components/Merchandise';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import Register from './components/Register';
import PostEditor from './components/admin/PostEditor';
import ProductEditorModal from './components/admin/ProductEditorModal';
import type { SiteContent, Post, Product, Partner, GuideStep, MediaItem, User, Comment } from './types';
import CommunityStats from './components/CommunityStats';
import Challenges from './components/Challenges';
import PartnersComponent from './components/Partners';
import CTA from './components/CTA';
import MobileBottomNav from './components/MobileBottomNav';
import AIAssistantChat from './components/AIAssistantChat';
import { getGuide } from './services/GuideService';
import OnlineUsers from './components/OnlineUsers';
import ActionPopup from './components/ActionPopup';
import NewsSection from './components/NewsSection';
import PostDetail from './components/PostDetail';
import EditModeBar from './components/EditModeBar';

type View = 'home' | 'admin' | 'login' | 'register' | 'postEditor' | 'profile' | 'postDetail';

const HomePageContent: React.FC<{ onNavigate: (view: View, data?: any) => void, isEditing: boolean }> = ({ onNavigate, isEditing }) => {
    const contentCtx = useContext(ContentContext);
    const authCtx = useContext(AuthContext);

    if (!contentCtx || !authCtx) return null;
    const { siteContent, posts, products, partners } = contentCtx;

    return (
        <>
            <main>
                <Hero 
                    title={siteContent.heroTitle} 
                    slogan={siteContent.heroSlogan} 
                    subtitle={siteContent.heroSubtitle}
                    imageUrl={siteContent.heroImageUrl}
                    isEditing={isEditing}
                />
                <CommunityStats />
                <Leaderboard />
                <About title={siteContent.aboutTitle} subtitle={siteContent.aboutSubtitle} isEditing={isEditing} />
                <Challenges />
                <OnlineUsers users={authCtx.users} />
                <CommunityShowcase posts={posts.filter(p => p.id < 100)} onNavigate={onNavigate} />
                <NewsSection onNavigate={onNavigate} posts={posts.filter(p => p.id >= 100)} />
                <Events />
                <Merchandise products={products} />
                <PartnersComponent partners={partners} />
                <CTA />
                <UserProfile />
            </main>
            <Footer />
        </>
    );
}


const AppContent: React.FC = () => {
    const [view, setView] = useState<View>('home');
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    
    const [isChatOpen, setChatOpen] = useState(false);
    const [isGuiding, setIsGuiding] = useState(false);
    const [guideSteps, setGuideSteps] = useState<GuideStep[]>([]);
    const [currentGuideStep, setCurrentGuideStep] = useState(0);

    const [isEditing, setIsEditing] = useState(false);
    const [tempSiteContent, setTempSiteContent] = useState<SiteContent | null>(null);

    const auth = useContext(AuthContext);
    const content = useContext(ContentContext);

    useEffect(() => {
        const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
        if (!hasSeenWelcome) {
            setTimeout(() => {
                setChatOpen(true);
                sessionStorage.setItem('hasSeenWelcome', 'true');
            }, 2000);
        }
    }, []);

    const startGuide = (guideName: string) => {
        const guide = getGuide(guideName);
        if (guide) {
            const navigateToAdminAndGuide = () => {
                navigate('admin');
                setTimeout(() => {
                    setGuideSteps(guide);
                    setCurrentGuideStep(0);
                    setIsGuiding(true);
                    setChatOpen(false);
                }, 500);
            };

            if (guideName.includes('post') && auth?.currentUser?.role === 'Admin') {
                if (view !== 'admin') {
                    navigateToAdminAndGuide();
                } else {
                    setGuideSteps(guide);
                    setCurrentGuideStep(0);
                    setIsGuiding(true);
                    setChatOpen(false);
                }
            }
        }
    };
    
    const stopGuide = () => {
        setIsGuiding(false);
        setGuideSteps([]);
        setCurrentGuideStep(0);
    }
    
     const nextGuideStep = () => {
        if (currentGuideStep < guideSteps.length - 1) {
            setCurrentGuideStep(prev => prev + 1);
        } else {
            stopGuide();
        }
    };
    
    useEffect(() => {
        if (isGuiding && guideSteps.length > 0) {
            const step = guideSteps[currentGuideStep];
            const element = document.querySelector(`[data-guide-id='${step.elementId}']`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [isGuiding, currentGuideStep, guideSteps, view]);


    const navigate = (newView: View, data?: any) => {
        if (newView === 'postEditor') {
            setEditingPost(data as Post || null);
        } else if (newView === 'postDetail') {
            setSelectedPost(data as Post);
        } else {
            setSelectedPost(null);
        }
        window.scrollTo(0, 0);
        setView(newView);
    };
    
    const handleSavePost = (postToSave: Post) => {
        content?.handleSavePost(postToSave, auth?.currentUser?.name || 'Admin');
        navigate('admin', {subView: 'posts'});
    };

    const handleLikePost = (postId: number) => {
        const post = content?.posts.find(p => p.id === postId);
        if (post && content) {
            const updatedPost = { ...post, likes: post.likes + 1 };
            content.updatePost(updatedPost);
            if (selectedPost && selectedPost.id === postId) {
                setSelectedPost(updatedPost);
            }
        }
    };

    const handleAddComment = (postId: number, commentText: string) => {
        if (!auth?.currentUser || !content) return;
        const post = content.posts.find(p => p.id === postId);
        if(post) {
            const newComment: Comment = {
                id: Date.now(),
                author: auth.currentUser.name,
                avatarUrl: auth.currentUser.avatarUrl,
                text: commentText,
                date: 'Vừa xong'
            };
            const updatedPost = { ...post, comments: [...post.comments, newComment] };
            content.updatePost(updatedPost);
            if (selectedPost && selectedPost.id === postId) {
                setSelectedPost(updatedPost);
            }
        }
    };
    
    const handleSaveProduct = (productToSave: Product) => {
        if (productToSave.id === 0) {
            content?.addProduct(productToSave);
        } else {
            content?.updateProduct(productToSave);
        }
        setEditingProduct(null);
    };

    const handleOpenProductEditor = (product: Product | null) => {
        setEditingProduct(product);
    }

    const handleToggleEditing = () => {
        if (!isEditing && content) {
            setTempSiteContent(content.siteContent);
        }
        setIsEditing(!isEditing);
    };

    const handleCancelEditing = () => {
        setIsEditing(false);
    };

    const handleSaveEditing = useCallback(() => {
        if (!content || !tempSiteContent) return;
        const newHeroTitle = document.getElementById('hero-title-editable')?.innerText || tempSiteContent.heroTitle;
        const newHeroSlogan = document.getElementById('hero-slogan-editable')?.innerText || tempSiteContent.heroSlogan;
        const newHeroSubtitle = document.getElementById('hero-subtitle-editable')?.innerText || tempSiteContent.heroSubtitle;
        const newAboutTitle = document.getElementById('about-title-editable')?.innerText || tempSiteContent.aboutTitle;
        const newAboutSubtitle = document.getElementById('about-subtitle-editable')?.innerText || tempSiteContent.aboutSubtitle;
        
        const updatedContent: SiteContent = {
            ...content.siteContent,
            heroTitle: newHeroTitle,
            heroSlogan: newHeroSlogan,
            heroSubtitle: newHeroSubtitle,
            aboutTitle: newAboutTitle,
            aboutSubtitle: newAboutSubtitle,
        };
        
        content.updateSiteContent(updatedContent);
        setIsEditing(false);
        alert('Nội dung trang chủ đã được cập nhật!');
    }, [content, tempSiteContent]);


    const renderGuideTooltip = () => {
        if (!isGuiding || guideSteps.length === 0) return null;
        const step = guideSteps[currentGuideStep];
        const element = document.querySelector(`[data-guide-id='${step.elementId}']`);
        if (!element) {
            if (step.action === 'click') {
                const clickable = document.querySelector(`[data-guide-id='${step.elementId}']`) as HTMLElement;
                clickable?.click();
                nextGuideStep();
            }
            return null;
        };
        const rect = element.getBoundingClientRect();
        return (
            <>
                 <div className="fixed inset-0 bg-black/70 z-[9998]"></div>
                 <div 
                    className="fixed z-[9999] border-2 border-yellow-400 rounded-lg pointer-events-none"
                    style={{
                        top: rect.top - 5,
                        left: rect.left - 5,
                        width: rect.width + 10,
                        height: rect.height + 10,
                        transition: 'all 0.3s ease-in-out',
                        boxShadow: '0 0 20px rgba(255, 223, 0, 0.7)'
                    }}
                 />
                 <div 
                    className="fixed z-[9999] bg-gray-800 p-4 rounded-lg shadow-lg max-w-xs text-white"
                     style={{
                        top: rect.bottom + 15,
                        left: rect.left,
                     }}
                 >
                    <h4 className="font-bold text-yellow-400">{step.title}</h4>
                    <p className="text-sm mt-1">{step.description}</p>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-xs text-gray-500">{currentGuideStep + 1} / {guideSteps.length}</span>
                        <div className="flex space-x-2">
                            <button onClick={stopGuide} className="text-xs text-gray-400 hover:text-white">Bỏ qua</button>
                            <button onClick={nextGuideStep} className="text-sm bg-yellow-400 text-gray-900 font-bold px-3 py-1 rounded">
                                {currentGuideStep === guideSteps.length - 1 ? 'Hoàn thành' : 'Tiếp theo'}
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    if (auth?.loading || !content) {
        return <div className="flex items-center justify-center min-h-screen text-yellow-400 text-xl">Đang tải...</div>;
    }

    const renderView = () => {
        switch(view) {
            case 'login':
                return <Login onNavigate={navigate} />;
            case 'register':
                return <Register onNavigate={navigate} />;
            case 'admin':
                return auth.currentUser?.role === 'Admin' ? <AdminDashboard
                    onNavigate={navigate}
                    onEditProduct={handleOpenProductEditor}
                /> : <HomePageContent onNavigate={navigate} isEditing={isEditing} />;
            case 'postEditor':
                 return auth.currentUser?.role === 'Admin' ? <PostEditor
                    post={editingPost}
                    onSave={handleSavePost}
                    onCancel={() => navigate('admin')}
                /> : null;
            case 'postDetail':
                return selectedPost ? <div>
                    <Header onNavigate={navigate} onToggleEditing={handleToggleEditing} isEditing={isEditing} />
                    <PostDetail 
                        post={selectedPost} 
                        onLike={handleLikePost}
                        onComment={handleAddComment}
                    />
                    <Footer />
                </div> : <HomePageContent onNavigate={navigate} isEditing={isEditing}/>;
            case 'profile':
            case 'home':
            default:
                 return (
                    <div className="bg-gray-900 min-h-screen">
                      <Header onNavigate={navigate} onToggleEditing={handleToggleEditing} isEditing={isEditing} />
                      <HomePageContent onNavigate={navigate} isEditing={isEditing} />
                      <MobileBottomNav onNavigate={navigate} isLoggedIn={!!auth.currentUser} />
                    </div>
                  )
        }
    }

    return (
        <div className="relative">
            {isEditing && <EditModeBar onSave={handleSaveEditing} onCancel={handleCancelEditing} />}
            {editingProduct !== null && auth.currentUser?.role === 'Admin' && (
                <ProductEditorModal
                    product={editingProduct}
                    onSave={handleSaveProduct}
                    onClose={() => setEditingProduct(null)}
                />
            )}
            {renderView()}
            <ActionPopup onOpenAIChat={() => setChatOpen(true)} />
            <AIAssistantChat 
                isOpen={isChatOpen} 
                onClose={() => setChatOpen(false)}
                onStartGuide={startGuide}
            />
            {renderGuideTooltip()}
        </div>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <ContentProvider>
                <AppContent />
            </ContentProvider>
        </AuthProvider>
    );
};

export default App;
