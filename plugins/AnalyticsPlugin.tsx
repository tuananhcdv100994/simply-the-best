import React from 'react';
import BarChartIcon from '../components/icons/BarChartIcon';

const AnalyticsPlugin: React.FC = () => {
    return (
        <div className="bg-gray-800 rounded-xl border border-gray-700">
            <div className="p-6 border-b border-gray-700">
                <h3 className="text-xl font-bold text-white">Phân tích & Báo cáo</h3>
                <p className="text-gray-400 mt-1">Đây là một plugin mẫu để hiển thị dữ liệu phân tích.</p>
            </div>
            <div className="p-6">
                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-700 rounded-lg">
                    <BarChartIcon className="w-16 h-16 text-gray-500 mb-4" />
                    <h4 className="text-lg font-semibold text-gray-400">Biểu đồ Phân tích</h4>
                    <p className="text-sm text-gray-500">Dữ liệu thực tế sẽ được hiển thị ở đây khi kết nối backend.</p>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPlugin;
