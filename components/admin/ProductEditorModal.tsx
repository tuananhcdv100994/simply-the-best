import React, { useState, useEffect } from 'react';
import type { Product } from '../../types';
import { generateSEODescriptionForProduct } from '../../services/GeminiService';
import ZapIcon from '../icons/ZapIcon';

interface ProductEditorModalProps {
    product: Product | null;
    onSave: (product: Product) => void;
    onClose: () => void;
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

const ProductEditorModal: React.FC<ProductEditorModalProps> = ({ product, onSave, onClose }) => {
    const [editedProduct, setEditedProduct] = useState<Product>(product?.id ? { ...product } : NEW_PRODUCT_TEMPLATE);
    const [isAiLoading, setIsAiLoading] = useState(false);

    useEffect(() => {
        setEditedProduct(product?.id ? { ...product } : NEW_PRODUCT_TEMPLATE);
    }, [product]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedProduct(prev => ({ ...prev, [name]: value }));
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

    const handleSave = () => {
        if (!editedProduct.name || !editedProduct.price || !editedProduct.imageUrl) {
            alert('Vui lòng điền đầy đủ Tên, Giá và URL Hình ảnh.');
            return;
        }
        onSave(editedProduct);
    };

    if (!product) return null;

    return (
        <div className="fixed inset-0 bg-black/70 z-[999] flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-gray-700 flex-shrink-0">
                    <h3 className="text-xl font-bold text-white">{product.id ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h3>
                </div>
                <div className="p-6 space-y-4 overflow-y-auto">
                     <div>
                        <label htmlFor="name" className="block text-sm font-bold mb-2 text-gray-300">Tên sản phẩm</label>
                        <input type="text" id="name" name="name" value={editedProduct.name} onChange={handleChange} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"/>
                    </div>
                     <div>
                        <label htmlFor="price" className="block text-sm font-bold mb-2 text-gray-300">Giá</label>
                        <input type="text" id="price" name="price" value={editedProduct.price} onChange={handleChange} placeholder="VD: 699.000₫" className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"/>
                    </div>
                     <div>
                        <label htmlFor="imageUrl" className="block text-sm font-bold mb-2 text-gray-300">URL Hình ảnh</label>
                        <input type="text" id="imageUrl" name="imageUrl" value={editedProduct.imageUrl} onChange={handleChange} placeholder="https://example.com/image.jpg" className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"/>
                        {editedProduct.imageUrl && <img src={editedProduct.imageUrl} alt="Xem trước" className="mt-2 rounded-lg w-32 object-cover"/>}
                    </div>
                     <div>
                        <label htmlFor="description" className="block text-sm font-bold mb-2 text-gray-300">Mô tả hiển thị</label>
                        <textarea id="description" name="description" value={editedProduct.description} onChange={handleChange} rows={3} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"/>
                    </div>
                    <div className="pt-4 border-t border-gray-700">
                         <h4 className="text-lg font-bold text-yellow-400 mb-2">Tối ưu SEO</h4>
                         <div>
                            <label htmlFor="seoTitle" className="block text-sm font-bold mb-2 text-gray-300">Thẻ Tiêu đề (Title Tag)</label>
                            <input type="text" id="seoTitle" name="seoTitle" value={editedProduct.seoTitle} onChange={handleChange} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"/>
                        </div>
                         <div className="mt-4">
                            <label htmlFor="seoKeywords" className="block text-sm font-bold mb-2 text-gray-300">Từ khóa (Keywords)</label>
                            <input type="text" id="seoKeywords" name="seoKeywords" value={editedProduct.seoKeywords} onChange={handleChange} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"/>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="seoDescription" className="block text-sm font-bold mb-2 text-gray-300">Mô tả Meta (Meta Description)</label>
                            <textarea id="seoDescription" name="seoDescription" value={editedProduct.seoDescription} onChange={handleChange} rows={3} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"/>
                            <button onClick={handleGenerateDesc} disabled={isAiLoading} className="mt-2 text-sm bg-gray-700 text-white hover:bg-yellow-400 hover:text-gray-900 transition-colors font-bold py-2 px-3 rounded-lg disabled:opacity-50 flex items-center space-x-2">
                                <ZapIcon className="w-4 h-4" />
                                <span>{isAiLoading ? 'Đang tạo...' : 'Tạo bằng AI'}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="p-6 bg-gray-900/50 rounded-b-xl flex justify-end space-x-3 flex-shrink-0">
                    <button onClick={onClose} className="bg-gray-600 text-white hover:bg-gray-500 transition-colors font-bold py-2 px-5 rounded-lg text-sm">Hủy</button>
                    <button onClick={handleSave} className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-colors font-bold py-2 px-5 rounded-lg text-sm">Lưu sản phẩm</button>
                </div>
            </div>
        </div>
    );
};

export default ProductEditorModal;
