import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/pages/Header';
import Footer from './components/pages/Footer';
import Loading from './components/Loading';
import { AlertProvider } from './components/AlertsProvider';
import {useAuth } from './hooks/useAuth';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoutes';

const HomePage = lazy(() => import('./components/pages/HomePage'));
const ProductListPage = lazy(() => import('./components/pages/products/ProductListPage'));
const ProductDetailPage = lazy(() => import('./components/pages/products/ProductDetails'));
const CartPage = lazy(() => import('./components/pages/carts/CartPage'));
const CheckoutPage = lazy(() => import('./components/pages/checkout/CheckoutPage'));
const UserAccountPage = lazy(() => import('./components/pages/accounts/UserAccountsPage'));
const LoginPage = lazy(() => import('./components/pages/accounts/LoginPage'));
const SignUpPage = lazy(() => import('./components/pages/accounts/SignUpPage'));
const AdminDashboardPage = lazy(() => import('./components/pages/admin/AdminDashboardPage'));
const UserManagementPage = lazy(() => import('./components/pages/admin/UserManagementPage'));
const RoleManagementPage = lazy(() => import('./components/pages/admin/RoleManagementPage'));

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AlertProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductListPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<ProtectedRoute element={<CheckoutPage />} />} />
                  <Route path="/account" element={<ProtectedRoute element={<UserAccountPage />} />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/admin" element={<ProtectedRoute element={<AdminDashboardPage />} allowedRoles={['SUPERADMIN', 'ADMIN']} />} />
                  <Route path="/admin/users" element={<ProtectedRoute element={<UserManagementPage />} allowedRoles={['SUPERADMIN', 'ADMIN']} />} />
                  <Route path="/admin/roles" element={<ProtectedRoute element={<RoleManagementPage />} allowedRoles={['SUPERADMIN', 'ADMIN']} />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </AlertProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;