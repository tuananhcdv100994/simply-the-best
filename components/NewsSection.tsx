import React from 'react';
import Section from './Section';
import { NEWS_POSTS } from '../constants';
import PostCard from './PostCard';
import type { Post } from '../types';

interface NewsSectionProps {
  onNavigate: (view: 'postDetail', data: Post) => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({ onNavigate }) => {
  return (
    <Section 
      id="news" 
      title="Tin tức & Cập nhật" 
      subtitle="Luôn cập nhật những thông tin, sự kiện và câu chuyện mới nhất từ Simply The Best!" 
      className="bg-gray-900"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {NEWS_POSTS.map((post) => (
            <PostCard key={post.id} post={post} onNavigate={onNavigate} />
        ))}
      </div>
    </Section>
  );
};

export default NewsSection;