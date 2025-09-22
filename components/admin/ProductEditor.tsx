import React, { useState, useEffect } from 'react';
import type { Product } from '../../types';
import { generateSEODescriptionForProduct } from '../../services/GeminiService';
import ZapIcon from '../icons/ZapIcon';

interface ProductEditorProps {
    product: Product | null;
    onSave: (product: Product) => void;
    onCancel: () => void;
}

const NEW_PRODUCT_TEMPLATE: Product = {
    id: 0,
    name: '',
    price: '',
    imageUrl: '',
    description: '',
    seoTitle: '',
    seoKeywords: '',
    seoDescription: '',
};


const ProductEditor: React.FC<ProductEditorProps> = ({ product, onSave, onCancel }) => {
    const [editedProduct, setEditedProduct] = useState<Product>(product?.id ? { ...product } : NEW_PRODUCT_TEMPLATE);
    const [isAiLoading, setIsAiLoading] = useState(false);

    useEffect(() => {
        setEditedProduct(product?.id ? { ...product } : NEW_PRODUCT_TEMPLATE);
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (!editedProduct.name || !editedProduct.price || !editedProduct.imageUrl) {
            alert('Vui lòng điền đầy đủ Tên, Giá và URL Hình ảnh.');
            return;
        }
        onSave(editedProduct);
    };

    const handleGenerateDesc = async () => {
        if (!editedProduct.name) {
            alert('Vui lòng nhập tên sản phẩm trước.');
            return;
        }
        setIsAiLoading(true);
        const desc = await generateSEODescriptionForProduct(editedProduct.name);
        setEditedProduct(prev => ({ ...prev, seoDescription: desc }));
        setIsAiLoading(false);
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">{product && product.id ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h1>
                <button onClick={onCancel} className="text-gray-400 hover:text-white">← Quay lại</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                        <label htmlFor="name" className="block text-sm font-bold mb-2 text-gray-300">Tên sản phẩm</label>
                        <input type="text" id="name" name="name" value={editedProduct.name} onChange={handleChange} className="w-full px-3 py-2 text-xl bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"/>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                        <label htmlFor="description" className="block text-sm font-bold mb-2 text-gray-300">Mô tả sản phẩm</label>
                        <textarea id="description" name="description" value={editedProduct.description} onChange={handleChange} rows={8} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"/>
                    </div>
                    <div className="bg-gray-800 rounded-xl border border-gray-700">
                        <div className="p-4 border-b border-gray-700"><h3 className="font-bold text-white">Tối ưu SEO</h3></div>
                        <div className="p-6 space-y-4">
                             <div>
                                <label htmlFor="seoTitle" className="block text-sm font-bold mb-2 text-gray-300">Thẻ Tiêu đề (Title Tag)</label>
                                <input type="text" id="seoTitle" name="seoTitle" value={editedProduct.seoTitle} onChange={handleChange} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"/>
                            </div>
                             <div>
                                <label htmlFor="seoKeywords" className="block text-sm font-bold mb-2 text-gray-300">Từ khóa (Keywords)</label>
                                <input type="text" id="seoKeywords" name="seoKeywords" value={editedProduct.seoKeywords} onChange={handleChange} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"/>
                            </div>
                            <div>
                                <label htmlFor="seoDescription" className="block text-sm font-bold mb-2 text-gray-300">Mô tả Meta (Meta Description)</label>
                                <textarea id="seoDescription" name="seoDescription" value={editedProduct.seoDescription} onChange={handleChange} rows={3} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"/>
                                <button onClick={handleGenerateDesc} disabled={isAiLoading} className="mt-2 text-sm bg-gray-700 text-white hover:bg-yellow-400 hover:text-gray-900 transition-colors font-bold py-2 px-3 rounded-lg disabled:opacity-50 flex items-center space-x-2">
                                    <ZapIcon className="w-4 h-4" />
                                    <span>{isAiLoading ? 'Đang tạo...' : 'Tạo bằng AI'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-gray-800 rounded-xl border border-gray-700">
                        <div className="p-4 border-b border-gray-700"><h3 className="font-bold text-white">Lưu</h3></div>
                        <div className="p-4">
                            <button onClick={handleSave} className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-colors font-bold py-2 px-4 rounded-lg text-sm">Lưu sản phẩm</button>
                        </div>
                    </div>
                    <div className="bg-gray-800 rounded-xl border border-gray-700">
                        <div className="p-4 border-b border-gray-700"><h3 className="font-bold text-white">Thông tin cơ bản</h3></div>
                        <div className="p-4 space-y-4">
                            <div>
                                <label htmlFor="price" className="block text-xs font-bold mb-2 text-gray-300">Giá</label>
                                <input type="text" id="price" name="price" value={editedProduct.price} onChange={handleChange} placeholder="VD: 699.000₫" className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"/>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-800 rounded-xl border border-gray-700">
                        <div className="p-4 border-b border-gray-700"><h3 className="font-bold text-white">Ảnh sản phẩm</h3></div>
                        <div className="p-4">
                            <label htmlFor="imageUrl" className="block text-xs font-bold mb-2 text-gray-300">URL Hình ảnh</label>
                            <input
                                type="text"
                                name="imageUrl"
                                value={editedProduct.imageUrl}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                            />
                            {editedProduct.imageUrl && <img src={editedProduct.imageUrl} alt="Preview" className="mt-4 rounded-lg w-full object-cover"/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductEditor;
