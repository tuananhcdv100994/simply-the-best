import React from 'react';
import Section from './Section';
import type { Post } from '../types';
import PostCard from './PostCard';

interface CommunityFeedProps {
    posts: Post[];
    onNavigate: (view: 'postDetail', data: Post) => void;
}

const CommunityFeed: React.FC<CommunityFeedProps> = ({ posts, onNavigate }) => {
  return (
    <Section id="community" title="Thành Tựu & Chia Sẻ" subtitle="Vinh danh những thành tựu và kiến thức mới nhất từ cộng đồng sôi động của chúng tôi." className="bg-black">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.filter(p => p.status === 'Xuất bản').slice(0, 8).map((post) => (
            <PostCard key={post.id} post={post} onNavigate={onNavigate} />
        ))}
      </div>
    </Section>
  );
};

export default CommunityFeed;