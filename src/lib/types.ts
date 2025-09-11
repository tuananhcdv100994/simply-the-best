import type React from 'react';

export interface CoreValue {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

// FIX: Replaced 'Story' with 'Post' to unify the data model across the application.
export interface Post {
  id: number;
  author: string;
  category: string;
  title: string;
  content: string;
  imageUrl: string;
  likes: number;
  comments: number;
  status: 'Xuất bản' | 'Bản nháp';
  seoKeywords: string;
  datePublished: string;
}

export interface RankItem {
  rank: number;
  name: string;
  score: string;
  avatarUrl: string;
}

export interface EventItem {
  date: string;
  title:string;
  description: string;
  status: 'Sắp diễn ra' | 'Đã qua';
  // FIX: Add missing category property.
  category: 'Tennis' | 'Golf' | 'Pickleball' | 'Cộng đồng';
}

export interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  // FIX: Add missing description property.
  description: string;
}

export interface Badge {
  name: string;
  icon: string; // emoji or icon component name
}

// FIX: Add missing UserLevel and LevelInfo types.
export type UserLevel = 'Thành viên mới' | 'Người đóng góp' | 'Chuyên gia';

export interface LevelInfo {
    name: UserLevel;
    badge: string; // emoji
    minPoints: number;
}


export interface UserProfileData {
  name: string;
  avatarUrl: string;
  points: number;
  rank: number;
  badges: Badge[];
  activity: {
    type: string;
    description: string;
    date: string;
  }[];
}

export interface AdminStat {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  avatarUrl: string;
  role: 'Admin' | 'User';
  joined: string;
  status: 'Hoạt động' | 'Bị cấm';
  // FIX: Add missing points and level properties.
  points: number;
  level: UserLevel;
}

export interface Plugin {
    id: string;
    name: string;
    description: string;
    author: string;
    active: boolean;
}

// FIX: Add missing SiteContent interface and heroImageUrl property.
export interface SiteContent {
    heroTitle: string;
    heroSubtitle: string;
    heroSlogan: string;
    heroImageUrl: string;
    aboutTitle: string;
    aboutSubtitle: string;
}

// FIX: Add missing Partner interface.
export interface Partner {
    id: number;
    name: string;
    logoUrl: string;
}

// FIX: Add missing interfaces for new components.
export interface CommunityStatItem {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Challenge {
    category: string;
    title: string;
    description: string;
    prize: string;
    icon: React.ComponentType<{ className?: string }>;
}

export interface FeaturedBadge {
    name: string;
    description: string;
    icon: string; // emoji
}
// @FIX: Add missing MediaItem interface.
export interface MediaItem {
    id: number;
    type: 'image' | 'video';
    url: string;
    name: string;
    size: string;
}