import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products, testimonials, companyInfo, getBadgeColor } from '../data/mockData';
import { useCart } from '../contexts/CartContext';
import ProductModal from '../components/ProductModal';
import { bannerImages } from '../data/bannerImages';

const Home = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

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
      <section className="relative overflow-hidden">
        <div className="banner-carousel relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] xl:h-[500px]">
          <div className="carousel-container relative w-full h-full">
            {bannerImages.map((image, index) => (
              <div 
                key={index}
                className={`carousel-slide absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-contain bg-white"
                />
              </div>
            ))}
          </div>
          
          {/* Carousel Indicators */}
          <div className="carousel-indicators absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3 z-10">
            {bannerImages.map((_, index) => (
              <button 
                key={index}
                onClick={() => goToSlide(index)}
                className={`carousel-indicator w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-yellow-500 w-6 md:w-8' 
                    : 'bg-white/70 hover:bg-white/90'
                }`}
              />
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="carousel-nav carousel-prev absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-all duration-300"
          >
            <i className="fas fa-chevron-left text-white text-sm md:text-base"></i>
          </button>
          <button 
            onClick={nextSlide}
            className="carousel-nav carousel-next absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-all duration-300"
          >
            <i className="fas fa-chevron-right text-white text-sm md:text-base"></i>
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-display text-gray-800 animate-fade-in">
              SẢN PHẨM <span className="text-yellow-800">NỔI BẬT</span>
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto mt-4 animate-fade-in animate-delay-200">
              Bộ sưu tập trầm hương cao cấp được tuyển chọn từ những vùng đất nổi tiếng nhất Việt Nam
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {products.slice(0, 6).map((product, index) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openProductModal(product)}
              >
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img 
                    src={product.images[0]} 
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getBadgeColor(product.badgeColor)}`}>
                      {product.badge}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{product.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-lg md:text-xl font-bold text-gray-800">{product.priceDisplay}</span>
                      <div className="flex items-center mt-1">
                        <div className="text-yellow-400 mr-2">
                          {[...Array(product.rating)].map((_, i) => (
                            <i key={i} className="fas fa-star text-xs"></i>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">({product.reviewCount})</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="flex-1 bg-yellow-800 text-white py-2 px-3 rounded-lg hover:bg-yellow-700 transition-all text-sm font-semibold"
                      onClick={(e) => {
                        e.stopPropagation();
                        openProductModal(product);
                      }}
                    >
                      Xem chi tiết
                    </button>
                    <button 
                      onClick={(e) => handleQuickAdd(product, e)}
                      className="bg-green-100 text-green-700 hover:bg-green-200 p-2 rounded-lg hover:scale-105 transition-all flex-shrink-0"
                      title="Thêm vào giỏ hàng"
                    >
                      <i className="fas fa-cart-plus text-sm"></i>
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
      <section className="py-12 md:py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-display text-gray-800 mb-4 md:mb-6">
                VỀ <span className="text-yellow-800">{companyInfo.name}</span>
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                Sơn Mộc Hương là địa chỉ uy tín chuyên cung cấp các sản phẩm trầm hương chất lượng cao, 
                bao gồm vòng tay trầm, nhang trầm và các phụ kiện xông trầm đa dạng. Chúng tôi tự hào 
                mang đến cho khách hàng những sản phẩm từ thiên nhiên, với nguyên liệu trầm hương nguyên 
                chất được chọn lọc kỹ lưỡng từ những vùng đất nổi tiếng về trầm hương tại Việt Nam.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                {companyInfo.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-800 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className={`fas fa-${feature.icon} text-white text-sm md:text-base`}></i>
                    </div>
                    <div>
                      <h4 className="text-sm md:text-base font-semibold text-gray-800">{feature.title}</h4>
                      <p className="text-xs md:text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link 
                to="/contact"
                className="inline-block bg-gradient-to-r from-yellow-800 to-yellow-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-sm md:text-base"
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
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-display text-gray-800 mb-4">
              KHÁCH HÀNG <span className="text-yellow-800">NÓI GÌ</span>
            </h2>
            <p className="text-sm md:text-base lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Những phản hồi chân thành từ khách hàng đã tin tưởng và sử dụng sản phẩm của chúng tôi
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gradient-to-br from-white to-yellow-50 p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg border-l-4 border-yellow-600">
                <div className="flex items-center mb-3 md:mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-800 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                    <i className="fas fa-user text-white text-sm md:text-base"></i>
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-xs md:text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-2 md:mb-3 text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star text-sm md:text-base"></i>
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