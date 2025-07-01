import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navigation = [
    { name: 'Tổng quan', href: '/admin', icon: 'dashboard' },
    { name: 'Sản phẩm', href: '/admin/products', icon: 'box' },
    { name: 'Đơn hàng', href: '/admin/orders', icon: 'shopping-cart' },
    { name: 'Liên hệ', href: '/admin/contacts', icon: 'envelope' },
    { name: 'Cài đặt', href: '/admin/settings', icon: 'cog' }
  ];

  const isActivePage = (href) => {
    if (href === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-gray-900 text-white transition-all duration-300 ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}>
        <div className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-spa text-white"></i>
            </div>
            {isSidebarOpen && (
              <div>
                <h1 className="font-bold text-lg">Admin Panel</h1>
                <p className="text-sm text-gray-400">Sơn Mộc Hương</p>
              </div>
            )}
          </div>
        </div>

        <nav className="mt-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                isActivePage(item.href)
                  ? 'bg-yellow-600 text-white border-r-4 border-yellow-400'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <i className={`fas fa-${item.icon} w-5 text-center`}></i>
              {isSidebarOpen && <span className="ml-3">{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Link
            to="/"
            className="flex items-center px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <i className="fas fa-external-link-alt w-5 text-center"></i>
            {isSidebarOpen && <span className="ml-3">Xem website</span>}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-bars text-xl"></i>
              </button>
              <h2 className="text-xl font-semibold text-gray-800">
                {navigation.find(nav => isActivePage(nav.href))?.name || 'Admin'}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">Quản trị viên</p>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <i className="fas fa-user text-gray-600"></i>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;