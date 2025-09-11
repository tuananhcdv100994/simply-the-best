import React, { useState } from 'react';
import Logo from './icons/Logo';

interface HeaderProps {
    onNavigate: (view: 'home' | 'login' | 'register') => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinks = [
    { href: '#about', label: 'Giá trị' },
    { href: '#community', label: 'Cộng đồng' },
    { href: '#leaderboard', label: 'Xếp hạng' },
    { href: '#events', label: 'Sự kiện' },
    { href: '#merch', label: 'Cửa hàng' },
  ];

  return (
    <header className={'sticky top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg shadow-lg'}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-24">
            <a onClick={() => onNavigate('home')} className="flex items-center space-x-2 cursor-pointer">
              <Logo className="h-20"/>
            </a>
          
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-semibold text-gray-300 hover:text-yellow-400 transition-colors duration-300">
                {link.label}
              </a>
            ))}
          </nav>
        
          <div className="hidden lg:flex items-center space-x-2">
            <button onClick={() => onNavigate('login')} className="text-sm font-semibold text-gray-300 hover:text-yellow-400 transition-colors duration-300 py-2 px-4">
                Đăng nhập
            </button>
            <button onClick={() => onNavigate('register')} className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-all duration-300 font-bold py-2 px-5 rounded-full text-sm">
                Đăng ký
            </button>
          </div>
          
          <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>
       {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-4 pt-2 pb-4 border-t border-gray-700">
            <nav className="flex flex-col space-y-3">
                 {navLinks.map((link) => (
                    <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-base font-semibold text-gray-300 hover:text-yellow-400 transition-colors duration-300 py-1">
                        {link.label}
                    </a>
                ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-gray-700 flex flex-col space-y-3">
                <button onClick={() => { onNavigate('login'); setIsMenuOpen(false); }} className="w-full text-left text-base font-semibold text-gray-300 hover:text-yellow-400 transition-colors duration-300 py-2">
                    Đăng nhập
                </button>
                <button onClick={() => { onNavigate('register'); setIsMenuOpen(false); }} className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-all duration-300 font-bold py-2 px-5 rounded-full text-base">
                    Đăng ký
                </button>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;