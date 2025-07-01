import React from 'react';
import { Link } from 'react-router-dom';
import { companyInfo } from '../data/mockData';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-800 flex items-center justify-center">
                <i className="fas fa-spa text-white text-xl"></i>
              </div>
              <div>
                <h3 className="font-display font-bold text-xl">{companyInfo.name}</h3>
                <p className="text-sm text-gray-400">{companyInfo.subtitle}</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Chúng tôi cam kết đem đến sản phẩm trầm hương chất lượng cao, giá trị thực, 
              và dịch vụ tận tâm. Sơn Mộc Hương - nơi bạn tìm thấy sự an lành trong từng 
              món quà trầm hương tự nhiên.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-yellow-800 rounded-full flex items-center justify-center hover:bg-yellow-700 transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-yellow-800 rounded-full flex items-center justify-center hover:bg-yellow-700 transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-yellow-800 rounded-full flex items-center justify-center hover:bg-yellow-700 transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-yellow-800 rounded-full flex items-center justify-center hover:bg-yellow-700 transition-colors">
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Liên kết nhanh</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-yellow-400 transition-colors">Trang chủ</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-yellow-400 transition-colors">Sản phẩm</Link></li>
              <li><Link to="/cart" className="text-gray-400 hover:text-yellow-400 transition-colors">Giỏ hàng</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors">Liên hệ</Link></li>
              <li><Link to="/admin" className="text-gray-400 hover:text-yellow-400 transition-colors">Quản trị</Link></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Hỗ trợ</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Chính sách bảo hành</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Hướng dẫn sử dụng</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Chính sách đổi trả</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Câu hỏi thường gặp</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Tư vấn chuyên nghiệp</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 {companyInfo.name}. Tất cả quyền được bảo lưu. | 
            <a href="#" className="text-yellow-400 hover:text-yellow-300 ml-1">Chính sách bảo mật</a> | 
            <a href="#" className="text-yellow-400 hover:text-yellow-300 ml-1">Điều khoản sử dụng</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;