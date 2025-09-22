import React, { useState } from 'react';
import BarChartIcon from '../components/icons/BarChartIcon';
import { POSTS } from '../constants'; // Assuming posts data is available
import { getAnalyticsInsights } from '../services/GeminiService';
import ZapIcon from '../components/icons/ZapIcon';

const AnalyticsPlugin: React.FC = () => {
    const [insights, setInsights] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    // Process data for the chart
    const postsPerCategory = POSTS.reduce((acc, post) => {
        acc[post.category] = (acc[post.category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const categories = Object.keys(postsPerCategory);
    const postCounts = Object.values(postsPerCategory);
    const maxPosts = Math.max(...postCounts, 0);

    const chartHeight = 250;
    const barWidth = 40;
    const barMargin = 20;
    const chartWidth = categories.length * (barWidth + barMargin);

    const handleGetInsights = async () => {
        setIsLoading(true);
        setInsights('');
        const result = await getAnalyticsInsights(postsPerCategory);
        setInsights(result);
        setIsLoading(false);
    };

    return (
        <div className="bg-gray-800 rounded-xl border border-gray-700">
            <div className="p-6 border-b border-gray-700">
                <h3 className="text-xl font-bold text-white">Phân tích & Báo cáo</h3>
                <p className="text-gray-400 mt-1">Thống kê số lượng bài viết theo từng chuyên mục.</p>
            </div>
            <div className="p-6 overflow-x-auto">
                {categories.length > 0 ? (
                    <svg width={chartWidth} height={chartHeight + 40} className="min-w-full">
                        <g transform="translate(0, 10)">
                            {categories.map((category, index) => {
                                const postCount = postsPerCategory[category];
                                const barHeight = maxPosts > 0 ? (postCount / maxPosts) * chartHeight : 0;
                                const x = index * (barWidth + barMargin);
                                const y = chartHeight - barHeight;

                                return (
                                    <g key={category}>
                                        <rect
                                            x={x}
                                            y={y}
                                            width={barWidth}
                                            height={barHeight}
                                            fill="#d4af37"
                                            className="transition-all duration-300 hover:opacity-80"
                                        />
                                        <text x={x + barWidth / 2} y={y - 10} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                                            {postCount}
                                        </text>
                                        <text x={x + barWidth / 2} y={chartHeight + 20} textAnchor="middle" fill="#9ca3af" fontSize="12">
                                            {category}
                                        </text>
                                    </g>
                                );
                            })}
                        </g>
                    </svg>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-700 rounded-lg">
                        <BarChartIcon className="w-16 h-16 text-gray-500 mb-4" />
                        <h4 className="text-lg font-semibold text-gray-400">Không có dữ liệu bài viết</h4>
                        <p className="text-sm text-gray-500">Hãy tạo bài viết đầu tiên để xem thống kê.</p>
                    </div>
                )}
            </div>
             <div className="p-6 border-t border-gray-700">
                <div className="flex items-center space-x-4">
                    <button 
                        onClick={handleGetInsights}
                        disabled={isLoading}
                        className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-all duration-300 font-bold py-2 px-4 rounded-lg text-sm flex items-center space-x-2 disabled:opacity-50"
                    >
                        <ZapIcon className="w-5 h-5" />
                        <span>Nhận Phân tích từ AI</span>
                    </button>
                    {isLoading && <p className="text-yellow-400 animate-pulse text-sm">AI đang phân tích...</p>}
                </div>
                 {insights && (
                    <div className="mt-4 bg-gray-900/50 p-4 rounded-lg prose prose-invert prose-sm text-gray-300">
                        <p className="font-bold text-yellow-400">Gợi ý từ AI:</p>
                        <ul className="list-disc pl-5">
                            {insights.split('\n').map((item, index) => {
                                const cleanItem = item.replace(/^- /, ''); // Clean up bullet points
                                return cleanItem && <li key={index}>{cleanItem}</li>;
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnalyticsPlugin;
