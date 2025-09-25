// packages/basket/src/App.js
// React Router v6 Setup ohne useHistory. History kommt als Prop.

import React, { useEffect, useState } from 'react';
import { Router, Routes, Route } from 'react-router-dom';
import BasketList from './components/BasketList';

export default function BasketApp({ history, items, onRemove, onClear }) {
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
        <Route
          path="/cart"
          element={<BasketList items={items} onRemove={onRemove} onClear={onClear} />}
        />
        <Route
          path="*"
          element={<BasketList items={items} onRemove={onRemove} onClear={onClear} />}
        />
      </Routes>
    </Router>
  );
}
