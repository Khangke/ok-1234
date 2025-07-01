import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products, getBadgeColor } from '../data/mockData';
import { useCart } from '../contexts/CartContext';
import ProductModal from '../components/ProductModal';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'Tất cả sản phẩm' },
    { id: 'Vòng tay', name: 'Vòng tay' },
    { id: 'Nhang', name: 'Nhang trầm' },
    { id: 'Phụ kiện', name: 'Phụ kiện' },
    { id: 'Trầm nguyên chất', name: 'Trầm nguyên chất' },
    { id: 'Tinh dầu', name: 'Tinh dầu' },
    { id: 'Phong thủy', name: 'Phong thủy' }
  ];

  const filteredProducts = products
    .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price.min - b.price.min;
        case 'price-high':
          return b.price.min - a.price.min;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.title.localeCompare(b.title);
      }
    });

  const handleQuickAdd = (product, e) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0];
    const midPrice = (product.price.min + product.price.max) / 2;
    addToCart(product, defaultSize, 1, midPrice);
    
    // Show success notification
    showAddToCartSuccess(product.title, defaultSize);
  };

  const showAddToCartSuccess = (productTitle, size) => {
    // Create temporary toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-24 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-right';
    toast.innerHTML = `
      <div class="flex items-center space-x-2">
        <i class="fas fa-check-circle"></i>
        <span>Đã thêm "${productTitle}" (${size}) vào giỏ hàng!</span>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Sản Phẩm <span className="text-yellow-800">Trầm Hương</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Khám phá bộ sưu tập trầm hương cao cấp với đa dạng sản phẩm chất lượng
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-2xl shadow-lg">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục:</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-yellow-800 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sắp xếp:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="name">Tên A-Z</option>
                <option value="price-low">Giá thấp đến cao</option>
                <option value="price-high">Giá cao đến thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            onClick={() => openProductModal(product)}
          >
              <div className="relative h-64">
                <img 
                  src={product.images[0]} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`text-xs px-3 py-1 rounded-full ${getBadgeColor(product.badgeColor)}`}>
                    {product.badge}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 text-gray-800 text-xs px-2 py-1 rounded-full">
                    Còn {product.stock}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-gray-800 mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-3 text-sm line-clamp-2">{product.description}</p>
                <div className="mb-4">
                  <span className="text-lg font-bold text-yellow-800">{product.priceDisplay}</span>
                  <div className="flex items-center mt-1">
                    <div className="text-yellow-400 text-sm mr-2">
                      {[...Array(product.rating)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({product.reviewCount})</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    className="flex-1 bg-yellow-800 text-white px-3 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-center font-semibold text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      openProductModal(product);
                    }}
                  >
                    Chi tiết
                  </button>
                  <button 
                    onClick={(e) => handleQuickAdd(product, e)}
                    className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                    title="Mua ngay"
                  >
                    <i className="fas fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Không tìm thấy sản phẩm</h3>
            <p className="text-gray-500">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        )}

        {/* Results Summary */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-8 text-gray-600">
            Hiển thị {filteredProducts.length} sản phẩm
            {selectedCategory !== 'all' && ` trong danh mục "${categories.find(c => c.id === selectedCategory)?.name}"`}
          </div>
        )}

        {/* Product Modal */}
        <ProductModal 
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeProductModal}
        />
      </div>
    </div>
  );
};

export default Products;