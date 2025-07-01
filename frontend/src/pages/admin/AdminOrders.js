import React, { useEffect, useState } from 'react';
import { formatPrice } from '../../data/mockData';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('son-moc-huong-orders') || '[]');
    setOrders(savedOrders);
    setFilteredOrders(savedOrders);
  }, []);

  useEffect(() => {
    // Filter orders based on search term and status
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerPhone.includes(searchTerm)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter]);

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('son-moc-huong-orders', JSON.stringify(updatedOrders));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Chờ xử lý';
      case 'confirmed': return 'Đã xác nhận';
      case 'shipped': return 'Đang giao';
      case 'delivered': return 'Đã giao';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý đơn hàng</h1>
        <div className="mt-4 md:mt-0">
          <span className="text-sm text-gray-600">
            Tổng: {filteredOrders.length} đơn hàng
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo mã đơn hàng, tên khách hàng, số điện thoại..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="pending">Chờ xử lý</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="shipped">Đang giao</option>
              <option value="delivered">Đã giao</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Đơn hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thanh toán
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                        <div className="text-sm text-gray-500">{order.customerPhone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatPrice(order.totalAmount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.paymentMethod === 'cod' ? 'COD' : 'Chuyển khoản'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Chi tiết
                      </button>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="pending">Chờ xử lý</option>
                        <option value="confirmed">Đã xác nhận</option>
                        <option value="shipped">Đang giao</option>
                        <option value="delivered">Đã giao</option>
                        <option value="cancelled">Đã hủy</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-600 mb-2">Không có đơn hàng</h3>
            <p className="text-gray-500">Chưa có đơn hàng nào hoặc không tìm thấy kết quả phù hợp</p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Chi tiết đơn hàng #{selectedOrder.id}</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times text-2xl"></i>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Order Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông tin đơn hàng</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mã đơn hàng:</span>
                      <span className="font-medium">#{selectedOrder.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ngày đặt:</span>
                      <span className="font-medium">
                        {new Date(selectedOrder.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trạng thái:</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                        {getStatusText(selectedOrder.status)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Thanh toán:</span>
                      <span className="font-medium">
                        {selectedOrder.paymentMethod === 'cod' ? 'COD' : 'Chuyển khoản'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tổng tiền:</span>
                      <span className="font-bold text-xl text-yellow-800">
                        {formatPrice(selectedOrder.totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông tin khách hàng</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600">Họ tên:</span>
                      <p className="font-medium">{selectedOrder.customerName}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Điện thoại:</span>
                      <p className="font-medium">{selectedOrder.customerPhone}</p>
                    </div>
                    {selectedOrder.customerEmail && (
                      <div>
                        <span className="text-gray-600">Email:</span>
                        <p className="font-medium">{selectedOrder.customerEmail}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-600">Địa chỉ:</span>
                      <p className="font-medium">{selectedOrder.customerAddress}</p>
                    </div>
                    {selectedOrder.notes && (
                      <div>
                        <span className="text-gray-600">Ghi chú:</span>
                        <p className="font-medium italic">"{selectedOrder.notes}"</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Sản phẩm</h3>
                <div className="space-y-4">
                  {selectedOrder.items.map((item) => (
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

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => updateOrderStatus(selectedOrder.id, 'confirmed')}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  disabled={selectedOrder.status === 'confirmed'}
                >
                  Xác nhận đơn hàng
                </button>
                <button
                  onClick={() => updateOrderStatus(selectedOrder.id, 'shipped')}
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
                  disabled={selectedOrder.status === 'shipped'}
                >
                  Đánh dấu đang giao
                </button>
                <button
                  onClick={() => updateOrderStatus(selectedOrder.id, 'delivered')}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                  disabled={selectedOrder.status === 'delivered'}
                >
                  Hoàn thành
                </button>
                <a
                  href={`tel:${selectedOrder.customerPhone}`}
                  className="flex-1 bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition-colors text-center"
                >
                  Gọi khách hàng
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;