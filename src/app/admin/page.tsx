'use client'; // This directive marks the component as a Client Component.
// This is necessary because the AdminDashboard and its children use React hooks like useState for interactivity.

// FIX: Import useState, useContext and other necessary hooks/components.
import React, { useState, useContext } from 'react';
import AdminDashboard from '@/components/AdminDashboard';
import PostEditor from '@/components/admin/PostEditor';
// FIX: Import ProductEditor to handle product editing.
import ProductEditor from '@/components/admin/ProductEditor';
// FIX: Import types and ContentContext.
import type { Post, Product } from '@/lib/types';
import { ContentContext } from '../../contexts/ContentContext';


// This page component renders the main dashboard for the /admin route.
const AdminPage: React.FC = () => {
  // FIX: This component orchestrates which view is visible (dashboard or an editor).
  const [view, setView] = useState<'dashboard' | 'postEditor' | 'productEditor'>('dashboard');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // FIX: Get content and handlers from the provided context.
  const content = useContext(ContentContext);

  if (!content) {
    return <div className="flex items-center justify-center min-h-screen">Đang tải nội dung...</div>;
  }

  // This handler is passed to AdminDashboard to allow it to trigger a view change in this parent component.
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

  const handleEditProductClick = (product: Product | null) => {
    setEditingProduct(product);
    setView('productEditor');
  }

  // Handlers that use the context to save data and then switch the view back to the dashboard.
  const handleSavePost = (postToSave: Post) => {
    content.handleSavePost(postToSave, 'Admin'); // Use context function
    setView('dashboard');
  };

  const handleSaveProduct = (productToSave: Product) => {
    if (productToSave.id === 0) {
        content.addProduct(productToSave);
    } else {
        content.updateProduct(productToSave);
    }
    setView('dashboard');
  };

  const handleCancel = () => {
      setView('dashboard');
  };

  // Conditional rendering based on the current view state.
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

  // FIX: Render AdminDashboard with only the props it is designed to accept.
  // The dashboard will get all the content it needs from the ContentContext.
  return <AdminDashboard 
    onNavigate={handleNavigate as any} 
    onEditProduct={handleEditProductClick}
  />;
};

export default AdminPage;
