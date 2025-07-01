import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products, testimonials, companyInfo, getBadgeColor } from '../data/mockData';
import { useCart } from '../contexts/CartContext';
import ProductModal from '../components/ProductModal';

const Home = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickAdd = (product, e) => {
    e.stopPropagation();
    // Add with default size and mid-range price
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
    <div className="pt-20">
      {/* Hero Banner Carousel */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="banner-carousel relative w-full h-screen">
          <div className="carousel-container">
            <div className="carousel-slide active">
              <img 
                src="https://tramhuongviet.com/wp-content/themes/yootheme/cache/b3/banner-trang-home-b3591009.jpeg" 
                alt="Nhang Nụ Trầm Hương - Sơn Mộc Hương"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="carousel-slide">
              <img 
                src="https://tramhuongviet.com/wp-content/themes/yootheme/cache/b3/banner-trang-home-b3591009.jpeg" 
                alt="Vòng Trầm Hương Nam"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="carousel-slide">
              <img 
                src="https://tramhuongviet.com/wp-content/themes/yootheme/cache/b3/banner-trang-home-b3591009.jpeg" 
                alt="Ưu Điểm Vòng Trầm Hương Chìm Nước"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="carousel-slide">
              <img 
                src="https://tramhuongviet.com/wp-content/themes/yootheme/cache/b3/banner-trang-home-b3591009.jpeg" 
                alt="Đặc Điểm Nhang Trầm Sơn Mộc Hương"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="carousel-slide">
              <img 
                src="https://tramhuongviet.com/wp-content/themes/yootheme/cache/b3/banner-trang-home-b3591009.jpeg" 
                alt="Vòng 108 Hạt Trầm Cần Chìm"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Carousel Indicators */}
          <div className="carousel-indicators absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
            <button className="carousel-indicator active" data-slide="0"></button>
            <button className="carousel-indicator" data-slide="1"></button>
            <button className="carousel-indicator" data-slide="2"></button>
            <button className="carousel-indicator" data-slide="3"></button>
            <button className="carousel-indicator" data-slide="4"></button>
          </div>
          
          {/* Navigation Arrows */}
          <button className="carousel-nav carousel-prev absolute left-6 top-1/2 transform -translate-y-1/2 z-10">
            <i className="fas fa-chevron-left text-white text-2xl"></i>
          </button>
          <button className="carousel-nav carousel-next absolute right-6 top-1/2 transform -translate-y-1/2 z-10">
            <i className="fas fa-chevron-right text-white text-2xl"></i>
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mobile-section bg-white">
        <div className="mobile-container">
          <div className="text-center mb-12">
            <h2 className="font-display mobile-title text-gray-800 animate-fade-in">
              Sản Phẩm <span className="text-yellow-800">Nổi Bật</span>
            </h2>
            <p className="mobile-subtitle text-gray-600 max-w-2xl mx-auto animate-fade-in animate-delay-200">
              Bộ sưu tập trầm hương cao cấp được tuyển chọn từ những vùng đất nổi tiếng nhất Việt Nam
            </p>
          </div>
          
          <div className="mobile-grid md:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((product, index) => (
              <div 
                key={product.id} 
                className="mobile-product-card card-enhanced cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openProductModal(product)}
              >
                <div className="mobile-product-image">
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
                </div>
                <div className="mobile-product-content">
                  <h3 className="mobile-product-title line-clamp-2">{product.title}</h3>
                  <p className="mobile-text text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="mobile-product-price">{product.priceDisplay}</span>
                      <div className="flex items-center mt-1">
                        <div className="text-yellow-400 mr-2">
                          {[...Array(product.rating)].map((_, i) => (
                            <i key={i} className="fas fa-star"></i>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">({product.reviewCount} đánh giá)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="flex-1 bg-yellow-800 text-white btn-mobile hover:bg-yellow-700 transition-all text-center font-semibold btn-enhanced"
                      onClick={(e) => {
                        e.stopPropagation();
                        openProductModal(product);
                      }}
                    >
                      Xem chi tiết
                    </button>
                    <button 
                      onClick={(e) => handleQuickAdd(product, e)}
                      className="bg-green-100 text-green-700 hover:bg-green-200 touch-target rounded-lg hover:scale-105 transition-all btn-enhanced flex-shrink-0"
                      title="Thêm vào giỏ hàng"
                    >
                      <i className="fas fa-cart-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/products"
              className="bg-gradient-to-r from-yellow-800 to-yellow-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <i className="fas fa-th-large mr-2"></i>
              Xem tất cả sản phẩm
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Về <span className="text-yellow-800">{companyInfo.name}</span>
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Sơn Mộc Hương là địa chỉ uy tín chuyên cung cấp các sản phẩm trầm hương chất lượng cao, 
                bao gồm vòng tay trầm, nhang trầm và các phụ kiện xông trầm đa dạng. Chúng tôi tự hào 
                mang đến cho khách hàng những sản phẩm từ thiên nhiên, với nguyên liệu trầm hương nguyên 
                chất được chọn lọc kỹ lưỡng từ những vùng đất nổi tiếng về trầm hương tại Việt Nam.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {companyInfo.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-yellow-800 rounded-full flex items-center justify-center">
                      <i className={`fas fa-${feature.icon} text-white`}></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link 
                to="/contact"
                className="bg-gradient-to-r from-yellow-800 to-yellow-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <i className="fas fa-phone mr-2"></i>
                Liên hệ tư vấn ngay
              </Link>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-200 to-orange-200 rounded-3xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <i className="fas fa-spa text-8xl text-yellow-800 mb-4"></i>
                  <h3 className="font-display text-2xl font-bold text-yellow-800">Trầm Hương Việt Nam</h3>
                  <p className="text-yellow-700">Tinh hoa thiên nhiên</p>
                </div>
              </div>
              
              {/* Stats Cards */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-lg p-6 animate-float">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-800">1000+</div>
                  <div className="text-sm text-gray-600">Khách hàng hài lòng</div>
                </div>
              </div>
              
              <div className="absolute -top-8 -right-8 bg-white rounded-2xl shadow-lg p-6 animate-float-delayed">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-800">7+</div>
                  <div className="text-sm text-gray-600">Năm kinh nghiệm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Khách Hàng <span className="text-yellow-800">Nói Gì</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những phản hồi chân thành từ khách hàng đã tin tưởng và sử dụng sản phẩm của chúng tôi
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gradient-to-br from-white to-yellow-50 p-6 rounded-2xl shadow-lg border-l-4 border-yellow-600">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-800 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-user text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-3 text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <a 
        href={`https://wa.me/${companyInfo.whatsapp}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-24 right-8 w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all flex items-center justify-center z-40 animate-pulse"
      >
        <i className="fab fa-whatsapp text-2xl"></i>
      </a>

      {/* Scroll to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-yellow-800 text-white rounded-full shadow-lg hover:bg-yellow-700 transition-all z-40"
      >
        <i className="fas fa-arrow-up"></i>
      </button>

      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeProductModal}
      />
    </div>
  );
};

export default Home;