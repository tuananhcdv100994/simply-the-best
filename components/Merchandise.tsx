import React from 'react';
import Section from './Section';
import type { Product } from '../types';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 group">
        <div className="overflow-hidden h-64">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="p-6">
            <h3 className="text-lg font-bold text-white">{product.name}</h3>
            <div className="flex justify-between items-center mt-4">
                <p className="text-xl font-semibold text-yellow-400">{product.price}</p>
                <button className="bg-gray-700 text-white hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 font-bold py-2 px-4 rounded-lg text-sm">
                    Thêm vào giỏ
                </button>
            </div>
        </div>
    </div>
);

interface MerchandiseProps {
    products: Product[];
}

const Merchandise: React.FC<MerchandiseProps> = ({ products }) => {
    return (
        <Section id="merch" title="Trang Bị & Vật Phẩm" subtitle="Mang trên mình tinh thần của sự xuất sắc và nguồn cảm hứng.">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </Section>
    );
};

export default Merchandise;