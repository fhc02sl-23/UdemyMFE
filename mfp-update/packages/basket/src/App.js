// packages/basket/src/App.js
// Zweck: Kleine Shell für das Basket-MFE (React Router v6).
// - Bekommt "history" (Memory- oder Browser-History) aus bootstrap.js
// - Synct location per history.listen
// - Rendert unter "/cart" die Warenkorb-Liste (BasketList)
// - Props vom Container: items (Array), onRemove (id) und onClear()

import React, { useEffect, useState } from 'react';
import { Router, Routes, Route } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import BasketList from './components/BasketList';

/**
 * Props (vom bootstrap gesetzt):
 * - history: History-Objekt (Memory im Container, Browser im Dev-Standalone)
 * - items:   Array von Produkten [{id, title, price}, ...]
 * - onRemove: (id: number) => void   // Einzelnen Artikel entfernen
 * - onClear:  () => void             // Warenkorb leeren
 */
export default function App({ history, items, onRemove, onClear }) {
  // Lokale "sichtbare" Location, damit Router v6 mit der externen history zusammenspielt
  const [location, setLocation] = useState(history.location);

  useEffect(() => {
    // Auf History-Änderungen hören -> Router-Location updaten
    const unlisten = history.listen((update) => {
      setLocation(update.location);
    });
    return unlisten;
  }, [history]);

  return (
    <StyledEngineProvider injectFirst>
      <Router location={location} navigator={history}>
        <Routes>
          {/* Hauptseite des Carts */}
          <Route
            path="/cart"
            element={
              <BasketList
                items={items}
                onRemove={onRemove}
                onClear={onClear}
              />
            }
          />
          {/* Fallback: falls "/" oder irgendwas anderes → ebenfalls Cart zeigen */}
          <Route
            path="*"
            element={
              <BasketList
                items={items}
                onRemove={onRemove}
                onClear={onClear}
              />
            }
          />
        </Routes>
      </Router>
    </StyledEngineProvider>
  );
}
