import React from 'react';
import { ArrowRight, Sparkles, Truck } from 'lucide-react';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface ProductGridScreenProps {
  onProductSelect: (product: Product) => void;
}

export const ProductGridScreen: React.FC<ProductGridScreenProps> = ({ onProductSelect }) => {
  return (
    <div className="h-full w-full flex flex-col bg-brand-cream/30">
        
        {/* Filters - Horizontal Scroll */}
        <div className="px-8 py-6 flex gap-4 overflow-x-auto no-scrollbar">
            {['All Products', 'Popular', 'New Arrivals', 'Free Shipping'].map((filter, idx) => (
                <button 
                    key={filter}
                    className={`px-8 h-14 rounded-full font-sans font-semibold text-lg whitespace-nowrap transition-all ${
                        idx === 0 
                        ? 'bg-brand-dark text-white shadow-lg' 
                        : 'bg-white text-brand-dark/70 shadow-sm border border-brand-dark/5'
                    }`}
                >
                    {filter}
                </button>
            ))}
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto px-8 pb-32 no-scrollbar">
            <div className="grid grid-cols-2 gap-8">
                {MOCK_PRODUCTS.map((product) => (
                    <div 
                        key={product.id}
                        onClick={() => onProductSelect(product)}
                        className="group relative bg-white rounded-[32px] p-4 shadow-sm hover:shadow-float transition-all duration-300 active:scale-[0.98]"
                    >
                        {/* Image Area */}
                        <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden bg-gray-50 mb-6">
                            <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                            />
                            {product.freeShipping && (
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
                                    <Truck className="w-4 h-4 text-brand-orange" />
                                    <span className="text-sm font-bold text-brand-dark">Free Ship</span>
                                </div>
                            )}
                            {product.isCustomizable && (
                                <div className="absolute top-4 left-4 bg-brand-dark/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
                                    <Sparkles className="w-4 h-4 text-brand-secondary" />
                                    <span className="text-sm font-bold text-white">Customizable</span>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="px-2 mb-4">
                            <h3 className="font-display font-bold text-2xl text-brand-dark mb-2">{product.name}</h3>
                            <p className="font-sans text-brand-dark/60 text-lg line-clamp-2 mb-4 h-14">
                                {product.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="font-display font-bold text-3xl text-brand-orange">
                                    €{product.price.toFixed(2)}
                                </span>
                                <div className="w-12 h-12 rounded-full bg-brand-cream flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors">
                                    <ArrowRight className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};