// Mock data for the incense e-commerce store

export const products = [
  {
    id: 'vongtay',
    title: 'Vòng Tay Trầm Hương',
    price: { min: 500000, max: 2500000 },
    priceDisplay: '500.000đ - 2.500.000đ',
    description: 'Vòng tay trầm hương tự nhiên từ vùng Khánh Hòa nổi tiếng, được chế tác từ những mảnh trầm hương nguyên chất có tuổi đời hàng chục năm.',
    category: 'Vòng tay',
    stock: 50,
    rating: 5,
    reviewCount: 89,
    sizes: ['12mm', '14mm', '16mm', '18mm', '20mm'],
    images: [
      'https://hoiquanlacphuc.com/upload/baiviet/z372173166921965a4464bcc4d772517719165b322e6ec-288.jpg',
      'https://tramhuongannhien.vn/wp-content/uploads/2024/05/vong-tay-tram-huong-8mm-hat-tron-cao-cap-vt8cc-4.jpg',
      'https://tramhuongviet.com/wp-content/uploads/2023/05/vong-tram-huong-vt135.webp'
    ],
    badge: 'Bán chạy',
    badgeColor: 'green'
  },
  {
    id: 'nhang',
    title: 'Nhang Trầm Hương',
    price: { min: 150000, max: 800000 },
    priceDisplay: '150.000đ - 800.000đ',
    description: 'Nhang trầm hương cao cấp được sản xuất từ bột trầm hương nguyên chất Quảng Nam, không pha tạp chất.',
    category: 'Nhang',
    stock: 100,
    rating: 5,
    reviewCount: 125,
    sizes: ['Hộp 50 cây', 'Hộp 100 cây', 'Hộp 200 cây', 'Thùng 1000 cây'],
    images: [
      'https://tramhuongthientam.com/uploads/product/nhang_tr%E1%BA%A7m_h%C6%B0%C6%A1ng_cao_c%E1%BA%A5p_2_-_30cm.jpg',
      'https://banthoanphat.vn/uploads/san-pham/tram_huong/TH_0005/huong-nhang-tram-tu-nhien-viet-nam-cao-cap-th0005-2.jpg',
      'https://tramhuongthienviet.vn/wp-content/uploads/2013/08/z3420375093965_2ecc833a672c3a254f6e9d70fb6ce048.jpg'
    ],
    badge: 'Cao cấp',
    badgeColor: 'blue'
  },
  {
    id: 'luxong',
    title: 'Lư Xông Trầm Cao Cấp',
    price: { min: 300000, max: 1500000 },
    priceDisplay: '300.000đ - 1.500.000đ',
    description: 'Lư xông trầm được chế tác từ gốm sứ cao cấp với thiết kế tinh xảo, kết hợp giữa nét truyền thống và hiện đại.',
    category: 'Phụ kiện',
    stock: 30,
    rating: 5,
    reviewCount: 67,
    sizes: ['Size S (8cm)', 'Size M (12cm)', 'Size L (16cm)', 'Size XL (20cm)'],
    images: [
      'https://tramhuonghudo.com/uploads/05-2022/348k.jpg',
      'https://thienantram.com/wp-content/uploads/2022/01/lu-xong-tram-huong-gom-su-hoa-van-9.jpg',
      'https://anthienhuong.com/wp-content/uploads/2024/05/20.png'
    ],
    badge: 'Thủ công',
    badgeColor: 'purple'
  },
  {
    id: 'tramnguyenchat',
    title: 'Trầm Hương Nguyên Chất',
    price: { min: 1000000, max: 50000000 },
    priceDisplay: '1.000.000đ - 50.000.000đ',
    description: 'Những mảnh trầm hương Kỳ Nam quý hiếm được khai thác từ những cây dó bầu cổ thụ có tuổi đời hàng trăm năm.',
    category: 'Trầm nguyên chất',
    stock: 10,
    rating: 5,
    reviewCount: 45,
    sizes: ['5g', '10g', '20g', '50g', '100g'],
    images: [
      'https://tramhuongcaocap.vn/wp-content/uploads/2024/06/vong-tay-tram-huong-rung-tu-nhien-lakhesis-1.jpg',
      'https://tramhuongquangnam.com/wp-content/uploads/2022/07/VIET13-scaled.jpg',
      'https://hoiquanlacphuc.com/upload/baiviet/z3721732150905d66174dcb43e7c31c06f50d3b73a51f5-1021.jpg'
    ],
    badge: 'Quý hiếm',
    badgeColor: 'yellow'
  },
  {
    id: 'tinhdau',
    title: 'Tinh Dầu Trầm Hương',
    price: { min: 200000, max: 3000000 },
    priceDisplay: '200.000đ - 3.000.000đ',
    description: 'Tinh dầu trầm hương nguyên chất 100% được chiết xuất từ gỗ trầm hương cao cấp bằng phương pháp chưng cất hiện đại.',
    category: 'Tinh dầu',
    stock: 25,
    rating: 5,
    reviewCount: 93,
    sizes: ['5ml', '10ml', '20ml', '50ml', '100ml'],
    images: [
      'https://hoiquanlacphuc.com/upload/baiviet/td021-2843.jpg',
      'https://tramhuonghudo.com/uploads/08-2024/z5691306832945_bf08741837e8a13a74e2fbbd19f1f39e.jpg',
      'https://agarvina.vn/wp-content/uploads/2024/01/Tinh-dau-Tram-Huong-nguyen-chat-loai-A-Pure-Agarwood-oiloud-Grade-A.png'
    ],
    badge: 'Thiên nhiên',
    badgeColor: 'green'
  },
  {
    id: 'tuongphongthuy',
    title: 'Tượng Phong Thủy Trầm',
    price: { min: 2000000, max: 20000000 },
    priceDisplay: '2.000.000đ - 20.000.000đ',
    description: 'Tượng Phật, Quan Âm, Phúc Lộc Thọ được điêu khắc tinh xảo từ gỗ trầm hương cao cấp.',
    category: 'Phong thủy',
    stock: 15,
    rating: 5,
    reviewCount: 34,
    sizes: ['Cao 15cm', 'Cao 20cm', 'Cao 30cm', 'Cao 50cm'],
    images: [
      'https://tramhuongannhien.vn/wp-content/uploads/2025/05/vong-tay-tram-huong-chim-nuoc-10mm-5.jpg',
      'https://tramhuongannhien.vn/wp-content/uploads/2020/03/tinh-dau-tram-huong-thuong-hang-2.jpg',
      'https://product.hstatic.net/1000069526/product/tram-chim-viet_90122e819a2b446594200307bf2d21e5_master.jpg'
    ],
    badge: 'Phong thủy',
    badgeColor: 'red'
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Chị Lan Anh',
    location: 'TP. Hồ Chí Minh',
    rating: 5,
    comment: 'Vòng tay trầm hương ở đây chất lượng tuyệt vời, mùi hương rất thơm và tự nhiên. Tôi đã mua làm quà tặng và được nhiều người khen ngợi.'
  },
  {
    id: 2,
    name: 'Anh Minh Tuấn',
    location: 'Hà Nội',
    rating: 5,
    comment: 'Nhang trầm của Sơn Mộc Hương giúp tôi thư giãn sau những ngày làm việc căng thẳng. Mùi hương thanh tịnh, không gây khói nhiều.'
  },
  {
    id: 3,
    name: 'Cô Thanh Hà',
    location: 'Đà Nẵng',
    rating: 5,
    comment: 'Dịch vụ tư vấn rất tận tình, sản phẩm chất lượng cao. Tôi đã giới thiệu cho nhiều bạn bè và ai cũng hài lòng với chất lượng.'
  }
];

