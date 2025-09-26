// packages/products/src/App.js
// React Router v6 ohne useHistory:
// Wir bekommen eine History-Instanz als Prop und binden sie an <Router location/navigator>.

import React, { useEffect, useState } from 'react';
import { Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';

export default function ProductsApp({ history, onAddToCart }) {
  // Router v6 erwartet eine Location → spiegeln wir aus history
  const [location, setLocation] = useState(history.location);

  useEffect(() => {
    const unlisten = history.listen((update) => {
      setLocation(update.location);
    });
    return unlisten;
  }, [history]);

  return (
    <Router location={location} navigator={history}>
      <Routes>
        {/* Haupt-Route dieses MFEs */}
        <Route path="/shop" element={<ProductList onAddToCart={onAddToCart} />} />
        {/* Fallback */}
        <Route path="*" element={<ProductList onAddToCart={onAddToCart} />} />
      </Routes>
    </Router>
  );
}
