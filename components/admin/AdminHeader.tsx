import React from 'react';
import type { User } from '../../types';

interface AdminHeaderProps {
    user: User;
    onLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ user, onLogout }) => {
    return (
        <header className="flex-shrink-0 bg-gray-800 border-b border-gray-700">
            <div className="flex items-center justify-between p-2 h-16">
                <div className="flex items-center space-x-4">
                    {/* Can add search or other quick actions here */}
                </div>
                <div className="flex items-center space-x-4">
                    <a href="/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-yellow-400">
                        Xem trang
                    </a>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-white hidden sm:block">Chào, {user.name}</span>
                        <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                    </div>
                     <button onClick={onLogout} className="text-sm text-gray-300 hover:text-red-400 p-2 rounded-md">
                        Đăng xuất
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;