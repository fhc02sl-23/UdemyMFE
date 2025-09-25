// packages/container/src/components/ProductsApp.js
// Wrapper für das Products-MFE (React Router v6-kompatibel):
// - mount() des Remotes aufrufen
// - MFE -> Container: onNavigate
// - Container -> MFE: onParentNavigate
// - KEIN useHistory (das gibt es in v6 nicht)

import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { mount as mountProducts } from 'products/ProductsApp';

export default function ProductsApp({ onAddToCart }) {
  const ref = useRef(null);                 // div, in das das MFE rendert
  const location = useLocation();           // aktuelle Browser-URL
  const navigate = useNavigate();           // zum Navigieren im Container
  const onParentNavigateRef = useRef(null); // wird vom MFE geliefert

  // 1) MFE einmal mounten
  useEffect(() => {
    const { onParentNavigate } = mountProducts(ref.current, {
      initialPath: location.pathname,       // MFE startet auf aktueller URL
      onNavigate: ({ pathname }) => {       // MFE meldet interne Navigation
        if (location.pathname !== pathname) {
          navigate(pathname);
        }
      },
      onAddToCart,                          // Callback vom Container nach unten durchreichen
    });

    onParentNavigateRef.current = onParentNavigate;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // nur beim ersten Rendern

  // 2) Wenn sich die Browser-URL ändert (Back/Forward), MFE nachziehen
  useEffect(() => {
    if (onParentNavigateRef.current) {
      onParentNavigateRef.current({ pathname: location.pathname });
    }
  }, [location]);

  return <div ref={ref} />;
}
