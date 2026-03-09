import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import ProfileData from './pages/profile/ProfileData';
import ProfileAddresses from './pages/profile/ProfileAddresses';
import ProfilePayment from './pages/profile/ProfilePayment';
import ProfileNotifications from './pages/profile/ProfileNotifications';
import ProfileCoupons from './pages/profile/ProfileCoupons';
import ProfileSupport from './pages/profile/ProfileSupport';
import ProfileSettings from './pages/profile/ProfileSettings';
import Admin from './pages/Admin';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderTracking from './pages/OrderTracking';
import Layout from './components/Layout';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<Orders />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/data" element={<ProfileData />} />
            <Route path="profile/addresses" element={<ProfileAddresses />} />
            <Route path="profile/payment" element={<ProfilePayment />} />
            <Route path="profile/notifications" element={<ProfileNotifications />} />
            <Route path="profile/coupons" element={<ProfileCoupons />} />
            <Route path="profile/support" element={<ProfileSupport />} />
            <Route path="profile/settings" element={<ProfileSettings />} />
            <Route path="admin" element={<Admin />} />
            <Route path="order-confirmation/:id" element={<OrderConfirmation />} />
            <Route path="order-tracking/:id" element={<OrderTracking />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}
