import React from 'react';
import type { Product } from '../../types';
import PlusIcon from '../icons/PlusIcon';

interface ProductManagerProps {
    products: Product[];
    onAddNew: () => void;
    onEdit: (product: Product) => void;
    onDelete: (productId: number) => void;
}

const ProductManager: React.FC<ProductManagerProps> = ({ products, onAddNew, onEdit, onDelete }) => {
    return (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                 <div>
                    <h3 className="text-xl font-bold text-white">Quản lý Sản phẩm</h3>
                    <p className="text-gray-400 mt-1">Tìm thấy tổng cộng {products.length} sản phẩm.</p>
                </div>
                <button 
                    onClick={onAddNew}
                    className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-all duration-300 font-bold py-2 px-4 rounded-lg text-sm flex items-center space-x-2">
                    <PlusIcon className="w-5 h-5" />
                    <span>Thêm sản phẩm</span>
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-300">
                    <thead className="bg-gray-900/50 text-xs text-gray-400 uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">Sản phẩm</th>
                            <th scope="col" className="px-6 py-3">Giá</th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Hành động</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                    <div className="flex items-center space-x-4">
                                        <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                                        <span>{product.name}</span>
                                    </div>
                                </th>
                                <td className="px-6 py-4 font-semibold">{product.price}</td>
                                <td className="px-6 py-4 text-right">
                                     <div className="flex items-center justify-end space-x-4">
                                        <button onClick={() => onEdit(product)} className="font-medium text-yellow-400 hover:underline">Sửa</button>
                                        <button onClick={() => onDelete(product.id)} className="font-medium text-red-500 hover:underline">Xóa</button>
                                     </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductManager;