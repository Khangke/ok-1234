import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { formatPrice } from '../data/mockData';

const ProductModal = ({ product, isOpen, onClose }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specifications');

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    const selectedSizeValue = product.sizes[selectedSize];
    const price = (product.price.min + product.price.max) / 2;
    addToCart(product, selectedSizeValue, quantity, price);
    onClose();
    navigate('/checkout');
  };

  const handleBuyNow = () => {
    const selectedSizeValue = product.sizes[selectedSize];
    const price = (product.price.min + product.price.max) / 2;
    addToCart(product, selectedSizeValue, quantity, price);
    onClose();
    navigate('/checkout');
  };

  const specifications = [
    { label: 'Danh mục', value: product.category },
    { label: 'Kho hàng', value: `${product.stock} sản phẩm` },
    { label: 'Đánh giá', value: `${product.rating}/5 (${product.reviewCount} đánh giá)` },
    { label: 'Tùy chọn size', value: `${product.sizes.length} lựa chọn` }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 mobile-safe-top mobile-safe-bottom mobile-safe-left mobile-safe-right">
      <div className="bg-white mobile-modal max-w-6xl w-full shadow-2xl transform transition-all duration-300 scale-100 animate-scale-in">
        {/* Header */}
        <div className="mobile-modal-header flex justify-between items-center">
          <h2 className="font-display mobile-title font-bold text-gray-800 pr-4 line-clamp-2">{product.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 hover:bg-red-50 w-12 h-12 rounded-full flex items-center justify-center transition-all touch-target flex-shrink-0 border-2 border-transparent hover:border-red-200"
            aria-label="Đóng modal"
          >
            {/* Fallback if Font Awesome doesn't load */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <i className="fas fa-times text-xl absolute"></i>
          </button>
        </div>

        <div className="mobile-modal-content">
          <div className="mobile-grid lg:grid-cols-2 gap-6">
            {/* Product Images */}
            <div>
              <div className="mobile-product-image mb-4">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.title}
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all touch-target ${
                      selectedImage === index 
                        ? 'ring-2 ring-yellow-800 opacity-100' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={image} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <div className="mb-4">
                <span className={`inline-block text-xs px-3 py-1 rounded-full mb-3 bg-${product.badgeColor}-100 text-${product.badgeColor}-800`}>
                  {product.badge}
                </span>
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 mr-2">
                    {[...Array(product.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                  <span className="text-gray-500">({product.reviewCount} đánh giá)</span>
                </div>
                <p className="mobile-product-price">{product.priceDisplay}</p>
                <p className="mobile-text text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h4 className="mobile-subtitle font-semibold text-gray-800">Tùy chọn:</h4>
                <div className="mobile-grid-2">
                  {product.sizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(index)}
                      className={`mobile-input text-center font-medium transition-all touch-target ${
                        selectedSize === index
                          ? 'border-yellow-800 bg-yellow-50 text-yellow-800'
                          : 'border-gray-200 hover:border-yellow-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <h4 className="mobile-subtitle font-semibold text-gray-800">Số lượng:</h4>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-200 text-gray-700 touch-target rounded-full hover:bg-gray-300 transition-colors flex-shrink-0"
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <span className="mobile-text font-semibold flex-shrink-0 min-w-[3rem] text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-200 text-gray-700 touch-target rounded-full hover:bg-gray-300 transition-colors flex-shrink-0"
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                  <span className="text-sm text-gray-500 ml-4">({product.stock} có sẵn)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mobile-product-buttons flex-col">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-yellow-800 text-white btn-mobile font-semibold hover:bg-yellow-700 transition-all btn-enhanced"
                >
                  <i className="fas fa-shopping-cart mr-2"></i>
                  Thêm vào giỏ hàng
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="w-full border-2 border-yellow-800 text-yellow-800 btn-mobile font-semibold hover:bg-yellow-50 transition-all btn-enhanced"
                >
                  <i className="fas fa-bolt mr-2"></i>
                  Mua ngay
                </button>
              </div>
            </div>
          </div>

          {/* Product Info Tabs */}
          <div className="border-t border-gray-200 pt-8">
            <div className="mb-6">
              <nav className="flex space-x-8 border-b border-gray-200">
                {[
                  { id: 'specifications', name: 'Thông số' },
                  { id: 'description', name: 'Mô tả chi tiết' },
                  { id: 'reviews', name: 'Đánh giá' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-yellow-800 text-yellow-800'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="max-w-4xl">
              {activeTab === 'specifications' && (
                <div className="grid md:grid-cols-2 gap-4">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">{spec.label}:</span>
                      <span className="text-gray-600">{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
                  <h4 className="font-semibold text-gray-800 mb-2">Đặc điểm nổi bật:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Nguyên liệu 100% tự nhiên từ vùng trầm hương nổi tiếng</li>
                    <li>Chế tác thủ công bởi nghệ nhân có kinh nghiệm</li>
                    <li>Kiểm định chất lượng nghiêm ngặt</li>
                    <li>Bảo hành chất lượng sản phẩm</li>
                    <li>Hỗ trợ tư vấn chuyên nghiệp 24/7</li>
                  </ul>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-yellow-800 rounded-full flex items-center justify-center mr-3">
                        <i className="fas fa-user text-white"></i>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800">Anh Minh Đức</h5>
                        <div className="text-yellow-400 text-sm">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className="fas fa-star"></i>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">"Sản phẩm rất đẹp, chất lượng tuyệt vời. Mùi hương thơm tự nhiên, đúng như mô tả."</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-yellow-800 rounded-full flex items-center justify-center mr-3">
                        <i className="fas fa-user text-white"></i>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800">Chị Hương Lan</h5>
                        <div className="text-yellow-400 text-sm">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className="fas fa-star"></i>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">"Shop tư vấn rất nhiệt tình, sản phẩm đúng như cam kết. Sẽ ủng hộ shop lâu dài."</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;