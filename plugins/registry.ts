import type { PluginDefinition } from '../types';

// Import Icons
import DashboardIcon from '../components/icons/DashboardIcon';
import PostIcon from '../components/icons/PostIcon';
import MediaIcon from '../components/icons/MediaIcon';
import UsersIcon from '../components/icons/UsersIcon';
import ProductIcon from '../components/icons/ProductIcon';
import AppearanceIcon from '../components/icons/AppearanceIcon';
import PluginIcon from '../components/icons/PluginIcon';
import AnalyticsIcon from '../components/icons/AnalyticsIcon';
import SearchIcon from '../components/icons/SearchIcon'; // New SEO Icon

// Import Plugin Components
import DashboardPlugin from './DashboardPlugin';
import PostManager from '../components/admin/PostManager';
import MediaManager from '../components/admin/MediaManager';
import UserManager from '../components/admin/UserManager';
import ProductManager from '../components/admin/ProductManager';
import SiteEditor from '../components/admin/SiteEditor';
import PluginManager from '../components/admin/PluginManager';
import AnalyticsPlugin from './AnalyticsPlugin';
import SEOPlugin from './SEOPlugin'; // New SEO Plugin Component

// This registry acts as the central point for defining all admin modules.
// To add a new feature to the admin dashboard, simply add a new entry here.
export const pluginRegistry: PluginDefinition[] = [
    {
        id: 'dashboard',
        label: 'Bảng tin',
        icon: DashboardIcon,
        component: DashboardPlugin,
    },
    {
        id: 'posts',
        label: 'Bài viết',
        icon: PostIcon,
        component: PostManager,
        subItems: [
            { id: 'posts', label: 'Tất cả bài viết' },
            { id: 'postEditor', label: 'Viết bài mới' }
        ]
    },
    {
        id: 'media',
        label: 'Thư viện Media',
        icon: MediaIcon,
        component: MediaManager,
    },
     {
        id: 'users',
        label: 'Người dùng',
        icon: UsersIcon,
        component: UserManager,
        notificationCount: 0, // Will be dynamically updated
    },
    {
        id: 'products',
        label: 'Sản phẩm',
        icon: ProductIcon,
        component: ProductManager,
         subItems: [
            { id: 'products', label: 'Tất cả sản phẩm' },
            // "Add New" is handled by the modal, so no sub-item needed
        ]
    },
     {
        id: 'appearance',
        label: 'Giao diện',
        icon: AppearanceIcon,
        component: SiteEditor,
    },
    {
        id: 'plugins',
        label: 'Plugins',
        icon: PluginIcon,
        component: PluginManager,
    },
    {
        id: 'analytics',
        label: 'Phân tích',
        icon: AnalyticsIcon,
        component: AnalyticsPlugin,
    },
    {
        id: 'seo',
        label: 'Tối ưu SEO',
        icon: SearchIcon,
        component: SEOPlugin,
    },
];
