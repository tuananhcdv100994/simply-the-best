'use client'; // This directive marks the component as a Client Component.
// This is necessary because the AdminDashboard and its children use React hooks like useState for interactivity.

// FIX: Import useState and other necessary hooks/components.
import React, { useState } from 'react';
import AdminDashboard from '@/components/AdminDashboard';
import PostEditor from '@/components/admin/PostEditor';
// FIX: Import ProductEditor to handle product editing.
import ProductEditor from '@/components/admin/ProductEditor';
// FIX: Import default content, posts, products, types, and partners for state initialization.
// @FIX: Add MEDIA_ITEMS to imports
import { DEFAULT_SITE_CONTENT, POSTS, PRODUCTS, PARTNERS, MEDIA_ITEMS } from '@/lib/constants';
// @FIX: Add MediaItem to type imports
import type { SiteContent, Post, Product, Partner, MediaItem } from '@/lib/types';


// This page component renders the main dashboard for the /admin route.
const AdminPage: React.FC = () => {
  // FIX: Add state to manage site content, posts, products, and view switching.
  const [siteContent, setSiteContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [posts, setPosts] = useState<Post[]>(POSTS);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  // FIX: Add state for partners.
  const [partners, setPartners] = useState<Partner[]>(PARTNERS);
  // @FIX: Add state for media items
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(MEDIA_ITEMS);
  const [view, setView] = useState<'dashboard' | 'postEditor' | 'productEditor'>('dashboard');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // @FIX: Add handler for adding new media items
  const handleAddMedia = (item: Omit<MediaItem, 'id'>) => {
    const newItem: MediaItem = { ...item, id: Date.now() };
    setMediaItems(prev => [newItem, ...prev]);
  };

  const handleNavigate = (view: 'postEditor' | 'productEditor', data?: Post | Product) => {
    if (view === 'postEditor') {
        setEditingPost(data as Post || null);
        setView('postEditor');
    }
    if (view === 'productEditor') {
        setEditingProduct(data as Product || null);
        setView('productEditor');
    }
  };

  const handleSavePost = (postToSave: Post) => {
    if (postToSave.id === 0) { // New post
        const newPost = { ...postToSave, id: Date.now(), author: 'Admin' };
        setPosts(prev => [newPost, ...prev]);
    } else { // Existing post
        setPosts(prev => prev.map(p => p.id === postToSave.id ? postToSave : p));
    }
    setView('dashboard');
  };

  const handleSaveProduct = (productToSave: Product) => {
        if (productToSave.id === 0) { // New product
            const newProduct = { ...productToSave, id: Date.now() };
            setProducts(prev => [newProduct, ...prev]);
        } else { // Existing product
            setProducts(prev => prev.map(p => p.id === productToSave.id ? productToSave : p));
        }
        setView('dashboard');
    };

    const handleDeleteProduct = (productId: number) => {
        if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
            setProducts(prev => prev.filter(p => p.id !== productId));
        }
    };

  const handleCancel = () => {
      setView('dashboard');
  };

  if (view === 'postEditor') {
      return (
          <main>
            <PostEditor 
                post={editingPost}
                onSave={handleSavePost}
                onCancel={handleCancel}
            />
          </main>
      );
  }
  
  if (view === 'productEditor') {
      return (
          <main>
            <ProductEditor 
                product={editingProduct} 
                onSave={handleSaveProduct}
                onCancel={handleCancel}
            />
          </main>
      );
  }

  // FIX: Pass all required props to AdminDashboard, including partners and onPartnersChange.
  // @FIX: Pass missing mediaItems and onAddMedia props
  return <AdminDashboard 
    siteContent={siteContent} 
    onContentChange={setSiteContent} 
    posts={posts} 
    products={products}
    partners={partners}
    onPartnersChange={setPartners}
    mediaItems={mediaItems}
    onAddMedia={handleAddMedia}
    onNavigate={handleNavigate} 
    onDeleteProduct={handleDeleteProduct}
  />;
};

export default AdminPage;