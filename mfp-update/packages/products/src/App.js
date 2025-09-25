// packages/products/src/components/App.js
// Zweck: Kleine Shell für das Products-MFE.
// Zeigt unter "/shop" die Produktübersicht an.

import React, { useState, useEffect } from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import ProductList from './ProductList';

export default function ProductsApp({ history, onAddToCart }) {
  const [location, setLocation] = useState(history.location);

  useEffect(() => {
    // History-Änderungen beobachten -> Router-Location updaten
    const unlisten = history.listen((update) => {
      setLocation(update.location);
    });
    return unlisten;
  }, [history]);

  return (
    <StyledEngineProvider injectFirst>
      <Router location={location} navigator={history}>
        <Routes>
          {/* Hauptseite des Shops */}
          <Route
            path="/shop"
            element={<ProductList onAddToCart={onAddToCart} />}
          />
          {/* Fallback: wenn "/" oder unbekannt -> auch Shop zeigen */}
          <Route
            path="*"
            element={<ProductList onAddToCart={onAddToCart} />}
          />
        </Routes>
      </Router>
    </StyledEngineProvider>
  );
}
