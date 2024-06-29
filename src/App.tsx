import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/pages/Header';
import Footer from './components/pages/Footer';
import Loading from './components/Loading';
import { AlertProvider } from './components/AlertsProvider';

const HomePage = lazy(() => import('./components/pages/HomePage'));
const ProductListPage = lazy(() => import('./components/pages/products/ProductListPage'));
const ProductDetailPage = lazy(() => import('./components/pages/products/ProductDetails'));
const CartPage = lazy(() => import('./components/pages/carts/CartPage'));
const CheckoutPage = lazy(() => import('./components/pages/checkout/CheckoutPage'));
const UserAccountPage = lazy(() => import('./components/pages/accounts/UserAccountsPage'));
const LoginPage = lazy(() => import('./components/pages/accounts/LoginPage'))
const SignUpPage = lazy(() => import('./components/pages/accounts/SignUpPage'))

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <AlertProvider>
        <div className="flex flex-col min-h-screen">
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
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