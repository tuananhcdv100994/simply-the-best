import React from 'react';
import type { Post } from '../types';
import HeartIcon from './icons/HeartIcon';
import MessageSquareIcon from './icons/MessageSquareIcon';

interface PostCardProps {
    post: Post;
    onNavigate: (view: 'postDetail', data: Post) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onNavigate }) => (
    <button onClick={() => onNavigate('postDetail', post)} className="group relative overflow-hidden rounded-xl h-96 text-left w-full">
        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white w-full">
            <span className="text-sm font-semibold bg-yellow-400 text-gray-900 px-2 py-1 rounded">{post.category}</span>
            <h3 className="text-xl font-bold mt-2">{post.title}</h3>
            <p className="text-gray-300 text-sm">bởi {post.author}</p>
            <div className="flex items-center space-x-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center space-x-1 text-gray-300">
                    <HeartIcon className="w-5 h-5" />
                    <span>{post.likes}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-300">
                    <MessageSquareIcon className="w-5 h-5" />
                    <span>{post.comments.length}</span>
                </div>
            </div>
        </div>
    </button>
);

export default PostCard;