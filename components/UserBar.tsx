import React from 'react';
import type { User } from '../types';
import { USER_LEVELS } from '../constants';

interface UserBarProps {
    user: User;
    onLogout: () => void;
    onNavigate: (view: 'admin' | 'home') => void;
}

const UserBar: React.FC<UserBarProps> = ({ user, onLogout, onNavigate }) => {
    const levelInfo = USER_LEVELS.find(l => l.name === user.level) || USER_LEVELS[0];

    return (
        <header className="sticky top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <a href="#" className="flex items-center space-x-3">
                        <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400"/>
                        <div>
                             <span className="font-bold text-white">{user.name}</span>
                             <div className="text-xs text-gray-400 flex items-center">
                                 <span>{levelInfo.badge}</span>
                                 <span className="ml-1">{user.level}</span>
                             </div>
                        </div>
                    </a>
                    
                    <div className="flex items-center space-x-6">
                        <div className="text-center">
                             <div className="font-bold text-yellow-400">{user.points.toLocaleString()}</div>
                             <div className="text-xs text-gray-400">Điểm</div>
                        </div>
                        {user.role === 'Admin' && (
                             <button onClick={() => onNavigate('admin')} className="text-sm font-semibold text-gray-300 hover:text-yellow-400 transition-colors duration-300">
                                Bảng điều khiển
                             </button>
                        )}
                        <a href="#profile" className="text-sm font-semibold text-gray-300 hover:text-yellow-400 transition-colors duration-300">
                           Hồ sơ
                        </a>
                        <button onClick={onLogout} className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-all duration-300 font-bold py-2 px-4 rounded-full text-sm">
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default UserBar;