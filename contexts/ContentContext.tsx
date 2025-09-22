import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { Post, Product, MediaItem, SiteContent, Partner, Comment } from '../types';
import { POSTS, PRODUCTS, MEDIA_ITEMS, DEFAULT_SITE_CONTENT, PARTNERS, NEWS_POSTS } from '../constants';

const getStoredData = <T,>(key: string, fallback: T): T => {
    try {
        const stored = localStorage.getItem(key);
        if (stored) {
            return JSON.parse(stored);
        }
        return fallback;
    } catch (error) {
        console.error(`Failed to parse ${key} from localStorage`, error);
        return fallback;
    }
};

const setStoredData = <T,>(key: string, data: T) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Failed to save ${key} to localStorage`, error);
    }
};

export interface ContentContextType {
    posts: Post[];
    products: Product[];
    mediaItems: MediaItem[];
    siteContent: SiteContent;
    partners: Partner[];
    updatePost: (post: Post) => void;
    addProduct: (product: Omit<Product, 'id'>) => Product;
    updateProduct: (product: Product) => void;
    deleteProduct: (productId: number) => void;
    addMedia: (item: Omit<MediaItem, 'id'>) => void;
    updateSiteContent: (content: SiteContent) => void;
    updatePartners: (partners: Partner[]) => void;
    handleSavePost: (post: Post, authorName: string) => Post;
}


export const ContentContext = createContext<ContentContextType | null>(null);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>(() => getStoredData('stb_posts', [...POSTS, ...NEWS_POSTS]));
    const [products, setProducts] = useState<Product[]>(() => getStoredData('stb_products', PRODUCTS));
    const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => getStoredData('stb_media', MEDIA_ITEMS));
    const [siteContent, setSiteContent] = useState<SiteContent>(() => getStoredData('stb_site_content', DEFAULT_SITE_CONTENT));
    const [partners, setPartners] = useState<Partner[]>(() => getStoredData('stb_partners', PARTNERS));

    useEffect(() => setStoredData('stb_posts', posts), [posts]);
    useEffect(() => setStoredData('stb_products', products), [products]);
    useEffect(() => setStoredData('stb_media', mediaItems), [mediaItems]);
    useEffect(() => setStoredData('stb_site_content', siteContent), [siteContent]);
    useEffect(() => setStoredData('stb_partners', partners), [partners]);

    const updatePost = useCallback((postToUpdate: Post) => {
        setPosts(prev => prev.map(p => p.id === postToUpdate.id ? postToUpdate : p));
    }, []);

    const handleSavePost = useCallback((postToSave: Post, authorName: string): Post => {
        if (postToSave.id === 0) { // New post
            const newPost = { ...postToSave, id: Date.now(), author: authorName, likes: 0, comments: [] };
            setPosts(prev => [newPost, ...prev]);
            return newPost;
        } else { // Existing post
            updatePost(postToSave);
            return postToSave;
        }
    }, [updatePost]);

    const addProduct = useCallback((product: Omit<Product, 'id'>): Product => {
        const newProduct = { ...product, id: Date.now() };
        setProducts(prev => [newProduct, ...prev]);
        return newProduct;
    }, []);

    const updateProduct = useCallback((productToUpdate: Product) => {
        setProducts(prev => prev.map(p => p.id === productToUpdate.id ? productToUpdate : p));
    }, []);

    const deleteProduct = useCallback((productId: number) => {
        if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
            setProducts(prev => prev.filter(p => p.id !== productId));
        }
    }, []);

    const addMedia = useCallback((item: Omit<MediaItem, 'id'>) => {
        const newItem: MediaItem = { ...item, id: Date.now() };
        setMediaItems(prev => [newItem, ...prev]);
    }, []);

    const updateSiteContent = useCallback((content: SiteContent) => {
        setSiteContent(content);
    }, []);

    const updatePartners = useCallback((newPartners: Partner[]) => {
        setPartners(newPartners);
    }, []);

    const value = {
        posts,
        products,
        mediaItems,
        siteContent,
        partners,
        updatePost,
        addProduct,
        updateProduct,
        deleteProduct,
        addMedia,
        updateSiteContent,
        updatePartners,
        handleSavePost,
    };

    return (
        <ContentContext.Provider value={value}>
            {children}
        </ContentContext.Provider>
    );
};
