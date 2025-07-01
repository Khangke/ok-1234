import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatPrice } from '../data/mockData';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Load order from localStorage
    const orders = JSON.parse(localStorage.getItem('son-moc-huong-orders') || '[]');
    const foundOrder = orders.find(o => o.id === orderId);
    setOrder(foundOrder);
  }, [orderId]);

  if (!order) {
    return (
      <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy đơn hàng</h2>
          <Link to="/" className="bg-yellow-800 text-white px-6 py-3 rounded-lg hover:bg-yellow-700">
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-check text-3xl text-green-600"></i>
            </div>
            <h1 className="font-display text-3xl font-bold text-gray-800 mb-2">
              Đặt hàng thành công!
            </h1>
            <p className="text-gray-600">
              Cảm ơn bạn đã tin tưởng và đặt hàng tại Sơn Mộc Hương
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Order Info */}
              <div>
                <h2 className="font-semibold text-xl text-gray-800 mb-4">Thông tin đơn hàng</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mã đơn hàng:</span>
                    <span className="font-semibold text-yellow-800">{order.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngày đặt:</span>
                    <span className="font-medium">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trạng thái:</span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      Đang xử lý
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thanh toán:</span>
                    <span className="font-medium">
                      {order.paymentMethod === 'cod' ? 'COD (Thanh toán khi nhận hàng)' : 'Chuyển khoản'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tổng tiền:</span>
                    <span className="font-bold text-xl text-yellow-800">{formatPrice(order.totalAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div>
                <h2 className="font-semibold text-xl text-gray-800 mb-4">Thông tin giao hàng</h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600">Người nhận:</span>
                    <p className="font-medium">{order.customerName}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Điện thoại:</span>
                    <p className="font-medium">{order.customerPhone}</p>
                  </div>
                  {order.customerEmail && (
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <p className="font-medium">{order.customerEmail}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-600">Địa chỉ:</span>
                    <p className="font-medium">{order.customerAddress}</p>
                  </div>
                  {order.notes && (
                    <div>
                      <span className="text-gray-600">Ghi chú:</span>
                      <p className="font-medium italic">"{order.notes}"</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="font-semibold text-xl text-gray-800 mb-4">Sản phẩm đã đặt</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.size}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Số lượng</p>
                    <p className="font-semibold">{item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Thành tiền</p>
                    <p className="font-bold text-yellow-800">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 mb-8">
            <h2 className="font-semibold text-xl text-gray-800 mb-4">Bước tiếp theo</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-800 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Xác nhận đơn hàng</h4>
                  <p className="text-gray-600 text-sm">Chúng tôi sẽ gọi điện xác nhận đơn hàng trong vòng 30 phút</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-800 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Chuẩn bị hàng</h4>
                  <p className="text-gray-600 text-sm">Đóng gói cẩn thận và chuẩn bị giao hàng trong 1-2 ngày làm việc</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-800 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Giao hàng</h4>
                  <p className="text-gray-600 text-sm">Giao hàng tận nơi trong 2-5 ngày làm việc tùy theo khu vực</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-800 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Nhận hàng & Thanh toán</h4>
                  <p className="text-gray-600 text-sm">
                    {order.paymentMethod === 'cod' 
                      ? 'Thanh toán khi nhận hàng và kiểm tra chất lượng'
                      : 'Nhận hàng sau khi đã chuyển khoản thành công'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Transfer Info */}
          {order.paymentMethod === 'bank_transfer' && (
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-blue-800 mb-3">
                <i className="fas fa-university mr-2"></i>
                Thông tin chuyển khoản
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-700"><strong>Ngân hàng:</strong> Vietcombank</p>
                  <p className="text-blue-700"><strong>Số tài khoản:</strong> 1234567890</p>
                </div>
                <div>
                  <p className="text-blue-700"><strong>Chủ tài khoản:</strong> NGUYEN VAN A</p>
                  <p className="text-blue-700"><strong>Nội dung:</strong> {order.id} {order.customerName}</p>
                </div>
              </div>
              <p className="text-blue-600 mt-3 font-medium">
                Vui lòng chuyển khoản đúng nội dung để chúng tôi xử lý đơn hàng nhanh chóng
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products"
              className="bg-yellow-800 text-white px-8 py-3 rounded-lg hover:bg-yellow-700 transition-colors font-semibold text-center"
            >
              <i className="fas fa-shopping-bag mr-2"></i>
              Tiếp tục mua sắm
            </Link>
            
            <a 
              href="tel:0762222448"
              className="border-2 border-yellow-800 text-yellow-800 px-8 py-3 rounded-lg hover:bg-yellow-50 transition-colors font-semibold text-center"
            >
              <i className="fas fa-phone mr-2"></i>
              Liên hệ: 0762 222 448
            </a>
          </div>

          {/* Thank You Message */}
          <div className="text-center mt-8 p-6">
            <p className="text-gray-600 italic">
              "Cảm ơn bạn đã tin tưởng Sơn Mộc Hương. Chúng tôi cam kết mang đến cho bạn những sản phẩm trầm hương chất lượng cao nhất!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;