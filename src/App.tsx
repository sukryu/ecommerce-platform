import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/pages/Header';
import Footer from './components/pages/Footer';
import Loading from './components/Loading';
import { AlertProvider } from './components/AlertsProvider';
import ProtectedRoute from './components/ProtectedRoutes';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { checkAuthStatus } from './store/slices/authSlice';

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

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => !!state.auth.user);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductListPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route 
                path="/checkout" 
                element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/account" 
                element={
                  <ProtectedRoute>
                    <UserAccountPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute allowedRoles={['SUPERADMIN', 'ADMIN']}>
                    <AdminDashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/users" 
                element={
                  <ProtectedRoute allowedRoles={['SUPERADMIN', 'ADMIN']}>
                    <UserManagementPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/roles" 
                element={
                  <ProtectedRoute allowedRoles={['SUPERADMIN', 'ADMIN']}>
                    <RoleManagementPage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AlertProvider>
        <AppContent />
      </AlertProvider>
    </Provider>
  );
};

export default App;