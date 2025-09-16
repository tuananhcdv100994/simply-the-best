import React, { useState } from 'react';
import type { SiteContent, Partner } from '../../types';

interface SiteEditorProps {
    content: SiteContent;
    onContentChange: React.Dispatch<React.SetStateAction<SiteContent>>;
    partners: Partner[];
    onPartnersChange: React.Dispatch<React.SetStateAction<Partner[]>>;
}

const SiteEditor: React.FC<SiteEditorProps> = ({ content, onContentChange, partners, onPartnersChange }) => {
    const [localContent, setLocalContent] = useState<SiteContent>(content);
    const [localPartners, setLocalPartners] = useState<Partner[]>(partners);

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLocalContent({ ...localContent, [e.target.name]: e.target.value });
    };

    const handlePartnerChange = (id: number, newUrl: string) => {
        setLocalPartners(prev => prev.map(p => p.id === id ? { ...p, logoUrl: newUrl } : p));
    };

    const handleSave = () => {
        onContentChange(localContent);
        onPartnersChange(localPartners);
        alert('Đã lưu các thay đổi về giao diện thành công!');
    };
    
    const InputField = ({ label, name, value, onChange }: { label: string, name: keyof SiteContent, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
        <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-300">{label}</label>
            <input
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
            />
        </div>
    );

    return (
        <div className="bg-gray-800 rounded-xl border border-gray-700">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold text-white">Trình Chỉnh Sửa Giao Diện</h3>
                    <p className="text-gray-400 mt-1">Thay đổi nội dung và hình ảnh chính trên trang chủ của bạn.</p>
                </div>
                 <div className="flex items-center">
                    <button 
                        onClick={handleSave}
                        className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-all duration-300 font-bold py-2 px-6 rounded-lg text-sm">
                        Lưu Thay Đổi
                    </button>
                </div>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-900/50 p-4 rounded-lg space-y-4">
                        <h4 className="font-bold text-yellow-400 mb-2">Phần Hero</h4>
                        <InputField label="Tiêu đề chính" name="heroTitle" value={localContent.heroTitle} onChange={handleContentChange} />
                        <InputField label="Slogan" name="heroSlogan" value={localContent.heroSlogan} onChange={handleContentChange} />
                        <InputField label="Phụ đề / Mô tả" name="heroSubtitle" value={localContent.heroSubtitle} onChange={handleContentChange} />
                         <div>
                            <label className="block text-sm font-bold mb-2 text-gray-300">Ảnh nền Hero (URL)</label>
                            <input
                                type="text"
                                name="heroImageUrl"
                                value={localContent.heroImageUrl}
                                onChange={handleContentChange}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                            />
                        </div>
                    </div>
                     <div className="bg-gray-900/50 p-4 rounded-lg space-y-4">
                        <h4 className="font-bold text-yellow-400 mb-2">Phần Giới thiệu</h4>
                        <InputField label="Tiêu đề chính" name="aboutTitle" value={localContent.aboutTitle} onChange={handleContentChange} />
                        <InputField label="Phụ đề" name="aboutSubtitle" value={localContent.aboutSubtitle} onChange={handleContentChange} />
                    </div>
                </div>
                 <div className="bg-gray-900/50 p-4 rounded-lg mt-6">
                    <h4 className="font-bold text-yellow-400 mb-4">Quản lý Logo Đối tác</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {localPartners.map(partner => (
                            <div key={partner.id} className="flex items-center space-x-3">
                                <img src={partner.logoUrl} alt={partner.name} className="h-8 filter grayscale" />
                                <input
                                    type="text"
                                    value={partner.logoUrl}
                                    onChange={(e) => handlePartnerChange(partner.id, e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-yellow-400"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SiteEditor;