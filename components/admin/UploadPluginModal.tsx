import React, { useState } from 'react';
import type { Plugin } from '../../types';

interface UploadPluginModalProps {
    onClose: () => void;
    onPluginAdd: (newPlugin: Omit<Plugin, 'id' | 'active'>) => void;
}

const UploadPluginModal: React.FC<UploadPluginModalProps> = ({ onClose, onPluginAdd }) => {
    const [jsonInput, setJsonInput] = useState('');
    const [error, setError] = useState('');

    const handleInstall = () => {
        setError('');
        if (!jsonInput.trim()) {
            setError('Vui lòng dán nội dung JSON.');
            return;
        }

        try {
            const parsed = JSON.parse(jsonInput);
            // Basic validation
            if (!parsed.name || !parsed.description || !parsed.author) {
                throw new Error('JSON thiếu các trường bắt buộc: name, description, author.');
            }
            const newPlugin: Omit<Plugin, 'id' | 'active'> = {
                name: parsed.name,
                description: parsed.description,
                author: parsed.author,
            };
            onPluginAdd(newPlugin);
        } catch (e: any) {
            setError('Lỗi phân tích JSON: ' + e.message);
        }
    };

    const placeholderJson = `{
  "name": "Tên Plugin Mới",
  "description": "Mô tả về chức năng của plugin này.",
  "author": "Tên Tác Giả"
}`;

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-xl w-full max-w-lg">
                <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">Thêm Plugin từ JSON</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
                </div>
                <div className="p-8">
                    <p className="text-gray-400 mb-4 text-sm">
                        Dán nội dung JSON của plugin vào ô bên dưới để cài đặt.
                        Lưu ý: Chức năng này chỉ dành cho mục đích mô phỏng. Plugin sẽ không được lưu lại sau khi tải lại trang.
                    </p>
                    <textarea
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        placeholder={placeholderJson}
                        rows={10}
                        className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-yellow-400"
                    />
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                </div>
                <div className="p-6 bg-gray-900/50 rounded-b-xl flex justify-end space-x-3">
                    <button onClick={onClose} className="bg-gray-600 text-white hover:bg-gray-500 transition-all duration-300 font-bold py-2 px-5 rounded-lg text-sm">
                        Hủy
                    </button>
                    <button 
                        onClick={handleInstall} 
                        className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-all duration-300 font-bold py-2 px-5 rounded-lg text-sm"
                    >
                        Cài đặt
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadPluginModal;
