import React, { useState, useMemo } from 'react';
import type { Post, Product, SEOReport } from '../types';
import { analyzeContentSEO } from '../services/GeminiService';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';
import AlertCircleIcon from '../components/icons/AlertCircleIcon';

interface SEOPluginProps {
    posts: Post[];
    products: Product[];
}

// FIX: Define ContentItem as a discriminated union for proper type narrowing.
type ContentItem = (Post & { type: 'Post' }) | (Product & { type: 'Product' });

const SEOPlugin: React.FC<SEOPluginProps> = ({ posts, products }) => {
    const [activeTab, setActiveTab] = useState<'posts' | 'products'>('posts');
    const [analysisResult, setAnalysisResult] = useState<Record<string, SEOReport | null>>({});
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const contentItems: ContentItem[] = useMemo(() => {
        const postItems: ContentItem[] = posts.map(p => ({ ...p, type: 'Post' }));
        const productItems: ContentItem[] = products.map(p => ({ ...p, type: 'Product' }));
        return activeTab === 'posts' ? postItems : productItems;
    }, [posts, products, activeTab]);

    const handleAnalyze = async (item: ContentItem) => {
        const key = `${item.type}-${item.id}`;
        setLoadingId(key);
        setAnalysisResult(prev => ({ ...prev, [key]: null }));
        
        // FIX: Use type-safe property access based on the discriminated union.
        const title = item.type === 'Post' ? item.title : item.name;
        const content = item.type === 'Post' ? item.content : item.description;

        const report = await analyzeContentSEO(title, content);
        setAnalysisResult(prev => ({ ...prev, [key]: report }));
        setLoadingId(null);
    };
    
    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-400';
        if (score >= 50) return 'text-yellow-400';
        return 'text-red-400';
    }

    return (
        <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <h3 className="text-xl font-bold text-white">Phân tích SEO</h3>
                <p className="text-gray-400 mt-1">Sử dụng AI để đánh giá và nhận đề xuất cải thiện SEO cho nội dung của bạn.</p>
            </div>

            <div className="flex border-b border-gray-700">
                <button 
                    onClick={() => setActiveTab('posts')}
                    className={`px-4 py-2 text-sm font-semibold ${activeTab === 'posts' ? 'border-b-2 border-yellow-400 text-white' : 'text-gray-400'}`}
                >
                    Bài viết ({posts.length})
                </button>
                <button 
                    onClick={() => setActiveTab('products')}
                    className={`px-4 py-2 text-sm font-semibold ${activeTab === 'products' ? 'border-b-2 border-yellow-400 text-white' : 'text-gray-400'}`}
                >
                    Sản phẩm ({products.length})
                </button>
            </div>

            <div className="space-y-4">
                {contentItems.map(item => {
                    const key = `${item.type}-${item.id}`;
                    const result = analysisResult[key];
                    const isLoading = loadingId === key;
                    // FIX: Use type-safe property access based on the discriminated union.
                    const title = item.type === 'Post' ? item.title : item.name;

                    return (
                        <div key={key} className="bg-gray-800 rounded-xl border border-gray-700 p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="text-xs bg-yellow-400/20 text-yellow-400 font-bold px-2 py-1 rounded-full">{item.type}</span>
                                    <p className="font-semibold text-white mt-2">{title}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                     {result && <div className="text-right">
                                        <p className="text-sm text-gray-400">Điểm SEO</p>
                                        <p className={`text-3xl font-bold ${getScoreColor(result.score)}`}>{result.score}<span className="text-lg">/100</span></p>
                                    </div>}
                                    <button
                                        onClick={() => handleAnalyze(item)}
                                        disabled={isLoading}
                                        className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-bold py-2 px-4 rounded-lg text-sm disabled:opacity-50 w-32 text-center"
                                    >
                                        {isLoading ? 'Đang quét...' : result ? 'Quét lại' : 'Quét SEO'}
                                    </button>
                                </div>
                            </div>
                            {isLoading && <div className="text-center py-4 text-yellow-400 animate-pulse">AI đang phân tích, vui lòng chờ...</div>}
                            {result && (
                                <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-bold text-green-400 flex items-center"><CheckCircleIcon className="w-5 h-5 mr-2" />Điểm tốt</h4>
                                        <ul className="list-disc pl-5 mt-2 text-sm text-gray-300 space-y-1">
                                            {result.good.map((g, i) => <li key={i}>{g}</li>)}
                                        </ul>
                                    </div>
                                     <div>
                                        <h4 className="font-bold text-red-400 flex items-center"><AlertCircleIcon className="w-5 h-5 mr-2" />Cần cải thiện</h4>
                                        <ul className="list-disc pl-5 mt-2 text-sm text-gray-300 space-y-1">
                                            {result.improvements.map((imp, i) => <li key={i}>{imp}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SEOPlugin;