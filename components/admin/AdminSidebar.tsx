import React from 'react';
import Logo from '../icons/Logo';
import { pluginRegistry } from '../../plugins/registry';
import type { AdminView } from '../../types';

interface AdminSidebarProps {
    activeView: AdminView;
    setActiveView: (view: AdminView) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeView, setActiveView }) => {
    return (
        <aside className="w-64 flex-shrink-0 bg-gray-800 border-r border-gray-700 flex flex-col">
            <div className="h-16 flex items-center justify-center border-b border-gray-700 flex-shrink-0 px-4">
                <Logo className="h-12" />
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-2">
                    {pluginRegistry.map((plugin) => (
                        <li key={plugin.id}>
                            <button
                                onClick={() => setActiveView(plugin.id)}
                                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                                    activeView === plugin.id
                                        ? 'bg-yellow-400 text-gray-900'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                <plugin.icon className="w-5 h-5" />
                                <span>{plugin.label}</span>
                                {plugin.notificationCount && (
                                    <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {plugin.notificationCount}
                                    </span>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default AdminSidebar;