import React, { useState } from 'react';
import type { User, UserLevel } from '../../types';
import { USER_LEVELS } from '../../constants';

interface UserManagerProps {
    users: User[];
    onUpdateUser: (user: User) => void;
    onDeleteUser: (userId: number) => void;
}

const UserRow: React.FC<{ user: User, onUpdateUser: (user: User) => void, onDeleteUser: (userId: number) => void }> = ({ user, onUpdateUser, onDeleteUser }) => {
    const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);

    const handleLevelChange = (newLevel: UserLevel) => {
        const levelInfo = USER_LEVELS.find(l => l.name === newLevel);
        if (levelInfo) {
            onUpdateUser({ ...user, level: newLevel, points: levelInfo.minPoints });
        }
    };
    
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAvatarUrl(e.target.value);
    };

    const handleAvatarBlur = () => {
        if (user.avatarUrl !== avatarUrl) {
            onUpdateUser({ ...user, avatarUrl: avatarUrl });
        }
    };
    
    return (
        <tr className="border-b border-gray-700 hover:bg-gray-700/50">
            <td scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                <div className="flex items-center space-x-3">
                    <img className="w-10 h-10 rounded-full object-cover" src={avatarUrl} alt={user.name} />
                    <div>
                        <div>{user.name}</div>
                        <div className="text-xs text-gray-400">{user.email}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <input 
                    type="text"
                    value={avatarUrl}
                    onChange={handleAvatarChange}
                    onBlur={handleAvatarBlur}
                    className="bg-gray-700 border border-gray-600 text-white text-xs rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-1.5"
                    placeholder="URL Avatar"
                />
            </td>
            <td className="px-6 py-4">{user.role}</td>
             <td className="px-6 py-4">
                 {user.role === 'Admin' ? (
                    <span className="font-semibold">{user.level}</span>
                 ) : (
                    <select 
                        value={user.level} 
                        onChange={(e) => handleLevelChange(e.target.value as UserLevel)}
                        className="bg-gray-700 border border-gray-600 text-white text-xs rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-1.5"
                    >
                        {USER_LEVELS.map(level => (
                            <option key={level.name} value={level.name}>{level.badge} {level.name}</option>
                        ))}
                    </select>
                 )}
            </td>
            <td className="px-6 py-4 font-medium">{user.points.toLocaleString()}</td>
            <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.status === 'Hoạt động' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {user.status}
                </span>
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end space-x-2">
                    <button disabled={user.role === 'Admin'} onClick={() => onDeleteUser(user.id)} className="font-medium text-red-500 hover:underline disabled:text-gray-500 disabled:cursor-not-allowed">Xóa</button>
                </div>
            </td>
        </tr>
    );
};


const UserManager: React.FC<UserManagerProps> = ({ users, onUpdateUser, onDeleteUser }) => {
    return (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-6">
                <h3 className="text-xl font-bold text-white">Quản lý Người dùng</h3>
                <p className="text-gray-400 mt-1">Tìm thấy tổng cộng {users.length} người dùng.</p>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-300">
                    <thead className="bg-gray-900/50 text-xs text-gray-400 uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">Người dùng</th>
                             <th scope="col" className="px-6 py-3">Avatar URL</th>
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
                        {users.map(user => (
                            <UserRow key={user.id} user={user} onUpdateUser={onUpdateUser} onDeleteUser={onDeleteUser} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManager;