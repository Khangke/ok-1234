import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/mockData';
import { useCart } from '../contexts/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === id);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specifications');

  if (!product) {
    return (
      <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Sản phẩm không tồn tại</h2>
          <Link to="/products" className="bg-yellow-800 text-white px-6 py-3 rounded-lg hover:bg-yellow-700">
            Quay lại danh sách sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const selectedSizeValue = product.sizes[selectedSize];
    const price = (product.price.min + product.price.max) / 2; // Mid-range price
    addToCart(product, selectedSizeValue, quantity, price);
    
    // Show success message or redirect to cart
    alert(`Đã thêm ${quantity} ${product.title} (${selectedSizeValue}) vào giỏ hàng!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const specifications = [
    { label: 'Danh mục', value: product.category },
    { label: 'Kho hàng', value: `${product.stock} sản phẩm` },
    { label: 'Đánh giá', value: `${product.rating}/5 (${product.reviewCount} đánh giá)` },
    { label: 'Tùy chọn size', value: `${product.sizes.length} lựa chọn` }
  ];

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link to="/" className="text-gray-500 hover:text-yellow-800">Trang chủ</Link></li>
            <li><i className="fas fa-chevron-right text-gray-400 mx-2"></i></li>
            <li><Link to="/products" className="text-gray-500 hover:text-yellow-800">Sản phẩm</Link></li>
            <li><i className="fas fa-chevron-right text-gray-400 mx-2"></i></li>
            <li className="text-yellow-800 font-medium">{product.title}</li>
          </ol>
        </nav>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div>
              <div className="mb-4">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.title}
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
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
                <span className={`inline-block text-xs px-3 py-1 rounded-full bg-${product.badgeColor}-100 text-${product.badgeColor}-800 mb-3`}>
                  {product.badge}
                </span>
                <h1 className="font-display text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 mr-2">
                    {[...Array(product.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                  <span className="text-gray-500">({product.reviewCount} đánh giá)</span>
                </div>
                <p className="text-3xl font-bold text-yellow-800 mb-4">{product.priceDisplay}</p>
                <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Tùy chọn:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {product.sizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(index)}
                      className={`p-3 border-2 rounded-lg transition-all ${
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
                <h4 className="font-semibold text-gray-800 mb-3">Số lượng:</h4>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-200 text-gray-700 w-10 h-10 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    -
                  </button>
                  <span className="font-semibold text-lg w-12 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-200 text-gray-700 w-10 h-10 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-500">({product.stock} có sẵn)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-8">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-yellow-800 text-white py-4 rounded-lg font-semibold hover:bg-yellow-700 transition-colors transform hover:scale-105"
                >
                  <i className="fas fa-shopping-cart mr-2"></i>
                  Thêm vào giỏ hàng
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="w-full border-2 border-yellow-800 text-yellow-800 py-4 rounded-lg font-semibold hover:bg-yellow-50 transition-colors"
                >
                  <i className="fas fa-bolt mr-2"></i>
                  Mua ngay
                </button>
                <a 
                  href="tel:0762222448"
                  className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center block"
                >
                  <i className="fas fa-phone mr-2"></i>
                  Gọi tư vấn: 0762 222 448
                </a>
              </div>
            </div>
          </div>

          {/* Product Info Tabs */}
          <div className="border-t border-gray-200 p-8">
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

        {/* Related Products */}
        <div className="mt-16">
          <h3 className="font-display text-2xl font-bold text-gray-800 mb-8">Sản phẩm liên quan</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link 
                  key={relatedProduct.id} 
                  to={`/product/${relatedProduct.id}`}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-48">
                    <img 
                      src={relatedProduct.images[0]} 
                      alt={relatedProduct.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">{relatedProduct.title}</h4>
                    <p className="text-yellow-800 font-bold">{relatedProduct.priceDisplay}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;