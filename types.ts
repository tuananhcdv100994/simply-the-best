export interface CoreValue {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

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
  category: 'Tennis' | 'Golf' | 'Pickleball' | 'Cộng đồng';
}

export interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  description: string;
}

export interface Badge {
  name: string;
  icon: string; // emoji or icon component name
}

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
  points: number;
  level: UserLevel;
  onlineStatus: 'Online' | 'Offline';
}

export interface Plugin {
    id: string;
    name: string;
    description: string;
    author: string;
    active: boolean;
}

export interface SiteContent {
    heroTitle: string;
    heroSubtitle: string;
    heroSlogan: string;
    heroImageUrl: string;
    aboutTitle: string;
    aboutSubtitle: string;
}

export interface AuthContextType {
    currentUser: User | null;
    users: User[];
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
    loading: boolean;
}

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

export interface Partner {
    id: number;
    name: string;
    logoUrl: string;
}

export interface ChatMessage {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    isTyping?: boolean;
}

export interface GuideStep {
    elementId: string;
    title: string;
    description: string;
    action?: 'click' | 'type';
}

export interface MediaItem {
    id: number;
    type: 'image' | 'video';
    url: string;
    name: string;
    size: string;
}

export type AdminView = 'dashboard' | 'posts' | 'media' | 'users' | 'products' | 'appearance' | 'plugins' | 'analytics';

export interface PluginDefinition {
    id: AdminView;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    component: React.FC<any>; 
    notificationCount?: number;
}