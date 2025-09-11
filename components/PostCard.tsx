import React from 'react';
import type { Post } from '../types';
import HeartIcon from './icons/HeartIcon';
import MessageSquareIcon from './icons/MessageSquareIcon';

const PostCard: React.FC<{ post: Post }> = ({ post }) => (
    <div className="group relative overflow-hidden rounded-xl h-96">
        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white w-full">
            <span className="text-sm font-semibold bg-yellow-400 text-gray-900 px-2 py-1 rounded">{post.category}</span>
            <h3 className="text-xl font-bold mt-2">{post.title}</h3>
            <p className="text-gray-300 text-sm">bởi {post.author}</p>
            <div className="flex items-center space-x-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="flex items-center space-x-1 text-gray-300 hover:text-white">
                    <HeartIcon className="w-5 h-5" />
                    <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-300 hover:text-white">
                    <MessageSquareIcon className="w-5 h-5" />
                    <span>{post.comments}</span>
                </button>
            </div>
        </div>
    </div>
);

export default PostCard;
