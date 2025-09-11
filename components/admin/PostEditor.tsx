import React, { useState, useEffect } from 'react';
import type { Post } from '../../types';
import { generatePostTitle, optimizePostSEO, expandPostContent } from '../../services/GeminiService';
import ZapIcon from '../icons/ZapIcon';

interface PostEditorProps {
    post: Post | null;
    onSave: (post: Post) => void;
    onCancel: () => void;
}

const NEW_POST_TEMPLATE: Post = {
    id: 0,
    title: '',
    content: '',
    imageUrl: '',
    author: '',
    category: 'Sự nghiệp',
    likes: 0,
    comments: 0,
    status: 'Bản nháp',
    seoKeywords: '',
    datePublished: new Date().toISOString().split('T')[0],
};

const PostEditor: React.FC<PostEditorProps> = ({ post, onSave, onCancel }) => {
    const [editedPost, setEditedPost] = useState<Post>(post ? { ...post } : NEW_POST_TEMPLATE);
    const [isAiLoading, setIsAiLoading] = useState(false);

    useEffect(() => {
        setEditedPost(post ? { ...post } : NEW_POST_TEMPLATE);
    }, [post]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedPost(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (status: 'Xuất bản' | 'Bản nháp') => {
        onSave({ ...editedPost, status });
    };
    
    const handleAiAction = async (action: 'title' | 'seo' | 'expand') => {
        setIsAiLoading(true);
        try {
            switch (action) {
                case 'title':
                    if (editedPost.content) {
                        const newTitle = await generatePostTitle(editedPost.content);
                        setEditedPost(prev => ({...prev, title: newTitle}));
                    }
                    break;
                case 'seo':
                    if (editedPost.title) {
                        const keywords = await optimizePostSEO(editedPost.title, editedPost.content);
                        setEditedPost(prev => ({...prev, seoKeywords: keywords}));
                    }
                    break;
                case 'expand':
                     if (editedPost.content) {
                        const expandedText = await expandPostContent(editedPost.content);
                        setEditedPost(prev => ({...prev, content: expandedText}));
                    }
                    break;
            }
        } catch (error) {
            console.error("AI Action failed:", error);
            alert("Đã có lỗi xảy ra với trợ lý AI. Vui lòng thử lại.");
        } finally {
            setIsAiLoading(false);
        }
    };

    const generateSchema = () => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": editedPost.title,
            "image": editedPost.imageUrl,
            "author": {
                "@type": "Person",
                "name": editedPost.author || "Admin"
            },
            "publisher": {
                "@type": "Organization",
                "name": "Simply The Best!",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://simplythebest.vn/logo.png"
                }
            },
            "datePublished": editedPost.datePublished,
            "description": editedPost.content.substring(0, 150) + '...',
            "keywords": editedPost.seoKeywords
        };
        return JSON.stringify(schema, null, 2);
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">{post ? 'Chỉnh sửa bài viết' : 'Viết bài mới'}</h1>
                <button onClick={onCancel} className="text-gray-400 hover:text-white">← Quay lại danh sách</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                         <label htmlFor="title" className="block text-sm font-bold mb-2 text-gray-300">Tiêu đề</label>
                         <input
                            type="text"
                            id="title"
                            name="title"
                            data-guide-id="post-editor-title"
                            value={editedPost.title}
                            onChange={handleChange}
                            placeholder="Tiêu đề bài viết..."
                            className="w-full px-3 py-2 text-xl bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                        />
                    </div>
                     <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                         <label htmlFor="content" className="block text-sm font-bold mb-2 text-gray-300">Nội dung</label>
                        <textarea
                            id="content"
                            name="content"
                            data-guide-id="post-editor-content"
                            value={editedPost.content}
                            onChange={handleChange}
                            placeholder="Bắt đầu viết câu chuyện của bạn..."
                            rows={15}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                        />
                    </div>
                     <div className="bg-gray-800 rounded-xl border border-gray-700">
                        <div className="p-4 border-b border-gray-700 flex items-center space-x-2">
                            <ZapIcon className="w-5 h-5 text-yellow-400"/>
                            <h3 className="font-bold text-white">Trợ lý Nội dung AI</h3>
                        </div>
                        <div className="p-4 flex flex-wrap gap-2">
                             <button onClick={() => handleAiAction('title')} disabled={isAiLoading || !editedPost.content} className="text-sm bg-gray-700 text-white hover:bg-yellow-400 hover:text-gray-900 transition-colors font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
                                Gợi ý tiêu đề
                            </button>
                             <button onClick={() => handleAiAction('seo')} disabled={isAiLoading || !editedPost.title} className="text-sm bg-gray-700 text-white hover:bg-yellow-400 hover:text-gray-900 transition-colors font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
                                Tối ưu SEO
                            </button>
                             <button onClick={() => handleAiAction('expand')} disabled={isAiLoading || !editedPost.content} className="text-sm bg-gray-700 text-white hover:bg-yellow-400 hover:text-gray-900 transition-colors font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
                                Viết tiếp/Mở rộng
                            </button>
                            {isAiLoading && <span className="text-sm text-yellow-400 animate-pulse">AI đang xử lý...</span>}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                     <div className="bg-gray-800 rounded-xl border border-gray-700">
                        <div className="p-4 border-b border-gray-700"><h3 className="font-bold text-white">Xuất bản</h3></div>
                        <div className="p-4 space-y-4">
                            <div>Trạng thái: <span className="font-semibold text-yellow-400">{editedPost.status}</span></div>
                            <div className="flex space-x-2">
                                <button data-guide-id="post-editor-save-draft" onClick={() => handleSave('Bản nháp')} className="flex-1 bg-gray-600 text-white hover:bg-gray-500 transition-colors font-bold py-2 px-4 rounded-lg text-sm">Lưu nháp</button>
                                <button data-guide-id="post-editor-publish" onClick={() => handleSave('Xuất bản')} className="flex-1 bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-colors font-bold py-2 px-4 rounded-lg text-sm">Xuất bản</button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-xl border border-gray-700">
                        <div className="p-4 border-b border-gray-700"><h3 className="font-bold text-white">Ảnh đại diện</h3></div>
                        <div className="p-4">
                            <input
                                type="text"
                                name="imageUrl"
                                data-guide-id="post-editor-image"
                                value={editedPost.imageUrl}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                            />
                            {editedPost.imageUrl && <img src={editedPost.imageUrl} alt="Preview" className="mt-4 rounded-lg w-full object-cover"/>}
                        </div>
                    </div>
                    
                    <div className="bg-gray-800 rounded-xl border border-gray-700">
                        <div className="p-4 border-b border-gray-700"><h3 className="font-bold text-white">Tối ưu SEO</h3></div>
                        <div className="p-4">
                             <label htmlFor="seoKeywords" className="block text-xs font-bold mb-2 text-gray-300">Từ khóa (cách nhau bằng dấu phẩy)</label>
                             <input
                                type="text"
                                id="seoKeywords"
                                name="seoKeywords"
                                data-guide-id="post-editor-seo"
                                value={editedPost.seoKeywords}
                                onChange={handleChange}
                                placeholder="thể thao, thành tích, cảm hứng"
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                            />
                             <div className="mt-4">
                                <h4 className="text-xs font-bold text-gray-300 mb-2">Xem trước Schema (JSON-LD)</h4>
                                <pre className="text-xs bg-gray-900 p-3 rounded-lg text-green-400 overflow-x-auto">
                                    <code>{generateSchema()}</code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostEditor;