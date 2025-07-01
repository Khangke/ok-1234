import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { formatPrice } from '../data/mockData';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    customerAddress: '',
    paymentMethod: 'cod',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create order object
    const order = {
      id: 'DH' + Date.now().toString().slice(-6),
      ...formData,
      items: items,
      totalAmount: getTotalPrice(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Save to localStorage (simulate backend)
    const existingOrders = JSON.parse(localStorage.getItem('son-moc-huong-orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('son-moc-huong-orders', JSON.stringify(existingOrders));

    // Clear cart
    clearCart();

    setIsSubmitting(false);

    // Navigate to success page
    navigate(`/order-success/${order.id}`);
  };

  const isValidForm = formData.customerName && formData.customerPhone && formData.customerAddress;

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display text-3xl font-bold text-gray-800 mb-8 text-center">
            Đặt hàng
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="font-semibold text-xl text-gray-800 mb-6">Thông tin đặt hàng</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Nhập email (không bắt buộc)"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ giao hàng <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="customerAddress"
                    value={formData.customerAddress}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Nhập địa chỉ chi tiết (số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố)"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Phương thức thanh toán
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="text-yellow-800 focus:ring-yellow-500"
                      />
                      <div className="ml-3">
                        <div className="flex items-center">
                          <i className="fas fa-money-bill-wave text-green-600 mr-2"></i>
                          <span className="font-medium text-gray-800">Thanh toán khi nhận hàng (COD)</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Thanh toán bằng tiền mặt khi nhận hàng</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank_transfer"
                        checked={formData.paymentMethod === 'bank_transfer'}
                        onChange={handleInputChange}
                        className="text-yellow-800 focus:ring-yellow-500"
                      />
                      <div className="ml-3">
                        <div className="flex items-center">
                          <i className="fas fa-university text-blue-600 mr-2"></i>
                          <span className="font-medium text-gray-800">Chuyển khoản ngân hàng</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Chuyển khoản trước khi giao hàng</p>
                      </div>
                    </label>
                  </div>
                </div>

                {formData.paymentMethod === 'bank_transfer' && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Thông tin chuyển khoản:</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p><strong>Ngân hàng:</strong> Vietcombank</p>
                      <p><strong>Số tài khoản:</strong> 1234567890</p>
                      <p><strong>Chủ tài khoản:</strong> NGUYEN VAN A</p>
                      <p><strong>Nội dung:</strong> {`DH${Date.now().toString().slice(-6)} ${formData.customerName}`}</p>
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ghi chú đặt hàng
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Ghi chú đặc biệt cho đơn hàng (thời gian giao hàng, yêu cầu đặc biệt...)"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isValidForm || isSubmitting}
                  className={`w-full py-4 rounded-lg font-semibold transition-all ${
                    isValidForm && !isSubmitting
                      ? 'bg-yellow-800 text-white hover:bg-yellow-700 transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check mr-2"></i>
                      Đặt hàng ngay
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-32">
                <h3 className="font-semibold text-lg text-gray-800 mb-4">Đơn hàng của bạn</h3>
                
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 text-sm">{item.title}</h4>
                        <p className="text-xs text-gray-600">{item.size} × {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-gray-800">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-6">
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
                  <div className="flex items-center text-green-600 text-sm">
                    <i className="fas fa-shield-alt mr-2"></i>
                    <span>Đảm bảo chất lượng 100%</span>
                  </div>
                  <div className="flex items-center text-blue-600 text-sm">
                    <i className="fas fa-truck mr-2"></i>
                    <span>Giao hàng toàn quốc</span>
                  </div>
                  <div className="flex items-center text-purple-600 text-sm">
                    <i className="fas fa-headset mr-2"></i>
                    <span>Hỗ trợ 24/7</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-yellow-800 font-medium mb-1">Cần hỗ trợ?</p>
                    <a 
                      href="tel:0762222448"
                      className="text-yellow-800 font-bold hover:text-yellow-700"
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
    </div>
  );
};

export default Checkout;