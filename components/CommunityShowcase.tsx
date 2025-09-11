import React from 'react';
import Section from './Section';
import type { Post } from '../types';
import PostCard from './PostCard';


const CommunityFeed: React.FC<{posts: Post[]}> = ({ posts }) => {
  return (
    <Section id="community" title="Thành Tựu & Chia Sẻ" subtitle="Vinh danh những thành tựu và kiến thức mới nhất từ cộng đồng sôi động của chúng tôi." className="bg-black">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.filter(p => p.status === 'Xuất bản').map((post) => (
            <PostCard key={post.id} post={post} />
        ))}
      </div>
    </Section>
  );
};

export default CommunityFeed;