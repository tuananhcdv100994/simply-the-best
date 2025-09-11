import React, { useState, useContext, useEffect } from 'react';
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
import UserBar from './components/UserBar';
import PostEditor from './components/admin/PostEditor';
import ProductEditor from './components/admin/ProductEditor';
import { DEFAULT_SITE_CONTENT, POSTS, PRODUCTS, PARTNERS, MEDIA_ITEMS } from './constants';
import type { SiteContent, Post, Product, Partner, GuideStep, MediaItem, User } from './types';
import CommunityStats from './components/CommunityStats';
import Challenges from './components/Challenges';
import Partners from './components/Partners';
import CTA from './components/CTA';
import MobileBottomNav from './components/MobileBottomNav';
import AIAssistantChat from './components/AIAssistantChat';
import { getGuide } from './services/GuideService';
import OnlineUsers from './components/OnlineUsers';
import ActionPopup from './components/ActionPopup';
import NewsSection from './components/NewsSection';

type View = 'home' | 'admin' | 'login' | 'register' | 'postEditor' | 'productEditor' | 'profile';

const HomePageContent: React.FC<{ siteContent: SiteContent, posts: Post[], products: Product[], partners: Partner[], users: User[], onNavigate: (view: View) => void }> = ({ siteContent, posts, products, partners, users, onNavigate }) => (
    <>
        <main>
            <Hero 
                title={siteContent.heroTitle} 
                slogan={siteContent.heroSlogan} 
                subtitle={siteContent.heroSubtitle}
                imageUrl={siteContent.heroImageUrl}
            />
            <CommunityStats />
            <Leaderboard />
            <About title={siteContent.aboutTitle} subtitle={siteContent.aboutSubtitle} />
            <Challenges />
            <OnlineUsers users={users} />
            <CommunityShowcase posts={posts} />
            <NewsSection />
            <Events />
            <Merchandise products={products} />
            <Partners partners={partners} />
            <CTA />
            <UserProfile />
        </main>
        <Footer />
    </>
);


const AppContent: React.FC = () => {
    const [view, setView] = useState<View>('home');
    const [siteContent, setSiteContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
    const [posts, setPosts] = useState<Post[]>(POSTS);
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


    const auth = useContext(AuthContext);

    useEffect(() => {
        // Make AI Assistant proactive on first visit of a session
        const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
        if (!hasSeenWelcome) {
            setTimeout(() => {
                setChatOpen(true);
                sessionStorage.setItem('hasSeenWelcome', 'true');
            }, 2000); // Open after 2 seconds
        }
    }, []);

    const startGuide = (guideName: string) => {
        const guide = getGuide(guideName);
        if (guide) {
            // Ensure the user is in the correct view before starting
            if (guideName.includes('post') && auth?.currentUser?.role === 'Admin') {
                navigate('admin');
                 setTimeout(() => {
                    setGuideSteps(guide);
                    setCurrentGuideStep(0);
                    setIsGuiding(true);
                    setChatOpen(false);
                }, 100); // Small delay to allow view to render
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


    const navigate = (newView: View, data?: Post | Product) => {
        if (newView === 'postEditor') {
            setEditingPost(data as Post || null);
        }
        if (newView === 'productEditor') {
            setEditingProduct(data as Product || null);
        }
        window.scrollTo(0, 0);
        setView(newView);
    };
    
    const handleSavePost = (postToSave: Post) => {
        if (postToSave.id === 0) { // New post
            const newPost = { ...postToSave, id: Date.now(), author: auth?.currentUser?.name || 'Admin' };
            setPosts(prev => [newPost, ...prev]);
        } else { // Existing post
            setPosts(prev => prev.map(p => p.id === postToSave.id ? postToSave : p));
        }
        navigate('admin');
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

    const renderGuideTooltip = () => {
        if (!isGuiding || guideSteps.length === 0) return null;

        const step = guideSteps[currentGuideStep];
        const element = document.querySelector(`[data-guide-id='${step.elementId}']`);
        if (!element) {
             // If element is not found, maybe it's on another tab. Let's try to click.
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
                        transition: 'all 0.3s ease-in-out'
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
                    <div className="flex justify-end space-x-2 mt-4">
                        <button onClick={stopGuide} className="text-xs text-gray-400 hover:text-white">Bỏ qua</button>
                        <button onClick={nextGuideStep} className="text-sm bg-yellow-400 text-gray-900 font-bold px-3 py-1 rounded">
                            {currentGuideStep === guideSteps.length - 1 ? 'Hoàn thành' : 'Tiếp theo'}
                        </button>
                    </div>
                </div>
            </>
        )
    }


    if (auth?.loading) {
        return <div className="flex items-center justify-center min-h-screen text-yellow-400 text-xl">Đang tải...</div>;
    }

    const mainContent = (
      <>
        {view === 'login' && <Login onNavigate={navigate} />}
        {view === 'register' && <Register onNavigate={navigate} />}
        {view === 'home' && (
          auth.currentUser ? (
            <div className="bg-gray-900 min-h-screen pb-20 md:pb-0">
              <UserBar user={auth.currentUser} onLogout={() => { auth.logout(); navigate('home'); }} onNavigate={navigate} />
              <HomePageContent siteContent={siteContent} posts={posts} products={products} partners={partners} users={auth.users} onNavigate={navigate} />
              <MobileBottomNav onNavigate={navigate} isLoggedIn={true} />
            </div>
          ) : (
            <div className="bg-gray-900 min-h-screen">
              <Header onNavigate={navigate} />
              <HomePageContent siteContent={siteContent} posts={posts} products={products} partners={partners} users={auth.users} onNavigate={navigate} />
              <MobileBottomNav onNavigate={navigate} isLoggedIn={false} />
            </div>
          )
        )}
        {auth.currentUser?.role === 'Admin' && view === 'admin' && (
          <AdminDashboard
            siteContent={siteContent}
            onContentChange={setSiteContent}
            posts={posts}
            onNavigate={navigate}
            users={auth.users}
            onUpdateUser={(user) => auth.users = auth.users.map(u => u.id === user.id ? user : u)}
            onDeleteUser={(userId) => auth.users = auth.users.filter(u => u.id !== userId)}
            products={products}
            onDeleteProduct={handleDeleteProduct}
            mediaItems={mediaItems}
            onAddMedia={handleAddMedia}
            partners={partners}
            onPartnersChange={setPartners}
          />
        )}
        {auth.currentUser?.role === 'Admin' && view === 'postEditor' && (
          <PostEditor
            post={editingPost}
            onSave={handleSavePost}
            onCancel={() => navigate('admin')}
          />
        )}
        {auth.currentUser?.role === 'Admin' && view === 'productEditor' && (
          <ProductEditor
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={() => navigate('admin')}
          />
        )}
        {auth.currentUser && view === 'profile' && (
           <div className="bg-gray-900 min-h-screen pb-20 md:pb-0">
              <UserBar user={auth.currentUser} onLogout={() => { auth.logout(); navigate('home'); }} onNavigate={navigate} />
              <HomePageContent siteContent={siteContent} posts={posts} products={products} partners={partners} users={auth.users} onNavigate={navigate} />
           </div>
        )}
      </>
    );


    return (
        <div className="relative">
            {mainContent}
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
