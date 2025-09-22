import React, { useContext } from 'react';
import type { AdminStat, User } from '../types';
import UsersIcon from '../components/icons/UsersIcon';
import UserCheckIcon from '../components/icons/UserCheckIcon';
import DollarSignIcon from '../components/icons/DollarSignIcon';
import ZapIcon from '../components/icons/ZapIcon';
import { AuthContext } from '../contexts/AuthContext';
import { ContentContext } from '../contexts/ContentContext';

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


const DashboardPlugin: React.FC<{ setActiveView: (view: any) => void }> = ({ setActiveView }) => {
    const auth = useContext(AuthContext);
    const content = useContext(ContentContext);

    if (!auth || !content) return null;
    const { users, updateUser } = auth;
    const { posts, products } = content;
    
    const pendingUsers = users.filter(u => u.status === 'Chờ duyệt');

    const stats: AdminStat[] = [
        { title: 'Tổng Người Dùng', value: users.length.toLocaleString(), change: '', icon: UsersIcon },
        { title: 'Chờ duyệt', value: pendingUsers.length.toLocaleString(), change: '', icon: UserCheckIcon },
        { title: 'Tổng Sản phẩm', value: products.length.toLocaleString(), change: '', icon: DollarSignIcon },
        { title: 'Tổng Bài viết', value: posts.length.toLocaleString(), change: '', icon: ZapIcon },
    ];
    
    return (
        <div>
            <h1 className="text-2xl font-bold text-white mb-6">Tổng quan</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={index} stat={stat} />
                ))}
            </div>

            {pendingUsers.length > 0 && (
                <div className="mt-8 bg-gray-800 rounded-xl border border-gray-700">
                    <div className="p-4 border-b border-gray-700">
                        <h3 className="font-bold text-white">Người dùng chờ phê duyệt</h3>
                    </div>
                    <ul className="divide-y divide-gray-700">
                        {pendingUsers.map(user => (
                            <li key={user.id} className="p-4 flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                                    <div>
                                        <p className="font-semibold text-white">{user.name}</p>
                                        <p className="text-sm text-gray-400">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                     <button onClick={() => updateUser({...user, status: 'Hoạt động'})} className="text-sm bg-green-500/20 text-green-400 hover:bg-green-500/40 font-bold py-1 px-3 rounded-md">Duyệt</button>
                                     <button onClick={() => updateUser({...user, status: 'Bị cấm'})} className="text-sm bg-red-500/20 text-red-400 hover:bg-red-500/40 font-bold py-1 px-3 rounded-md">Từ chối</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                     <div className="p-4 bg-gray-900/50 rounded-b-xl text-center">
                        <button onClick={() => setActiveView('users')} className="text-sm font-semibold text-yellow-400 hover:underline">
                            Xem tất cả người dùng →
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPlugin;
