import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/pages/Header';
import Footer from './components/pages/Footer';
import Loading from './components/Loading';
import { AlertProvider } from './components/AlertsProvider';
import { AuthService } from './services/users/users.service';

const HomePage = lazy(() => import('./components/pages/HomePage'));
const ProductListPage = lazy(() => import('./components/pages/products/ProductListPage'));
const ProductDetailPage = lazy(() => import('./components/pages/products/ProductDetails'));
const CartPage = lazy(() => import('./components/pages/carts/CartPage'));
const CheckoutPage = lazy(() => import('./components/pages/checkout/CheckoutPage'));
const UserAccountPage = lazy(() => import('./components/pages/accounts/UserAccountsPage'));
const LoginPage = lazy(() => import('./components/pages/accounts/LoginPage'));
const SignUpPage = lazy(() => import('./components/pages/accounts/SignUpPage'));
const RoleManagementPage = lazy(() => import('./components/pages/admin/RoleManagementPage'));

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRoles, setUserRoles] = useState<string[]>([]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const user = await AuthService.getUser();
        setIsLoggedIn(true);
        setUserRoles(user.roles.map(role => role.name));
        console.log('User roles:', user.roles);
      } catch (error) {
        setIsLoggedIn(false);
        setUserRoles([]);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const isSuperAdmin = userRoles.includes('SUPERADMIN');
  console.log('Is super admin:', isSuperAdmin);

  return (
    <Router>
      <AlertProvider>
        <div className="flex flex-col min-h-screen">
        <Header 
            isLoggedIn={isLoggedIn} 
            setIsLoggedIn={setIsLoggedIn} 
            isSuperAdmin={isSuperAdmin}
            userRoles={userRoles}
          />
          <main className="flex-grow">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductListPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route 
                  path="/checkout" 
                  element={isLoggedIn ? <CheckoutPage /> : <Navigate to="/login" replace />} 
                />
                <Route 
                  path="/account" 
                  element={isLoggedIn ? <UserAccountPage /> : <Navigate to="/login" replace />} 
                />
                <Route 
                  path="/login" 
                  element={!isLoggedIn ? <LoginPage setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/account" replace />} 
                />
                <Route 
                  path="/signup" 
                  element={!isLoggedIn ? <SignUpPage setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/account" replace />} 
                />
                <Route 
                  path="/admin/roles" 
                  element={
                    isLoggedIn && isSuperAdmin 
                      ? <RoleManagementPage /> 
                      : <Navigate to="/" replace />
                  } 
                />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </AlertProvider>
    </Router>
  );
};

export default App;