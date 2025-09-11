import React, { useState, useCallback } from 'react';
import UploadCloudIcon from '../icons/UploadCloudIcon';
import type { Plugin } from '../../types';

interface UploadPluginModalProps {
    onClose: () => void;
    onPluginAdd: (newPlugin: Omit<Plugin, 'id' | 'active'>) => void;
}

const UploadPluginModal: React.FC<UploadPluginModalProps> = ({ onClose, onPluginAdd }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (files: FileList | null) => {
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        }
    };
    
    const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);
    
    const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileChange(e.dataTransfer.files);
            e.dataTransfer.clearData();
        }
    }, []);


    const handleUpload = () => {
        if (!selectedFile) return;

        setIsUploading(true);
        setUploadProgress(0);

        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    // Simulate adding a new plugin
                    onPluginAdd({
                        name: 'Plugin Cộng Đồng Mới',
                        description: 'Một plugin được cài đặt thông qua mô phỏng tải lên file ZIP.',
                        author: 'Nhà phát triển bên thứ ba',
                    });
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-xl w-full max-w-lg">
                <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">Tải lên Plugin</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
                </div>
                <div className="p-8">
                    {!isUploading ? (
                        <>
                            <div 
                                onDragOver={onDragOver}
                                onDragLeave={onDragLeave}
                                onDrop={onDrop}
                                className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg transition-colors duration-200 ${isDragging ? 'border-yellow-400 bg-gray-700/50' : 'border-gray-600'}`}
                            >
                                <UploadCloudIcon className="w-12 h-12 text-gray-500 mb-4" />
                                <p className="text-white font-semibold">Kéo & thả file .zip vào đây</p>
                                <p className="text-gray-400 text-sm mt-1">hoặc</p>
                                <label className="mt-2 bg-gray-700 text-white hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 font-bold py-2 px-4 rounded-lg text-sm cursor-pointer">
                                    <span>Chọn File</span>
                                    <input type="file" className="hidden" accept=".zip" onChange={(e) => handleFileChange(e.target.files)} />
                                </label>
                            </div>
                            {selectedFile && (
                                <div className="mt-4 text-center text-sm text-gray-300">
                                    File đã chọn: <span className="font-medium text-yellow-400">{selectedFile.name}</span>
                                </div>
                            )}
                        </>
                    ) : (
                        <div>
                            <p className="text-white text-center mb-2">Đang cài đặt plugin...</p>
                             <div className="w-full bg-gray-700 rounded-full h-2.5">
                                <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${uploadProgress}%`, transition: 'width 0.2s ease-in-out' }}></div>
                            </div>
                            <p className="text-center text-yellow-400 font-bold mt-2">{uploadProgress}%</p>
                        </div>
                    )}
                </div>
                <div className="p-6 bg-gray-900/50 rounded-b-xl flex justify-end space-x-3">
                    <button onClick={onClose} className="bg-gray-600 text-white hover:bg-gray-500 transition-all duration-300 font-bold py-2 px-5 rounded-lg text-sm">
                        Hủy
                    </button>
                    <button 
                        onClick={handleUpload} 
                        disabled={!selectedFile || isUploading}
                        className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-all duration-300 font-bold py-2 px-5 rounded-lg text-sm disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        {isUploading ? 'Đang cài đặt...' : 'Cài đặt Ngay'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadPluginModal;