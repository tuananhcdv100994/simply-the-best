import React from 'react';
import type { Post } from '../../types';
import PlusIcon from '../icons/PlusIcon';

interface PostManagerProps {
    posts: Post[];
    onAddNew: () => void;
    onEdit: (post: Post) => void;
    // onDelete: (postId: number) => void; // Future implementation
}

const PostManager: React.FC<PostManagerProps> = ({ posts, onAddNew, onEdit }) => {
    return (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                 <div>
                    <h3 className="text-xl font-bold text-white">Quản lý Bài viết</h3>
                    <p className="text-gray-400 mt-1">Tìm thấy tổng cộng {posts.length} bài viết.</p>
                </div>
                <button 
                    onClick={onAddNew}
                    data-guide-id="post-manager-add-new"
                    className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-all duration-300 font-bold py-2 px-4 rounded-lg text-sm flex items-center space-x-2">
                    <PlusIcon className="w-5 h-5" />
                    <span>Viết bài mới</span>
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-300">
                    <thead className="bg-gray-900/50 text-xs text-gray-400 uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">Tiêu đề</th>
                            <th scope="col" className="px-6 py-3">Tác giả</th>
                            <th scope="col" className="px-6 py-3">Trạng thái</th>
                            <th scope="col" className="px-6 py-3">Ngày xuất bản</th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Hành động</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            <tr key={post.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                    {post.title}
                                </th>
                                <td className="px-6 py-4">{post.author}</td>
                                <td className="px-6 py-4">
                                     <span className={`px-2 py-1 text-xs font-medium rounded-full ${post.status === 'Xuất bản' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                        {post.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{post.datePublished}</td>
                                <td className="px-6 py-4 text-right">
                                     <button onClick={() => onEdit(post)} className="font-medium text-yellow-400 hover:underline">Sửa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PostManager;