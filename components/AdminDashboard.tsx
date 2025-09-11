'use client';

import React, { useState, useContext } from 'react';
import type { AdminView } from '../types';
import AdminSidebar from './admin/AdminSidebar';
import AdminHeader from './admin/AdminHeader';
import { pluginRegistry } from '../plugins/registry';
import { AuthContext } from '../contexts/AuthContext';

const AdminDashboard: React.FC<any> = (props) => {
    const [activeView, setActiveView] = useState<AdminView>('dashboard');
    const auth = useContext(AuthContext);

    const ActivePluginComponent = pluginRegistry.find(p => p.id === activeView)?.component;

    // Filter props to pass to the active plugin component
    const pluginProps = {
      ...props,
      setActiveView, // Pass this so plugins can navigate
    };
    
    if (!auth?.currentUser) {
        return null; // or a redirect component
    }

    return (
        <div className="flex h-screen bg-gray-800 text-gray-100 font-sans">
            <AdminSidebar activeView={activeView} setActiveView={setActiveView} />
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