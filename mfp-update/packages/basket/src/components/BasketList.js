// packages/basket/src/components/BasketList.js
import React from 'react';

export default function BasketList({ items = [], onRemove, onClear }) {
  const total = items.reduce((sum, p) => sum + (p.price || 0), 0);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Warenkorb</h2>

      {items.length === 0 ? (
        <p>Der Warenkorb ist leer.</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {items.map((p) => (
              <li key={p.id} style={{ marginBottom: 8 }}>
                <strong>{p.title}</strong> — {p.price?.toFixed(2)} €
                <button
                  style={{ marginLeft: 12 }}
                  onClick={() => onRemove && onRemove(p.id)}
                >
                  Entfernen
                </button>
              </li>
            ))}
          </ul>

          <p>
            <strong>Summe:</strong> {total.toFixed(2)} €
          </p>

          <button onClick={() => onClear && onClear()}>
            Warenkorb leeren
          </button>
        </>
      )}
    </div>
  );
}
