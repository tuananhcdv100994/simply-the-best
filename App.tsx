
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
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
import ProductEditor from './components/admin/ProductEditor';
import { DEFAULT_SITE_CONTENT, POSTS, PRODUCTS, PARTNERS, MEDIA_ITEMS, NEWS_POSTS } from './constants';
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

type View = 'home' | 'admin' | 'login' | 'register' | 'postEditor' | 'productEditor' | 'profile' | 'postDetail';

const HomePageContent: React.FC<{ siteContent: SiteContent, posts: Post[], products: Product[], partners: Partner[], users: User[], onNavigate: (view: View, data?: any) => void, isEditing: boolean }> = ({ siteContent, posts, products, partners, users, onNavigate, isEditing }) => (
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
            <OnlineUsers users={users} />
            <CommunityShowcase posts={posts} onNavigate={onNavigate} />
            <NewsSection onNavigate={onNavigate} />
            <Events />
            <Merchandise products={products} />
            <PartnersComponent partners={partners} />
            <CTA />
            <UserProfile />
        </main>
        <Footer />
    </>
);


const AppContent: React.FC = () => {
    const [view, setView] = useState<View>('home');
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [siteContent, setSiteContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
    const [posts, setPosts] = useState<Post[]>([...POSTS, ...NEWS_POSTS]);
    const [products, setProducts] = useState<Product[]>(PRODUCTS);
    const [partners, setPartners] = useState<Partner[]>(PARTNERS);
    const [mediaItems, setMediaItems] = useState<MediaItem[]>(MEDIA_ITEMS);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    
    // AI Assistant State
    const [isChatOpen, setChatOpen] = useState(false);
    const [isGuiding, setIsGuiding] = useState(false);
    const [guideSteps, setGuideSteps] = useState<GuideStep[]>([]);
    const [currentGuideStep, setCurrentGuideStep] = useState(0);

    // Inline Editing State
    const [isEditing, setIsEditing] = useState(false);
    const [tempSiteContent, setTempSiteContent] = useState<SiteContent>(siteContent);


    const auth = useContext(AuthContext);

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
                }, 500); // Increased delay to ensure view transition
            };

            if (guideName.includes('post') && auth?.currentUser?.role === 'Admin') {
                if (view !== 'admin') {
                    navigateToAdminAndGuide();
                } else {
                    // Already in admin, just start the guide
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
        } else if (newView === 'productEditor') {
            setEditingProduct(data as Product || null);
        } else if (newView === 'postDetail') {
            setSelectedPost(data as Post);
        } else {
            setSelectedPost(null);
        }
        window.scrollTo(0, 0);
        setView(newView);
    };
    
    const handleSavePost = (postToSave: Post) => {
        if (postToSave.id === 0) { // New post
            const newPost = { ...postToSave, id: Date.now(), author: auth?.currentUser?.name || 'Admin', likes: 0, comments: [] };
            setPosts(prev => [newPost, ...prev]);
        } else { // Existing post
            setPosts(prev => prev.map(p => p.id === postToSave.id ? postToSave : p));
        }
        navigate('admin', {subView: 'posts'});
    };

    const handleLikePost = (postId: number) => {
        setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
        if (selectedPost && selectedPost.id === postId) {
            setSelectedPost(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
        }
    };

    const handleAddComment = (postId: number, commentText: string) => {
        if (!auth?.currentUser) return;
        const newComment: Comment = {
            id: Date.now(),
            author: auth.currentUser.name,
            avatarUrl: auth.currentUser.avatarUrl,
            text: commentText,
            date: 'Vừa xong'
        };
        setPosts(prev => prev.map(p => p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p));
        if (selectedPost && selectedPost.id === postId) {
            setSelectedPost(prev => prev ? { ...prev, comments: [...prev.comments, newComment] } : null);
        }
    };
    
    const handleSaveProduct = (productToSave: Product) => {
        if (productToSave.id === 0) { // New product
            const newProduct = { ...productToSave, id: Date.now() };
            setProducts(prev => [newProduct, ...prev]);
        } else { // Existing product
            setProducts(prev => prev.map(p => p.id === productToSave.id ? productToSave : p));
        }
        navigate('admin');
    };

    const handleDeleteProduct = (productId: number) => {
        if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
            setProducts(prev => prev.filter(p => p.id !== productId));
        }
    };

    const handleAddMedia = (item: Omit<MediaItem, 'id'>) => {
        const newItem: MediaItem = { ...item, id: Date.now() };
        setMediaItems(prev => [newItem, ...prev]);
    };

    // --- Inline Editing Handlers ---
    const handleToggleEditing = () => {
        if (!isEditing) {
            setTempSiteContent(siteContent); // Store current content in temp state
        }
        setIsEditing(!isEditing);
    };

    const handleCancelEditing = () => {
        setIsEditing(false);
        // No need to restore, siteContent was never changed
    };

    const handleSaveEditing = useCallback(() => {
        const newHeroTitle = document.getElementById('hero-title-editable')?.innerText || tempSiteContent.heroTitle;
        const newHeroSlogan = document.getElementById('hero-slogan-editable')?.innerText || tempSiteContent.heroSlogan;
        const newHeroSubtitle = document.getElementById('hero-subtitle-editable')?.innerText || tempSiteContent.heroSubtitle;
        const newAboutTitle = document.getElementById('about-title-editable')?.innerText || tempSiteContent.aboutTitle;
        const newAboutSubtitle = document.getElementById('about-subtitle-editable')?.innerText || tempSiteContent.aboutSubtitle;
        
        const updatedContent: SiteContent = {
            ...siteContent, // Keep things like imageUrl
            heroTitle: newHeroTitle,
            heroSlogan: newHeroSlogan,
            heroSubtitle: newHeroSubtitle,
            aboutTitle: newAboutTitle,
            aboutSubtitle: newAboutSubtitle,
        };
        
        setSiteContent(updatedContent);
        setTempSiteContent(updatedContent);
        setIsEditing(false);
        alert('Nội dung trang chủ đã được cập nhật!');
    }, [siteContent, tempSiteContent]);


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


    if (auth?.loading) {
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
                    siteContent={siteContent}
                    onContentChange={setSiteContent}
                    posts={posts}
                    onNavigate={navigate}
                    users={auth.users}
                    onUpdateUser={auth.updateUser}
                    onDeleteUser={(userId) => { /* Add delete logic to context if needed */ }}
                    products={products}
                    onDeleteProduct={handleDeleteProduct}
                    mediaItems={mediaItems}
                    onAddMedia={handleAddMedia}
                    partners={partners}
                    onPartnersChange={setPartners}
                /> : <HomePageContent siteContent={siteContent} posts={POSTS} products={products} partners={partners} users={auth.users} onNavigate={navigate} isEditing={isEditing} />;
            case 'postEditor':
                 return auth.currentUser?.role === 'Admin' ? <PostEditor
                    post={editingPost}
                    onSave={handleSavePost}
                    onCancel={() => navigate('admin')}
                /> : null;
            case 'productEditor':
                 return auth.currentUser?.role === 'Admin' ? <ProductEditor
                    product={editingProduct}
                    onSave={handleSaveProduct}
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
                </div> : <HomePageContent siteContent={siteContent} posts={POSTS} products={products} partners={partners} users={auth.users} onNavigate={navigate} isEditing={isEditing}/>;
            case 'profile':
            case 'home':
            default:
                 return (
                    <div className="bg-gray-900 min-h-screen">
                      <Header onNavigate={navigate} onToggleEditing={handleToggleEditing} isEditing={isEditing} />
                      <HomePageContent siteContent={siteContent} posts={POSTS} products={products} partners={partners} users={auth.users} onNavigate={navigate} isEditing={isEditing} />
                      <MobileBottomNav onNavigate={navigate} isLoggedIn={!!auth.currentUser} />
                    </div>
                  )
        }
    }


    return (
        <div className="relative">
            {isEditing && <EditModeBar onSave={handleSaveEditing} onCancel={handleCancelEditing} />}
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
            <AppContent />
        </AuthProvider>
    );
};

export default App;