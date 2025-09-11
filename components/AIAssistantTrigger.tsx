import React from 'react';

interface AIAssistantTriggerProps {
    onClick: () => void;
}

const AIAssistantTrigger: React.FC<AIAssistantTriggerProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 bg-yellow-400 text-gray-900 w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-yellow-300 transition-transform transform hover:scale-110 z-50"
            aria-label="Mở Trợ lý AI"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8V4H8" />
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M20 12h-4" />
                <path d="M12 20v-4" />
            </svg>
        </button>
    );
};

export default AIAssistantTrigger;
