import React from 'react';
import type { MediaItem } from '../../types';
import UploadCloudIcon from '../icons/UploadCloudIcon';
import FilmIcon from '../icons/FilmIcon';

interface MediaManagerProps {
    items: MediaItem[];
    onAddMedia: (item: Omit<MediaItem, 'id'>) => void;
}

const MediaGridItem: React.FC<{ item: MediaItem }> = ({ item }) => {
    return (
        <div className="group relative aspect-square bg-gray-700 rounded-lg overflow-hidden border-2 border-transparent hover:border-yellow-400 transition-all">
            {item.type === 'image' ? (
                <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <video src={item.url} className="w-full h-full object-cover" />
                </div>
            )}
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 {item.type === 'video' && <FilmIcon className="w-12 h-12 text-white" />}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-white">
                <p className="text-xs font-bold truncate">{item.name}</p>
                <p className="text-xs text-gray-400">{item.size}</p>
            </div>
        </div>
    );
};


const MediaManager: React.FC<MediaManagerProps> = ({ items, onAddMedia }) => {

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
             const reader = new FileReader();
             reader.onload = (event) => {
                if (event.target?.result) {
                    const newItem: Omit<MediaItem, 'id'> = {
                        name: file.name,
                        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                        type: file.type.startsWith('image/') ? 'image' : 'video',
                        url: event.target.result as string, // Base64 data URL
                    };
                    onAddMedia(newItem);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-gray-800 rounded-xl border border-gray-700">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold text-white">Thư viện Media</h3>
                    <p className="text-gray-400 mt-1">Quản lý tất cả hình ảnh và video của bạn.</p>
                </div>
                 <label className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-all duration-300 font-bold py-2 px-4 rounded-lg text-sm flex items-center space-x-2 cursor-pointer">
                    <UploadCloudIcon className="w-5 h-5" />
                    <span>Tải lên File</span>
                    <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*,video/*" />
                </label>
            </div>
            <div className="p-6">
                {items.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {items.map(item => (
                            <MediaGridItem key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                     <div className="text-center py-16 border-2 border-dashed border-gray-700 rounded-lg">
                        <p className="text-gray-500">Thư viện của bạn đang trống.</p>
                        <p className="text-gray-500 text-sm">Hãy tải lên file đầu tiên!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MediaManager;