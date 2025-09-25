import React, { lazy, Suspense, useState, useCallback } from 'react';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';

import Progress from './components/Progress';
import Header from './components/Header';

// Vorhandene MFEs
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

// 👇 NEU: unsere Wrapper für Products & Basket (MFE-Adapter)
const ProductsLazy = lazy(() => import('./components/ProductsApp'));
const BasketLazy = lazy(() => import('./components/BasketApp'));

/**
 * App (Innenleben mit v6 useNavigate)
 * - hält Auth-Status (isSignedIn)
 * - hält Warenkorb-State (cartItems)
 * - definiert Routen: /auth, /dashboard, /shop, /cart, /
 */
const AppInner = () => {
  // ---------- Auth-Zustand ----------
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  // Wird vom Auth-MFE (via Prop) aufgerufen, wenn Login erfolgreich war
  const handleSignIn = useCallback(() => {
    setIsSignedIn(true);
    navigate('/dashboard'); // nach Login ins Dashboard
  }, [navigate]);

  // ---------- Warenkorb-Zustand im Container ----------
  const [cartItems, setCartItems] = useState([]);

  // Produkt hinzufügen (aus Products-MFE via Callback)
  const addToCart = useCallback((product) => {
    setCartItems((prev) => [...prev, product]);
  }, []);

  // Produkt entfernen (aus Basket-MFE via Callback)
  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // Warenkorb leeren (aus Basket-MFE via Callback)
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <div>
        {/* Header erhält optional cartCount, zeigt Badge bei /cart */}
        <Header
          isSignedIn={isSignedIn}
          onSignOut={() => setIsSignedIn(false)}
          cartCount={cartItems.length}
        />

        <Suspense fallback={<Progress />}>
          <Routes>
            {/* AUTH (MFE) – gibt handleSignIn als Prop rein */}
            <Route
              path="/auth/*"
              element={<AuthLazy onSignIn={handleSignIn} />}
            />

            {/* DASHBOARD (MFE) – geschützt */}
            <Route
              path="/dashboard"
              element={isSignedIn ? <DashboardLazy /> : <Navigate to="/" />}
            />

            {/* 👇 NEU: SHOP (PRODUCTS-MFE) – Container übergibt addToCart */}
            <Route
              path="/shop/*"
              element={<ProductsLazy onAddToCart={addToCart} />}
            />

            {/* 👇 NEU: CART (BASKET-MFE) – Container übergibt items + Aktionen */}
            <Route
              path="/cart/*"
              element={
                <BasketLazy
                  items={cartItems}
                  onRemove={removeFromCart}
                  onClear={clearCart}
                />
              }
            />

            {/* MARKETING (MFE) – Fallback */}
            <Route path="/*" element={<MarketingLazy />} />
          </Routes>
        </Suspense>
      </div>
    </StyledEngineProvider>
  );
};

/**
 * Root-Export:
 * - Kapselt AppInner im BrowserRouter (v6)
 * - Wichtig: BrowserRouter muss ganz außen sitzen
 */
export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
