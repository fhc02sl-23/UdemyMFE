// packages/products/src/components/ProductList.js
// Zweck: Hartkodierte Produktübersicht. Klick -> Container-State wächst.

import React from 'react';

const PRODUCTS = [
  { id: 1, title: 'Cupcake', price: 5.0 },
  { id: 2, title: 'Donut',   price: 3.0 },
  { id: 3, title: 'Cookie',  price: 2.5 },
  { id: 4, title: 'Brownie', price: 4.0 },
];

export default function ProductList({ onAddToCart }) {
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Shop</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {PRODUCTS.map((p) => (
          <li key={p.id} style={{ marginBottom: 8 }}>
            <strong>{p.title}</strong> — {p.price.toFixed(2)} €
            <button
              style={{ marginLeft: 12 }}
              onClick={() => onAddToCart && onAddToCart(p)}
            >
              In den Warenkorb
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
