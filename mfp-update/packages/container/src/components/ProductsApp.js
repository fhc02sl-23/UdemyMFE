// packages/container/src/components/ProductsApp.js
// Zweck: Adapter/Wrapper für das PRODUCTS-MFE, exakt wie Marketing/Auth.
// - Erstellt ein <div ref> als Mount-Punkt
// - Ruft products.mount(ref.current, options)
// - Synchronisiert Routing (onNavigate / onParentNavigate)
// - Übergibt "onAddToCart" Callback (Container-State-Funktion) ans MFE

import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// Import der federierten Mount-Funktion aus dem products-MFE
import { mount as mountProducts } from 'products/ProductsApp';

export default function ProductsApp({ onAddToCart }) {
  // (1) DOM-Container bereitstellen
  const ref = useRef(null);
  // (2) Browser-History vom Container
  const history = useHistory();

  useEffect(() => {
    // (3) MFE mounten + Optionen übergeben
    const { onParentNavigate } = mountProducts(ref.current, {
      // Startpfad: Container-URL → MFE-MemoryHistory
      initialPath: history.location.pathname,
      // Wenn MFE navigiert (z. B. /shop), dann Browser-URL anpassen
      onNavigate: ({ pathname }) => {
        if (history.location.pathname !== pathname) {
          history.push(pathname);
        }
      },
      // Wichtig: Callback für "In den Warenkorb"
      onAddToCart, // => Container reicht seine Funktion 1:1 ins MFE
    });

    // (4) Container → MFE: Browser-URL-Wechsel (Back/Forward)
    const unlisten = history.listen(onParentNavigate);
    return unlisten;
  }, [history, onAddToCart]);

  // (5) Mount-Punkt für das MFE
  return <div ref={ref} />;
}
