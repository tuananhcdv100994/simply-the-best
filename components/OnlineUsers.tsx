import React from 'react';
import Section from './Section';
import type { User } from '../types';

interface OnlineUsersProps {
    users: User[];
}

const UserAvatar: React.FC<{ user: User }> = ({ user }) => (
    <div className="relative flex-shrink-0 text-center">
        <img src={user.avatarUrl} alt={user.name} className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-gray-700" />
        <span 
            className={`absolute bottom-0 right-2 w-4 h-4 rounded-full border-2 border-gray-800 ${user.onlineStatus === 'Online' ? 'bg-green-500' : 'bg-gray-500'}`}
            title={user.onlineStatus}
        ></span>
        <p className="text-xs text-white mt-2 truncate w-20">{user.name}</p>
    </div>
);

const OnlineUsers: React.FC<OnlineUsersProps> = ({ users }) => {
    // Show only active users, up to 10
    const activeUsers = users.filter(u => u.status === 'Hoạt động').slice(0, 10);

    return (
        <Section id="online-users" title="Thành viên Cộng đồng" subtitle="Gặp gỡ và kết nối với những người dùng đang hoạt động.">
            <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                <div className="flex flex-wrap justify-center gap-6">
                    {activeUsers.map(user => (
                        <UserAvatar key={user.id} user={user} />
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default OnlineUsers;