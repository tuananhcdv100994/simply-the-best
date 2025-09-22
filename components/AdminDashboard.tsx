'use client';

import React, { useState, useContext, useMemo } from 'react';
import type { AdminView, User, Product } from '../types';
import AdminSidebar from './admin/AdminSidebar';
import AdminHeader from './admin/AdminHeader';
import { pluginRegistry } from '../plugins/registry';
import { AuthContext } from '../contexts/AuthContext';

interface AdminDashboardProps {
  // Add other props from App.tsx here
  onNavigate: (view: 'postEditor', data?: any) => void;
  onEditProduct: (product: Product | null) => void;
  products: Product[];
  onDeleteProduct: (id: number) => void;
  users: User[];
  onUpdateUser: (user: User) => void;
  // ... and so on for all props passed from App.tsx
}


const AdminDashboard: React.FC<any> = (props) => {
    const [activeView, setActiveView] = useState<AdminView>('dashboard');
    const auth = useContext(AuthContext);

    const ActivePluginComponent = pluginRegistry.find(p => p.id === activeView)?.component;

    const pendingUserCount = useMemo(() => 
        props.users.filter((u: User) => u.status === 'Chờ duyệt').length, 
    [props.users]);
    

    // Filter props to pass to the active plugin component
    const pluginProps = {
      ...props,
      // Custom handlers for components inside the dashboard
      onAddNew: () => props.onNavigate('postEditor'),
      onEdit: (post: any) => props.onNavigate('postEditor', post),
      onAddNewProduct: () => props.onEditProduct({ id: 0, name: '', price: '', imageUrl: '', description: '' }),
      onEditProduct: (product: Product) => props.onEditProduct(product),
      initialPlugins: [], // Placeholder for plugins
      setActiveView,
    };
    
    if (!auth?.currentUser) {
        return null; // or a redirect component
    }

    return (
        <div className="flex h-screen bg-gray-800 text-gray-100 font-sans">
            <AdminSidebar 
                activeView={activeView} 
                setActiveView={setActiveView}
                pendingUserCount={pendingUserCount} 
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminHeader user={auth.currentUser} onLogout={auth.logout} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-4 sm:p-6 md:p-8">
                    {ActivePluginComponent ? <ActivePluginComponent {...pluginProps} /> : <div>Plugin not found</div>}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
