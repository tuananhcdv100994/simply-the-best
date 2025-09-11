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

// Import Plugin Components
import DashboardPlugin from './DashboardPlugin';
import PostManager from '../components/admin/PostManager';
import MediaManager from '../components/admin/MediaManager';
import UserManager from '../components/admin/UserManager';
import ProductManager from '../components/admin/ProductManager';
import SiteEditor from '../components/admin/SiteEditor';
import PluginManager from '../components/admin/PluginManager';
import AnalyticsPlugin from './AnalyticsPlugin';

// Import constants to pass as initial data where needed
import { POSTS, USERS, PRODUCTS, PLUGINS, MEDIA_ITEMS } from '../constants';


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
        notificationCount: 5, // Example notification
    },
    {
        id: 'products',
        label: 'Sản phẩm',
        icon: ProductIcon,
        component: ProductManager,
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
];
