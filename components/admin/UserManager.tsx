import React, { useState, useMemo } from 'react';
import type { User, UserLevel } from '../../types';
import { USER_LEVELS } from '../../constants';

interface UserManagerProps {
    users: User[];
    onUpdateUser: (user: User) => void;
    onDeleteUser: (userId: number) => void;
}

const UserRow: React.FC<{ user: User, onUpdateUser: (user: User) => void, onDeleteUser: (userId: number) => void }> = ({ user, onUpdateUser, onDeleteUser }) => {
    
    const handleStatusChange = (newStatus: 'Hoạt động' | 'Bị cấm') => {
        onUpdateUser({ ...user, status: newStatus });
    }

    const handleApprove = () => {
        onUpdateUser({ ...user, status: 'Hoạt động' });
    }
    
    const handleDeny = () => {
         onUpdateUser({ ...user, status: 'Bị cấm' });
    }

    return (
        <tr className="border-b border-gray-700 hover:bg-gray-700/50">
            <td scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                <div className="flex items-center space-x-3">
                    <img className="w-10 h-10 rounded-full object-cover" src={user.avatarUrl} alt={user.name} />
                    <div>
                        <div>{user.name}</div>
                        <div className="text-xs text-gray-400">{user.email}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">{user.role}</td>
             <td className="px-6 py-4">
                 {user.level} {USER_LEVELS.find(l => l.name === user.level)?.badge}
            </td>
            <td className="px-6 py-4 font-medium">{user.points.toLocaleString()}</td>
            <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.status === 'Hoạt động' ? 'bg-green-500/20 text-green-400' : user.status === 'Chờ duyệt' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                    {user.status}
                </span>
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end space-x-2">
                    {user.status === 'Chờ duyệt' && user.role !== 'Admin' && (
                        <>
                            <button onClick={handleApprove} className="font-medium text-green-400 hover:underline">Duyệt</button>
                            <button onClick={handleDeny} className="font-medium text-red-500 hover:underline">Từ chối</button>
                        </>
                    )}
                    {user.status === 'Hoạt động' && user.role !== 'Admin' && (
                        <button onClick={() => handleStatusChange('Bị cấm')} className="font-medium text-red-500 hover:underline">Cấm</button>
                    )}
                    {user.status === 'Bị cấm' && user.role !== 'Admin' && (
                        <button onClick={() => handleStatusChange('Hoạt động')} className="font-medium text-green-400 hover:underline">Gỡ cấm</button>
                    )}
                </div>
            </td>
        </tr>
    );
};

type UserFilter = 'all' | 'active' | 'pending' | 'banned';

const UserManager: React.FC<UserManagerProps> = ({ users, onUpdateUser, onDeleteUser }) => {
    const [filter, setFilter] = useState<UserFilter>('all');
    
    const filteredUsers = useMemo(() => {
        switch(filter) {
            case 'active':
                return users.filter(u => u.status === 'Hoạt động');
            case 'pending':
                return users.filter(u => u.status === 'Chờ duyệt');
            case 'banned':
                return users.filter(u => u.status === 'Bị cấm');
            case 'all':
            default:
                return users;
        }
    }, [users, filter]);

    const FilterButton: React.FC<{ type: UserFilter, label: string, count: number }> = ({ type, label, count }) => (
         <button 
            onClick={() => setFilter(type)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${filter === type ? 'bg-yellow-400 text-gray-900' : 'text-gray-300 hover:bg-gray-700'}`}
        >
            {label} <span className="text-xs bg-gray-600/50 rounded-full px-2 py-0.5">{count}</span>
        </button>
    );
    
    return (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-6">
                <h3 className="text-xl font-bold text-white">Quản lý Người dùng</h3>
                <div className="flex space-x-2 mt-4 border-b border-gray-700 pb-4">
                   <FilterButton type="all" label="Tất cả" count={users.length} />
                   <FilterButton type="active" label="Hoạt động" count={users.filter(u => u.status === 'Hoạt động').length} />
                   <FilterButton type="pending" label="Chờ duyệt" count={users.filter(u => u.status === 'Chờ duyệt').length} />
                   <FilterButton type="banned" label="Bị cấm" count={users.filter(u => u.status === 'Bị cấm').length} />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-300">
                    <thead className="bg-gray-900/50 text-xs text-gray-400 uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">Người dùng</th>
                            <th scope="col" className="px-6 py-3">Vai trò</th>
                            <th scope="col" className="px-6 py-3">Cấp bậc</th>
                            <th scope="col" className="px-6 py-3">Điểm</th>
                            <th scope="col" className="px-6 py-3">Trạng thái</th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Hành động</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <UserRow key={user.id} user={user} onUpdateUser={onUpdateUser} onDeleteUser={onDeleteUser} />
                        ))}
                    </tbody>
                </table>
                 {filteredUsers.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        Không có người dùng nào trong mục này.
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserManager;