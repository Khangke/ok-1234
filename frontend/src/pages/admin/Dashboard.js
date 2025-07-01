import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { products, formatPrice } from '../../data/mockData';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: products.length,
    totalContacts: 0,
    recentOrders: [],
    recentContacts: []
  });

  useEffect(() => {
    // Load data from localStorage
    const orders = JSON.parse(localStorage.getItem('son-moc-huong-orders') || '[]');
    const contacts = JSON.parse(localStorage.getItem('son-moc-huong-contacts') || '[]');

    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const recentOrders = orders.slice(-5).reverse();
    const recentContacts = contacts.slice(-5).reverse();

    setStats({
      totalOrders: orders.length,
      totalRevenue,
      totalProducts: products.length,
      totalContacts: contacts.length,
      recentOrders,
      recentContacts
    });
  }, []);

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
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng đơn hàng</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <i className="fas fa-shopping-cart text-blue-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/orders" className="text-blue-600 text-sm font-medium hover:underline">
              Xem chi tiết →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Doanh thu</p>
              <p className="text-3xl font-bold text-gray-900">{formatPrice(stats.totalRevenue)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <i className="fas fa-chart-line text-green-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-600 text-sm font-medium">
              +12% so với tháng trước
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sản phẩm</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <i className="fas fa-box text-purple-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/products" className="text-purple-600 text-sm font-medium hover:underline">
              Quản lý sản phẩm →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Liên hệ</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalContacts}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <i className="fas fa-envelope text-yellow-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/contacts" className="text-yellow-600 text-sm font-medium hover:underline">
              Xem tin nhắn →
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Đơn hàng gần đây</h3>
            <Link to="/admin/orders" className="text-blue-600 text-sm font-medium hover:underline">
              Xem tất cả
            </Link>
          </div>
          
          {stats.recentOrders.length > 0 ? (
            <div className="space-y-4">
              {stats.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-800">#{order.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{order.customerName}</p>
                    <p className="text-sm font-semibold text-yellow-800">{formatPrice(order.totalAmount)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <i className="fas fa-shopping-cart text-4xl text-gray-300 mb-2"></i>
              <p className="text-gray-500">Chưa có đơn hàng nào</p>
            </div>
          )}
        </div>

        {/* Recent Contacts */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Tin nhắn gần đây</h3>
            <Link to="/admin/contacts" className="text-blue-600 text-sm font-medium hover:underline">
              Xem tất cả
            </Link>
          </div>
          
          {stats.recentContacts.length > 0 ? (
            <div className="space-y-4">
              {stats.recentContacts.map((contact) => (
                <div key={contact.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">{contact.name}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(contact.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{contact.message}</p>
                  <p className="text-sm text-gray-500 mt-1">{contact.phone}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <i className="fas fa-envelope text-4xl text-gray-300 mb-2"></i>
              <p className="text-gray-500">Chưa có tin nhắn nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Thao tác nhanh</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/admin/products"
            className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <i className="fas fa-plus text-blue-600 text-2xl mb-2"></i>
            <span className="text-sm font-medium text-blue-800">Thêm sản phẩm</span>
          </Link>
          
          <Link
            to="/admin/orders"
            className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <i className="fas fa-search text-green-600 text-2xl mb-2"></i>
            <span className="text-sm font-medium text-green-800">Tìm đơn hàng</span>
          </Link>
          
          <Link
            to="/admin/contacts"
            className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
          >
            <i className="fas fa-reply text-yellow-600 text-2xl mb-2"></i>
            <span className="text-sm font-medium text-yellow-800">Trả lời liên hệ</span>
          </Link>
          
          <Link
            to="/admin/settings"
            className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <i className="fas fa-cog text-purple-600 text-2xl mb-2"></i>
            <span className="text-sm font-medium text-purple-800">Cài đặt</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;