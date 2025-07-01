import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';

// Import components
import Header from './components/Header';
import Footer from './components/Footer';

// Import pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Contact from './pages/Contact';

// Import admin pages
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminOrders from './pages/admin/AdminOrders';

function App() {
  return (
    <div className="App">
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="products" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-800">Quản lý sản phẩm</h2><p className="text-gray-600 mt-2">Tính năng này sẽ được phát triển trong phiên bản tiếp theo</p></div>} />
              <Route path="contacts" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-800">Quản lý liên hệ</h2><p className="text-gray-600 mt-2">Tính năng này sẽ được phát triển trong phiên bản tiếp theo</p></div>} />
              <Route path="settings" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-800">Cài đặt hệ thống</h2><p className="text-gray-600 mt-2">Tính năng này sẽ được phát triển trong phiên bản tiếp theo</p></div>} />
            </Route>

            {/* Public Routes */}
            <Route path="/*" element={
              <>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success/:orderId" element={<OrderSuccess />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
                <Footer />
              </>
            } />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;