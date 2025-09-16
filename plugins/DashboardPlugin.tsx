import React from 'react';
import { ADMIN_STATS } from '../constants';
import type { AdminStat, User } from '../types';
import UsersIcon from '../components/icons/UsersIcon';
import UserCheckIcon from '../components/icons/UserCheckIcon';
import DollarSignIcon from '../components/icons/DollarSignIcon';
import ZapIcon from '../components/icons/ZapIcon';


const StatCard: React.FC<{ stat: AdminStat }> = ({ stat }) => (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                 {stat.change && <p className="text-sm text-green-400 mt-1">{stat.change} so với tháng trước</p>}
            </div>
            <div className="bg-yellow-400/10 text-yellow-400 rounded-lg p-3">
                <stat.icon className="h-6 w-6" />
            </div>
        </div>
    </div>
);


const DashboardPlugin: React.FC<{users: User[], posts: any[], products: any[]}> = ({users, posts, products}) => {
    
    const pendingUsersCount = users.filter(u => u.status === 'Chờ duyệt').length;

    const stats: AdminStat[] = [
        { title: 'Tổng Người Dùng', value: users.length.toLocaleString(), change: '+12%', icon: UsersIcon },
        { title: 'Chờ duyệt', value: pendingUsersCount.toLocaleString(), change: '', icon: UserCheckIcon },
        { title: 'Tổng Sản phẩm', value: products.length.toLocaleString(), change: '+5.5%', icon: DollarSignIcon },
        { title: 'Tổng Bài viết', value: posts.length.toLocaleString(), change: '+20%', icon: ZapIcon },
    ];
    
    return (
        <div>
            <h1 className="text-2xl font-bold text-white mb-6">Tổng quan</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={index} stat={stat} />
                ))}
            </div>
            {/* You can add more dashboard widgets here in the future */}
        </div>
    );
};

export default DashboardPlugin;