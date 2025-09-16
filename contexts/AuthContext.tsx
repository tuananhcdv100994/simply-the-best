import React, { createContext, useState, useEffect, ReactNode } from 'react';
import type { User, AuthContextType } from '../types';
import { USERS } from '../constants';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>(USERS);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate checking for a logged-in user in session storage
        const storedUserJson = sessionStorage.getItem('currentUser');
        if (storedUserJson) {
            const storedUser = JSON.parse(storedUserJson);
            setCurrentUser(storedUser);
            // On page load, if a user was logged in, ensure their status is 'Online'
            setUsers(prevUsers => 
                prevUsers.map(u => u.id === storedUser.id ? { ...u, onlineStatus: 'Online' } : u)
            );
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<User | null> => {
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user && user.status === 'Bị cấm') {
            alert('Tài khoản của bạn đã bị cấm.');
            return null;
        }
        
        if (user && user.status === 'Chờ duyệt') {
            alert('Tài khoản của bạn đang chờ quản trị viên phê duyệt.');
            return null;
        }

        if (user && user.status === 'Hoạt động') {
            const loggedInUser: User = { ...user, onlineStatus: 'Online' };
            setUsers(prevUsers =>
                prevUsers.map(u => (u.id === user.id ? loggedInUser : u))
            );
            setCurrentUser(loggedInUser);
            sessionStorage.setItem('currentUser', JSON.stringify(loggedInUser));
            return loggedInUser;
        }
        return null;
    };

    const register = async (name: string, email: string, password: string): Promise<boolean> => {
        if (users.some(u => u.email === email)) {
            alert('Email đã tồn tại!');
            return false;
        }
        
        const newUser: User = {
            id: Date.now(),
            name,
            email,
            password,
            avatarUrl: `https://i.pravatar.cc/150?u=${email}`,
            role: 'User',
            joined: new Date().toISOString().split('T')[0],
            status: 'Chờ duyệt', // New users must be approved
            points: 0,
            level: 'Thành viên mới',
            onlineStatus: 'Offline',
        };
        
        setUsers(prev => [...prev, newUser]);
        alert('Đăng ký thành công! Tài khoản của bạn sẽ được kích hoạt sau khi quản trị viên phê duyệt.');
        // Do not log in automatically
        // setCurrentUser(newUser);
        // sessionStorage.setItem('currentUser', JSON.stringify(newUser));
        return true;
    };
    
    const updateUser = (updatedUser: User) => {
        setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
    };

    const logout = () => {
        if (currentUser) {
            setUsers(prevUsers =>
                prevUsers.map(u => (u.id === currentUser.id ? { ...u, onlineStatus: 'Offline' } : u))
            );
        }
        setCurrentUser(null);
        sessionStorage.removeItem('currentUser');
    };
    
    const value = {
        currentUser,
        users,
        login,
        register,
        logout,
        updateUser,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};