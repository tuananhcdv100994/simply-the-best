import React, { useState, useEffect } from 'react';
import type { Product } from '../../types';

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
};

const ProductEditor: React.FC<ProductEditorProps> = ({ product, onSave, onCancel }) => {
    const [editedProduct, setEditedProduct] = useState<Product>(product ? { ...product } : NEW_PRODUCT_TEMPLATE);

    useEffect(() => {
        setEditedProduct(product ? { ...product } : NEW_PRODUCT_TEMPLATE);
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

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">{product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h1>
                <button onClick={onCancel} className="text-gray-400 hover:text-white">← Quay lại danh sách</button>
            </div>

            <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl border border-gray-700 space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-bold mb-2 text-gray-300">Tên sản phẩm</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={editedProduct.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                    />
                </div>
                 <div>
                    <label htmlFor="price" className="block text-sm font-bold mb-2 text-gray-300">Giá</label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        value={editedProduct.price}
                        onChange={handleChange}
                        placeholder="VD: 699.000₫"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                    />
                </div>
                 <div>
                    <label htmlFor="imageUrl" className="block text-sm font-bold mb-2 text-gray-300">URL Hình ảnh</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={editedProduct.imageUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                    />
                     {editedProduct.imageUrl && <img src={editedProduct.imageUrl} alt="Xem trước" className="mt-4 rounded-lg w-48 object-cover"/>}
                </div>
                 <div>
                    <label htmlFor="description" className="block text-sm font-bold mb-2 text-gray-300">Mô tả</label>
                    <textarea
                        id="description"
                        name="description"
                        value={editedProduct.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                    />
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                    <button onClick={onCancel} className="bg-gray-600 text-white hover:bg-gray-500 transition-colors font-bold py-2 px-5 rounded-lg text-sm">Hủy</button>
                    <button onClick={handleSave} className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-colors font-bold py-2 px-5 rounded-lg text-sm">Lưu sản phẩm</button>
                </div>
            </div>
        </div>
    );
};

export default ProductEditor;