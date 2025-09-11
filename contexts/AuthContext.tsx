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

    const login = async (email: string, password: string): Promise<boolean> => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            const loggedInUser: User = { ...user, onlineStatus: 'Online' };
            setUsers(prevUsers =>
                prevUsers.map(u => (u.id === user.id ? loggedInUser : u))
            );
            setCurrentUser(loggedInUser);
            sessionStorage.setItem('currentUser', JSON.stringify(loggedInUser));
            return true;
        }
        return false;
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
            status: 'Hoạt động',
            points: 0,
            level: 'Thành viên mới',
            onlineStatus: 'Online',
        };
        
        setUsers(prev => [...prev, newUser]);
        setCurrentUser(newUser);
        sessionStorage.setItem('currentUser', JSON.stringify(newUser));
        return true;
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
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};