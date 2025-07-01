import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { companyInfo } from '../data/mockData';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const location = useLocation();
  const totalItems = getTotalItems();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigation = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Sản phẩm', href: '/products' },
    { name: 'Liên hệ', href: '/contact' }
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover-lift">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-yellow-800 to-yellow-600 flex items-center justify-center">
              <i className="fas fa-spa text-white text-lg md:text-xl"></i>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display font-bold text-responsive-lg text-gray-800">{companyInfo.name}</h1>
              <p className="text-responsive-xs text-gray-600">{companyInfo.subtitle}</p>
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-gray-700 hover:text-yellow-800 font-medium transition-colors focus-enhanced touch-target text-responsive-sm ${
                  location.pathname === item.href ? 'text-yellow-800' : ''
                }`}
              >
                {item.name}
                {item.name === 'Giỏ hàng' && totalItems > 0 && (
                  <span className="ml-1 bg-yellow-800 text-white text-xs px-2 py-1 rounded-full animate-pulse-soft">
                    {totalItems}
                  </span>
                )}
              </Link>
            ))}
          </nav>
          
          {/* Contact Info & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:block text-right">
              <p className="text-sm font-medium text-gray-800">{companyInfo.phone}</p>
              <p className="text-xs text-gray-600">Hotline 24/7</p>
            </div>
            <button 
              className="md:hidden text-gray-700 hover:text-yellow-800 w-12 h-12 rounded-lg hover:bg-yellow-50 flex items-center justify-center transition-all touch-target"
              onClick={toggleMobileMenu}
            >
              {/* Fallback hamburger */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <i className="fas fa-bars text-xl absolute"></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu md:hidden fixed top-0 left-0 w-80 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-800 to-yellow-600 flex items-center justify-center">
                <i className="fas fa-spa text-white"></i>
              </div>
              <span className="font-display font-bold text-lg">{companyInfo.name}</span>
            </div>
            <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-red-500 w-12 h-12 rounded-full hover:bg-red-50 flex items-center justify-center transition-all touch-target">
              {/* Fallback SVG */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <i className="fas fa-times text-xl absolute"></i>
            </button>
          </div>
          <nav className="space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block py-4 text-gray-700 hover:text-yellow-800 border-b border-gray-100 touch-target text-responsive-base transition-colors"
                onClick={toggleMobileMenu}
              >
                {item.name}
                {item.name === 'Giỏ hàng' && totalItems > 0 && (
                  <span className="ml-2 bg-yellow-800 text-white text-xs px-2 py-1 rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
            ))}
          </nav>
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-800">Hotline: {companyInfo.phone}</p>
            <p className="text-sm text-gray-600 mt-1">{companyInfo.email}</p>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </header>
  );
};

export default Header;