export const companyInfo = {
  name: 'Sơn Mộc Hương',
  subtitle: 'Trầm Hương Cao Cấp Việt Nam',
  phone: '0762 222 448',
  email: 'sonmochuong@gmail.com',
  address: '3/29E đường 182, Phường Tăng Nhơn Phú A, TP. Thủ Đức, TPHCM',
  workingHours: 'Thứ 2 - Chủ nhật: 8:00 - 22:00',
  whatsapp: '84762222448',
  features: [
    {
      icon: 'certificate',
      title: 'Chất lượng đảm bảo',
      description: 'Nguyên liệu 100% tự nhiên'
    },
    {
      icon: 'shipping-fast',
      title: 'Giao hàng nhanh',
      description: 'Toàn quốc trong 24h'
    },
    {
      icon: 'medal',
      title: 'Uy tín hàng đầu',
      description: 'Được khách hàng tin tưởng'
    },
    {
      icon: 'headset',
      title: 'Hỗ trợ 24/7',
      description: 'Tư vấn chuyên nghiệp'
    }
  ]
};

// Mock orders for admin
export const mockOrders = [
  {
    id: 'DH001',
    customerName: 'Nguyễn Văn A',
    customerPhone: '0901234567',
    customerEmail: 'nguyenvana@email.com',
    customerAddress: '123 Đường ABC, Quận 1, TP.HCM',
    items: [
      { productId: 'vongtay', title: 'Vòng Tay Trầm Hương', size: '16mm', quantity: 1, price: 1500000 }
    ],
    paymentMethod: 'cod',
    totalAmount: 1500000,
    status: 'pending',
    createdAt: new Date().toISOString(),
    notes: 'Giao hàng buổi chiều'
  },
  {
    id: 'DH002',
    customerName: 'Trần Thị B',
    customerPhone: '0907654321',
    customerEmail: 'tranthib@email.com',
    customerAddress: '456 Đường DEF, Quận 3, TP.HCM',
    items: [
      { productId: 'nhang', title: 'Nhang Trầm Hương', size: 'Hộp 100 cây', quantity: 2, price: 400000 }
    ],
    paymentMethod: 'bank_transfer',
    totalAmount: 800000,
    status: 'confirmed',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    notes: ''
  }
];

export const getBadgeColor = (color) => {
  const colors = {
    green: 'bg-green-100 text-green-800',
    blue: 'bg-blue-100 text-blue-800',
    purple: 'bg-purple-100 text-purple-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800'
  };
  return colors[color] || 'bg-gray-100 text-gray-800';
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
};