import React, { useState } from 'react';
import { companyInfo } from '../data/mockData';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Save to localStorage (simulate backend)
    const contacts = JSON.parse(localStorage.getItem('son-moc-huong-contacts') || '[]');
    contacts.push({
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('son-moc-huong-contacts', JSON.stringify(contacts));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', phone: '', email: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-800 to-orange-800 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Liên Hệ <span className="text-yellow-200">Với Chúng Tôi</span>
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Chúng tôi luôn sẵn sàng tư vấn và hỗ trợ bạn chọn lựa sản phẩm trầm hương phù hợp nhất
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-3xl font-bold text-gray-800 mb-8">
                  Thông tin liên hệ
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-yellow-800 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-map-marker-alt text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Địa chỉ</h3>
                      <p className="text-gray-600 leading-relaxed">{companyInfo.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-yellow-800 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-phone text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Điện thoại</h3>
                      <p className="text-gray-600 text-lg font-semibold">{companyInfo.phone}</p>
                      <p className="text-sm text-gray-500">Hotline 24/7 - Tư vấn miễn phí</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-yellow-800 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-envelope text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
                      <p className="text-gray-600">{companyInfo.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-yellow-800 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-clock text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Giờ làm việc</h3>
                      <p className="text-gray-600">{companyInfo.workingHours}</p>
                      <p className="text-sm text-gray-500">Hỗ trợ online 24/7</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-lg text-gray-800 mb-4">Liên hệ nhanh</h3>
                <div className="space-y-3">
                  <a 
                    href={`tel:${companyInfo.phone}`}
                    className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <i className="fas fa-phone text-green-600 mr-3"></i>
                    <span className="font-medium text-green-800">Gọi điện ngay</span>
                  </a>
                  
                  <a 
                    href={`https://wa.me/${companyInfo.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <i className="fab fa-whatsapp text-green-600 mr-3"></i>
                    <span className="font-medium text-green-800">Chat WhatsApp</span>
                  </a>
                  
                  <a 
                    href={`mailto:${companyInfo.email}`}
                    className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <i className="fas fa-envelope text-blue-600 mr-3"></i>
                    <span className="font-medium text-blue-800">Gửi email</span>
                  </a>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                {companyInfo.features.map((feature, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-4 text-center">
                    <div className="w-12 h-12 bg-yellow-800 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className={`fas fa-${feature.icon} text-white`}></i>
                    </div>
                    <h4 className="font-semibold text-gray-800 text-sm mb-1">{feature.title}</h4>
                    <p className="text-xs text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="font-display text-2xl font-bold text-gray-800 mb-6">Gửi tin nhắn</h3>
              
              {isSubmitted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center text-green-800">
                    <i className="fas fa-check-circle mr-2"></i>
                    <span className="font-medium">Tin nhắn đã được gửi thành công!</span>
                  </div>
                  <p className="text-green-700 text-sm mt-1">Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                    placeholder="Nhập email (không bắt buộc)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nội dung tin nhắn <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Nhập nội dung tin nhắn của bạn..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-lg font-semibold transition-all ${
                    isSubmitting
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-yellow-800 text-white hover:bg-yellow-700 transform hover:scale-105'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane mr-2"></i>
                      Gửi tin nhắn
                    </>
                  )}
                </button>
              </form>

              {/* Contact Note */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <i className="fas fa-info-circle mr-2"></i>
                  <strong>Lưu ý:</strong> Chúng tôi sẽ phản hồi tin nhắn của bạn trong vòng 24 giờ. 
                  Để được hỗ trợ nhanh hơn, vui lòng gọi điện trực tiếp theo số hotline.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;