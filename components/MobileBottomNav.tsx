import React from 'react';
import HomeIcon from './icons/HomeIcon';
import TrophyIcon from './icons/TrophyIcon';
import UserCircleIcon from './icons/UserCircleIcon';

interface MobileBottomNavProps {
    onNavigate: (view: 'home' | 'login' | 'profile') => void;
    isLoggedIn: boolean;
}

const NavItem: React.FC<{ icon: React.ReactNode, label: string, onClick: () => void }> = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="flex flex-col items-center justify-center text-gray-400 hover:text-yellow-400 transition-colors w-full pt-2 pb-1">
        {icon}
        <span className="text-xs mt-1">{label}</span>
    </button>
);

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onNavigate, isLoggedIn }) => {
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-lg border-t border-gray-700 z-50 flex justify-around">
            <NavItem 
                icon={<HomeIcon className="w-6 h-6" />}
                label="Trang chủ"
                onClick={() => onNavigate('home')}
            />
            <a href="#leaderboard" className="flex flex-col items-center justify-center text-gray-400 hover:text-yellow-400 transition-colors w-full pt-2 pb-1">
                <TrophyIcon className="w-6 h-6" />
                <span className="text-xs mt-1">Xếp hạng</span>
            </a>
            <NavItem 
                icon={<UserCircleIcon className="w-6 h-6" />}
                label={isLoggedIn ? "Hồ sơ" : "Đăng nhập"}
                onClick={() => onNavigate(isLoggedIn ? 'profile' : 'login')}
            />
        </nav>
    );
};

export default MobileBottomNav;