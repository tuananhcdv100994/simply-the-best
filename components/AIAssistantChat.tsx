import React, { useState, useRef, useEffect, useContext } from 'react';
import type { ChatMessage } from '../types';
import { getChatbotResponse } from '../services/GeminiService';
import { AuthContext } from '../contexts/AuthContext';

interface AIAssistantChatProps {
    isOpen: boolean;
    onClose: () => void;
    onStartGuide: (guideName: string) => void;
}

const AIAssistantChat: React.FC<AIAssistantChatProps> = ({ isOpen, onClose, onStartGuide }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: 1, text: 'Xin chào! Chào mừng bạn đến với Simply The Best! Tôi có thể hướng dẫn bạn cách tạo bài viết đầu tiên. Bạn có muốn bắt đầu không?', sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const auth = useContext(AuthContext);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage, { id: Date.now() + 1, text: '', sender: 'ai', isTyping: true }]);
        setInput('');
        setIsLoading(true);

        try {
            const aiResponseText = await getChatbotResponse(messages, input, auth?.currentUser?.role, auth?.currentUser?.name);
            
            // Check for guide command
            const guideMatch = aiResponseText.match(/\[GUIDE:(.*?)\]/);
            let cleanText = aiResponseText;

            if (guideMatch && guideMatch[1]) {
                const guideName = guideMatch[1].trim();
                cleanText = aiResponseText.replace(/\[GUIDE:.*?\]/, '').trim();
                onStartGuide(guideName);
            }
            
            const aiMessage: ChatMessage = { id: Date.now() + 2, text: cleanText, sender: 'ai' };
            setMessages(prev => prev.slice(0, -1).concat(aiMessage));

        } catch (error) {
            const errorMessage: ChatMessage = { id: Date.now() + 2, text: 'Rất xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.', sender: 'ai' };
            setMessages(prev => prev.slice(0, -1).concat(errorMessage));
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed bottom-24 right-6 w-full max-w-sm h-full max-h-[600px] bg-gray-800 rounded-xl shadow-2xl flex flex-col z-50 border border-gray-700">
            {/* Header */}
            <div className="flex-shrink-0 p-4 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Trợ lý AI</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
            </div>

            {/* Messages */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                        {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-gray-900 font-bold flex-shrink-0">A</div>}
                        <div className={`max-w-xs md:max-w-sm rounded-xl px-4 py-2 ${msg.sender === 'ai' ? 'bg-gray-700 text-white' : 'bg-yellow-400 text-gray-900'}`}>
                           {msg.isTyping ? (
                                <div className="flex items-center space-x-1">
                                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75"></span>
                                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></span>
                                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-300"></span>
                                </div>
                           ) : (
                               <p className="text-sm">{msg.text}</p>
                           )}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex-shrink-0 p-4 border-t border-gray-700">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Hỏi tôi bất cứ điều gì..."
                        disabled={isLoading}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 disabled:opacity-50"
                    />
                    <button type="submit" disabled={isLoading} className="bg-yellow-400 text-gray-900 p-2 rounded-lg hover:bg-yellow-300 disabled:bg-gray-500 disabled:cursor-not-allowed">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AIAssistantChat;