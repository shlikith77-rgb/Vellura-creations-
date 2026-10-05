import React from 'react';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { ProductCategory, ProductSubcategory } from '../types';

export const CatalogSection: React.FC = () => {
  const { 
    filteredProducts, 
    selectedCategory, 
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    siteContent
  } = useShop();

  const subcategories: { label: string; sub: ProductSubcategory; cat: ProductCategory | 'all' }[] = [
    { label: 'All Collections', sub: 'all', cat: 'all' },
    { label: 'Necklaces & Sets', sub: 'necklaces', cat: 'jewellery' },
    { label: 'Bridal Suites', sub: 'bridal', cat: 'jewellery' },
    { label: 'Chokers', sub: 'chokers', cat: 'jewellery' },
    { label: 'Decorative Candles', sub: 'decorative_candles', cat: 'candles' },
    { label: 'Gift Sets', sub: 'gift_candles', cat: 'candles' },
  ];

  const handleSubSelect = (cat: ProductCategory | 'all', sub: ProductSubcategory) => {
    setSelectedCategory(cat);
    setSelectedSubcategory(sub);
  };

  return (
    <section id="catalog" className="py-12 md:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Signature Showcase</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal text-[#1A1A1A] tracking-tight">
            {siteContent.catalogTitle}
          </h2>

          <p className="text-xs sm:text-base text-[#706E6B] font-light leading-relaxed">
            {siteContent.catalogSubtitle}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white border border-[#EAE6DF] p-3 sm:p-5 mb-6 sm:mb-8 shadow-xs">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4">
            
            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 lg:pb-0 scrollbar-none">
              {subcategories.map(item => {
                const isActive = (selectedCategory === item.cat || (item.cat === 'all' && selectedCategory === 'all')) && 
                                 selectedSubcategory === item.sub;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleSubSelect(item.cat, item.sub)}
                    className={`px-3 py-1.5 text-[11px] sm:text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors border ${
                      isActive
                        ? 'bg-[#121214] text-[#FAF8F5] border-[#121214] shadow-xs'
                        : 'bg-[#FAF8F5] text-[#706E6B] border-[#EAE6DF] hover:border-[#121214] hover:text-[#121214]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input & Sort Dropdown */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-60">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8B85]" />
                <input
                  type="text"
                  placeholder="Search stones, sets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-[#FAF8F5] border border-[#EAE6DF] text-xs text-[#1A1A1A] placeholder-[#8E8B85] focus:outline-none focus:border-[#121214]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8E8B85] hover:text-[#1A1A1A]"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#706E6B] hidden sm:block" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Sort products by"
                  className="bg-[#FAF8F5] border border-[#EAE6DF] text-xs text-[#1A1A1A] py-1.5 px-2 sm:px-2.5 focus:outline-none focus:border-[#121214]"
                >
                  <option value="featured">Featured First</option>
                  <option value="bestselling">Customer Bestsellers</option>
                  <option value="newest">New Arrivals</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>

            </div>

          </div>

          {/* Active Filter State Kicker */}
          <div className="mt-2.5 pt-2.5 border-t border-[#F2EFE9] flex items-center justify-between text-xs text-[#706E6B]">
            <span>
              Showing <strong className="font-mono tabular-nums text-[#1A1A1A]">{filteredProducts.length}</strong> creations
              {searchQuery && <span> matching "<strong className="text-[#1A1A1A]">{searchQuery}</strong>"</span>}
            </span>

            {(searchQuery || selectedCategory !== 'all' || selectedSubcategory !== 'all') && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedSubcategory('all');
                  setSearchQuery('');
                }}
                className="text-xs text-[#6B1D2F] hover:underline font-medium"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Product Grid: Exactly 2 products side-by-side in every row on mobile */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-[#EAE6DF] p-8 max-w-xl mx-auto shadow-xs">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF8F5] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <p className="font-serif text-xl sm:text-2xl text-[#1A1A1A] mb-2">Showroom Collection In Update</p>
            <p className="text-xs text-[#706E6B] mb-5 leading-relaxed">
              New handcrafted artificial jewellery designs and festive pieces are currently being added. WhatsApp our showroom directly for custom designs, current in-stock bridal suites, and special orders.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {(searchQuery || selectedCategory !== 'all' || selectedSubcategory !== 'all') ? (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSubcategory('all');
                    setSearchQuery('');
                  }}
                  className="px-5 py-2.5 bg-[#121214] text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold"
                >
                  View All Pieces
                </button>
              ) : null}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
