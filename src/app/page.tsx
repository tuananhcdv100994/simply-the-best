'use client'; // FIX: Convert to a client component to handle state and context.

import React, { useState, useContext } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import CommunityShowcase from '@/components/CommunityShowcase';
import Leaderboard from '@/components/Leaderboard';
import Events from '@/components/Events';
import Merchandise from '@/components/Merchandise';
import Footer from '@/components/Footer';
import UserProfile from '@/components/UserProfile';
// FIX: Import default site content and posts data to pass as props.
// FIX: Import PRODUCTS to pass to Merchandise component.
import { DEFAULT_SITE_CONTENT, POSTS, PRODUCTS, PARTNERS, NEWS_POSTS } from '@/constants';

// FIX: Import additional components and types needed for dynamic view rendering and auth.
import { AuthContext } from '@/contexts/AuthContext';
import Login from '@/components/Login';
import Register from '@/components/Register';
import { useRouter } from 'next/navigation';
import UserBar from '@/components/UserBar';
import type { Post, Product, Comment } from '@/types';
import MobileBottomNav from '@/components/MobileBottomNav';
import CommunityStats from '@/components/CommunityStats';
import Challenges from '@/components/Challenges';
import Partners from '@/components/Partners';
import CTA from '@/components/CTA';
import PostDetail from '@/components/PostDetail';
import NewsSection from '@/components/NewsSection';

// FIX: Add 'admin' to View type to allow navigation to the admin page.
type View = 'home' | 'login' | 'register' | 'profile' | 'postDetail' | 'admin';

// This is the main landing page of the application, located at the root route '/'.
// It replaces the 'home' view from the previous single-page application structure.
const HomePage: React.FC = () => {
    // FIX: Add state for view management, similar to the original App.tsx.
    const [view, setView] = useState<View>('home');
    const [posts, setPosts] = useState<Post[]>([...POSTS, ...NEWS_POSTS]);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const auth = useContext(AuthContext);
    const router = useRouter();

    // FIX: Create a navigation function to pass to child components.
    const navigate = (newView: View, data?: any) => {
        if (newView === 'admin') {
            router.push('/admin');
        } else if (newView === 'postDetail') {
            setSelectedPost(data as Post);
            window.scrollTo(0, 0);
            setView(newView);
        } else {
            setSelectedPost(null);
            window.scrollTo(0, 0);
            setView(newView);
        }
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

    if (auth?.loading) {
        return <div className="flex items-center justify-center min-h-screen text-yellow-400 text-xl">Đang tải...</div>;
    }
    
    // Unauthenticated views
    if (!auth?.currentUser) {
        if (view === 'login') return <Login onNavigate={navigate as any} />;
        if (view === 'register') return <Register onNavigate={navigate as any} />;
    }
    
    // Profile view for logged-in user if they navigate there
    if (auth?.currentUser && view === 'profile') {
      // In a real app this would be a separate /profile route, but we follow the SPA structure for this fix
       return (
            <div className="bg-gray-900 min-h-screen pb-20 md:pb-0">
                <UserBar user={auth.currentUser} onLogout={() => { auth.logout(); navigate('home'); }} onNavigate={navigate as any} />
                <main>
                    <UserProfile />
                </main>
                <Footer />
                <MobileBottomNav onNavigate={navigate as any} isLoggedIn={true} />
            </div>
       )
    }
    
    if (view === 'postDetail' && selectedPost) {
        const headerComponent = auth?.currentUser
            ? <UserBar user={auth.currentUser} onLogout={() => { auth.logout(); navigate('home'); }} onNavigate={navigate as any} />
            // FIX: Pass missing isEditing and onToggleEditing props to Header.
            : <Header onNavigate={navigate as any} onToggleEditing={() => {}} isEditing={false} />;

        return (
            <div className="bg-gray-900 min-h-screen">
                {headerComponent}
                <PostDetail 
                    post={selectedPost}
                    onLike={handleLikePost}
                    onComment={handleAddComment}
                />
                <Footer />
                <MobileBottomNav onNavigate={navigate as any} isLoggedIn={!!auth?.currentUser} />
            </div>
        );
    }


    return (
        <div className="bg-gray-900 min-h-screen pb-20 md:pb-0">
            {auth?.currentUser ? (
                <UserBar user={auth.currentUser} onLogout={() => { auth.logout(); navigate('home'); }} onNavigate={navigate as any} />
            ) : (
                // FIX: Pass the required onNavigate prop to Header.
                // FIX: Pass missing isEditing and onToggleEditing props to Header.
                <Header onNavigate={navigate as any} onToggleEditing={() => {}} isEditing={false} />
            )}
            <main>
                {/* FIX: Pass required props to Hero and About components. */}
                {/* FIX: Pass missing `imageUrl` prop to Hero. */}
                <Hero 
                    title={DEFAULT_SITE_CONTENT.heroTitle} 
                    slogan={DEFAULT_SITE_CONTENT.heroSlogan} 
                    subtitle={DEFAULT_SITE_CONTENT.heroSubtitle} 
                    imageUrl={DEFAULT_SITE_CONTENT.heroImageUrl}
                />
                <CommunityStats />
                <Leaderboard />
                <About title={DEFAULT_SITE_CONTENT.aboutTitle} subtitle={DEFAULT_SITE_CONTENT.aboutSubtitle} />
                <Challenges />
                {/* FIX: Pass required 'posts' and 'onNavigate' props to CommunityShowcase. */}
                <CommunityShowcase posts={posts.filter(p => !p.author.includes('News'))} onNavigate={navigate} />
                {/* FIX: Pass required 'onNavigate' prop to NewsSection */}
                <NewsSection onNavigate={navigate} />
                <Events />
                {/* FIX: Pass the required 'products' prop to the Merchandise component. */}
                <Merchandise products={PRODUCTS} />
                <Partners partners={PARTNERS} />
                <CTA />
                {auth?.currentUser && <UserProfile />}
            </main>
            <Footer />
            <MobileBottomNav onNavigate={navigate as any} isLoggedIn={!!auth?.currentUser} />
        </div>
    );
};

export default HomePage;
