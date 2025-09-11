import React, { useState } from 'react';
import ChatBubbleIcon from './icons/ChatBubbleIcon';
import PhoneIcon from './icons/PhoneIcon';
import FacebookIcon from './icons/FacebookIcon';
import YoutubeIcon from './icons/YoutubeIcon';
import TiktokIcon from './icons/TiktokIcon';
import PlusIcon from './icons/PlusIcon';

interface ActionPopupProps {
    onOpenAIChat: () => void;
}

const ActionPopup: React.FC<ActionPopupProps> = ({ onOpenAIChat }) => {
    const [isOpen, setIsOpen] = useState(false);

    const socialLinks = [
        { name: 'Facebook', icon: FacebookIcon, href: '#' },
        { name: 'YouTube', icon: YoutubeIcon, href: '#' },
        { name: 'TikTok', icon: TiktokIcon, href: '#' },
        { name: 'Zalo', text: 'Z', href: '#' },
    ];
    
    const actionButtons = [
        { name: 'Gọi điện', icon: PhoneIcon, href: 'tel:02742221292' },
        { name: 'Trợ lý AI', icon: ChatBubbleIcon, onClick: onOpenAIChat },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    const ActionButton: React.FC<{ item: any }> = ({ item }) => (
         <a 
            href={item.href}
            onClick={item.onClick}
            target={item.href ? "_blank" : undefined}
            rel={item.href ? "noopener noreferrer" : undefined}
            className="group flex flex-col items-center justify-center text-center space-y-1 text-white hover:text-yellow-400 transition-colors"
        >
            <div className="w-12 h-12 rounded-full bg-gray-700 group-hover:bg-yellow-400 flex items-center justify-center transition-colors text-white group-hover:text-gray-900">
                {item.icon && <item.icon className="w-6 h-6" />}
                {item.text && <span className="text-xl font-bold">{item.text}</span>}
            </div>
            <span className="text-xs">{item.name}</span>
        </a>
    );

    return (
        <div className="fixed bottom-6 right-6 z-[10000]">
            {/* Action Buttons */}
            <div className={`flex flex-col items-center space-y-4 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                 {actionButtons.map(item => (
                    <button 
                        key={item.name}
                        onClick={item.onClick}
                        className="group flex items-center space-x-3"
                    >
                         <span className="text-sm font-semibold bg-gray-800 text-white px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mr-2">{item.name}</span>
                        <div className="w-14 h-14 rounded-full bg-yellow-400 hover:bg-yellow-300 flex items-center justify-center shadow-lg text-gray-900">
                             {item.icon && <item.icon className="w-7 h-7" />}
                        </div>
                    </button>
                ))}
                
                <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center shadow-lg relative group">
                    <div className="absolute bottom-full mb-4 w-48 bg-gray-700 rounded-lg p-2 flex justify-around opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                        {socialLinks.map(link => (
                             <a key={link.name} href={link.href} className="text-white hover:text-yellow-400 p-2">
                                {link.icon && <link.icon className="w-6 h-6" />}
                                {link.text && <span className="text-lg font-bold">{link.text}</span>}
                            </a>
                        ))}
                    </div>
                     <span className="text-white font-bold text-lg">...</span>
                </div>
            </div>
           
            {/* Main Trigger Button */}
            <button
                onClick={toggleMenu}
                className={`mt-4 w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-transform transform z-10 ${isOpen ? 'bg-red-500 hover:bg-red-400 rotate-45' : 'bg-yellow-400 hover:bg-yellow-300'}`}
                aria-label="Mở Menu Hành động"
            >
                <PlusIcon className={`w-8 h-8 text-gray-900 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
            </button>
        </div>
    );
};

export default ActionPopup;