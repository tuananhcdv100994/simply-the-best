import React, { useState, useContext } from 'react';
import type { Post } from '../types';
import HeartIcon from './icons/HeartIcon';
import MessageSquareIcon from './icons/MessageSquareIcon';
import { AuthContext } from '../contexts/AuthContext';
import JsonLd from './JsonLd';

interface PostDetailProps {
    post: Post;
    onLike: (postId: number) => void;
    onComment: (postId: number, commentText: string) => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onLike, onComment }) => {
    const [newComment, setNewComment] = useState('');
    const auth = useContext(AuthContext);

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            onComment(post.id, newComment);
            setNewComment('');
        }
    };

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "image": post.imageUrl,
        "author": {
            "@type": "Person",
            "name": post.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "Simply The Best!",
            "logo": {
                "@type": "ImageObject",
                "url": "https://levispaints.com/wp-content/uploads/2025/09/z6993884557561_a7f5bc5422dd21542c97f50de2965bda-Photoroom.png"
            }
        },
        "datePublished": post.datePublished,
        "description": post.content.substring(0, 200).replace(/\n/g, ' ') + '...'
    };

    return (
        <div className="bg-gray-900 pt-24 pb-16">
            <JsonLd data={articleSchema} />
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <span className="text-sm font-semibold bg-yellow-400 text-gray-900 px-2.5 py-1 rounded">{post.category}</span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-4 leading-tight">{post.title}</h1>
                        <div className="flex items-center space-x-4 mt-4 text-gray-400">
                            <span>bởi <strong className="text-white">{post.author}</strong></span>
                            <span>&bull;</span>
                            <span>{post.datePublished}</span>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <img src={post.imageUrl} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-lg mb-8" />

                    {/* Content */}
                    <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}>
                    </div>

                    {/* Actions: Like and Comment count */}
                    <div className="flex items-center space-x-6 mt-12 py-4 border-t border-b border-gray-700">
                         <button onClick={() => onLike(post.id)} className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors">
                            <HeartIcon className="w-6 h-6" />
                            <span className="font-semibold">{post.likes.toLocaleString()} lượt thích</span>
                        </button>
                         <div className="flex items-center space-x-2 text-gray-300">
                            <MessageSquareIcon className="w-6 h-6" />
                            <span className="font-semibold">{post.comments.length.toLocaleString()} bình luận</span>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-white mb-6">Bình luận</h2>
                        
                        {/* Comment Form */}
                        {auth?.currentUser ? (
                             <form onSubmit={handleCommentSubmit} className="flex items-start space-x-4 mb-8">
                                <img src={auth.currentUser.avatarUrl} alt={auth.currentUser.name} className="w-12 h-12 rounded-full object-cover"/>
                                <div className="flex-grow">
                                     <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Viết bình luận của bạn..."
                                        rows={3}
                                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                                    />
                                    <button type="submit" className="mt-2 bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-bold py-2 px-5 rounded-lg text-sm">
                                        Gửi bình luận
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="text-center p-4 bg-gray-800 rounded-lg border border-gray-700">
                                <p className="text-gray-400">Vui lòng <button className="text-yellow-400 font-bold hover:underline">đăng nhập</button> để bình luận.</p>
                            </div>
                        )}

                        {/* Comment List */}
                        <div className="space-y-6">
                            {post.comments.map(comment => (
                                <div key={comment.id} className="flex items-start space-x-4">
                                     <img src={comment.avatarUrl} alt={comment.author} className="w-12 h-12 rounded-full object-cover"/>
                                     <div className="flex-grow bg-gray-800 p-4 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-white">{comment.author}</span>
                                            <span className="text-xs text-gray-500">{comment.date}</span>
                                        </div>
                                        <p className="text-gray-300 mt-2">{comment.text}</p>
                                     </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PostDetail;
