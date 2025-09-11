import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Logo from './icons/Logo';

interface RegisterProps {
    onNavigate: (view: 'login' | 'home') => void;
}

const Register: React.FC<RegisterProps> = ({ onNavigate }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useContext(AuthContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!name || !email || !password) {
            setError('Vui lòng điền đầy đủ thông tin.');
            return;
        }
        const success = await auth?.register(name, email, password);
        if (success) {
            onNavigate('home');
        } else {
            setError('Email này đã được sử dụng. Vui lòng chọn một email khác.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Logo className="h-20 mx-auto"/>
                    <h1 className="text-3xl font-bold text-white mt-2">Tạo Tài Khoản</h1>
                    <p className="text-gray-400">Gia nhập cộng đồng Simply The Best!</p>
                </div>
                <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
                    <form onSubmit={handleSubmit}>
                         {error && <p className="bg-red-500/20 text-red-400 text-sm text-center p-3 rounded-lg mb-4">{error}</p>}
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2 text-gray-300" htmlFor="name">Tên hiển thị</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                                placeholder="Tên của bạn"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2 text-gray-300" htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                                placeholder="ban@email.com"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-bold mb-2 text-gray-300" htmlFor="password">Mật khẩu</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                                placeholder="••••••••"
                            />
                        </div>
                        <button type="submit" className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-bold py-3 px-4 rounded-lg transition-colors">
                            Đăng Ký
                        </button>
                    </form>
                     <p className="text-center text-sm text-gray-400 mt-6">
                        Đã có tài khoản?{' '}
                        <button onClick={() => onNavigate('login')} className="font-bold text-yellow-400 hover:underline">
                            Đăng nhập
                        </button>
                    </p>
                </div>
                 <button onClick={() => onNavigate('home')} className="text-center text-sm text-gray-400 mt-6 w-full hover:text-white">
                    Quay lại trang chủ
                 </button>
            </div>
        </div>
    );
};

export default Register;