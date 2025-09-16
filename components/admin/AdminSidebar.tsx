import React, { useState } from 'react';
import Logo from '../icons/Logo';
import { pluginRegistry } from '../../plugins/registry';
import type { AdminView, AdminSubMenuItem } from '../../types';

interface AdminSidebarProps {
    activeView: AdminView;
    setActiveView: (view: AdminView) => void;
    pendingUserCount: number;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeView, setActiveView, pendingUserCount }) => {
    const [openMenu, setOpenMenu] = useState<string | null>(pluginRegistry.find(p => p.id === activeView)?.id || 'dashboard');
    
    const handleMenuClick = (pluginId: AdminView, subItems?: AdminSubMenuItem[]) => {
        setActiveView(pluginId);
        if (subItems) {
            setOpenMenu(openMenu === pluginId ? null : pluginId);
        } else {
             setOpenMenu(pluginId);
        }
    }

    return (
        <aside className="w-64 flex-shrink-0 bg-[#191e23] border-r border-gray-700 flex flex-col">
            <div className="h-16 flex items-center justify-center border-b border-gray-700 flex-shrink-0 px-4">
                <Logo className="h-12" />
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-2">
                    {pluginRegistry.map((plugin) => {
                        const notificationCount = plugin.id === 'users' ? pendingUserCount : plugin.notificationCount;

                        return (
                            <li key={plugin.id} data-guide-id={`admin-nav-${plugin.id}`}>
                                <button
                                    onClick={() => handleMenuClick(plugin.id, plugin.subItems)}
                                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                                        activeView === plugin.id || openMenu === plugin.id
                                            ? 'bg-yellow-400 text-gray-900'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`}
                                >
                                    <plugin.icon className="w-5 h-5" />
                                    <span>{plugin.label}</span>
                                    {notificationCount > 0 && (
                                        <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                            {notificationCount}
                                        </span>
                                    )}
                                </button>
                                {plugin.subItems && openMenu === plugin.id && (
                                    <ul className="pl-6 mt-1 space-y-1">
                                        {plugin.subItems.map(subItem => (
                                            <li key={subItem.id}>
                                                 <button
                                                    onClick={() => setActiveView(subItem.id)}
                                                    className={`w-full text-left flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                                        activeView === subItem.id ? 'text-yellow-400' : 'text-gray-400 hover:text-white'
                                                    }`}
                                                 >
                                                    <span>{subItem.label}</span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default AdminSidebar;