import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { formatPrice } from '../data/mockData';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-shopping-cart text-4xl text-gray-400"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Giỏ hàng trống</h2>
          <p className="text-gray-600 mb-8">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
          <Link 
            to="/products"
            className="bg-yellow-800 text-white px-8 py-3 rounded-lg hover:bg-yellow-700 transition-colors font-semibold"
          >
            <i className="fas fa-shopping-bag mr-2"></i>
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-display text-3xl font-bold text-gray-800">Giỏ hàng của bạn</h1>
            <button 
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              <i className="fas fa-trash mr-1"></i>
              Xóa tất cả
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-800 mb-4">
                    Sản phẩm ({items.length})
                  </h3>
                  
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-20 h-20 flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 truncate">{item.title}</h4>
                          <p className="text-sm text-gray-600">{item.size}</p>
                          <p className="text-yellow-800 font-semibold">{formatPrice(item.price)}</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors flex items-center justify-center"
                          >
                            <i className="fas fa-minus text-xs"></i>
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors flex items-center justify-center"
                          >
                            <i className="fas fa-plus text-xs"></i>
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-bold text-gray-800">{formatPrice(item.price * item.quantity)}</p>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-700 text-sm mt-1"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-32">
                <h3 className="font-semibold text-lg text-gray-800 mb-4">Tổng đơn hàng</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính:</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển:</span>
                    <span className="text-green-600">Miễn phí</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Tổng cộng:</span>
                    <span className="text-yellow-800">{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link 
                    to="/checkout"
                    className="w-full bg-yellow-800 text-white py-4 rounded-lg font-semibold hover:bg-yellow-700 transition-colors text-center block"
                  >
                    <i className="fas fa-credit-card mr-2"></i>
                    Tiến hành đặt hàng
                  </Link>
                  
                  <Link 
                    to="/products"
                    className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center block"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Tiếp tục mua sắm
                  </Link>
                </div>

                {/* Promotion Section */}
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center text-yellow-800 mb-2">
                    <i className="fas fa-gift mr-2"></i>
                    <span className="font-semibold">Ưu đãi đặc biệt</span>
                  </div>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Miễn phí vận chuyển toàn quốc</li>
                    <li>• Tư vấn miễn phí 24/7</li>
                    <li>• Đổi trả trong 7 ngày</li>
                  </ul>
                </div>

                {/* Contact */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 mb-2">Cần hỗ trợ?</p>
                  <a 
                    href="tel:0762222448"
                    className="text-yellow-800 font-semibold hover:text-yellow-700"
                  >
                    <i className="fas fa-phone mr-1"></i>
                    0762 222 448
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;