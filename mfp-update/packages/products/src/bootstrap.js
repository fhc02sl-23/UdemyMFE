// Zweck dieses Files:
// - exportiert die mount(el, options)-Funktion für den Container
// - kümmert sich um History/Router (Memory im eingebetteten Betrieb, Browser im Standalone-Dev)
// - synchronisiert Routen: MFE -> Container (onNavigate) und Container -> MFE (onParentNavigate)
// - reicht den Callback onAddToCart vom Container in die App durch

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createMemoryHistory, createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import App from './App';

/**
 * mount(el, options)
 * @param {HTMLElement} el - DOM-Container, in den das MFE gerendert wird
 * @param {Object} options
 *  - defaultHistory?: History   -> nur im Standalone-Dev (BrowserHistory)
 *  - initialPath?: string       -> Startpfad (vom Container übergeben)
 *  - onNavigate?: (loc) => void -> Callback: MFE teilt dem Container internen Routenwechsel mit
 *  - onAddToCart?: (product)    -> Callback: "In den Warenkorb" (kommt vom Container)
 * @returns {Object} API
 *  - onParentNavigate({ pathname }) -> Container teilt dem MFE Browser-URL-Änderungen mit
 */
const mount = (el, { onNavigate, defaultHistory, initialPath, onAddToCart } = {}) => {
  // 1) History wählen:
  // - Wenn defaultHistory vorhanden: Standalone-Dev -> BrowserHistory verwenden
  // - Sonst: eingebettet im Container -> MemoryHistory (mit initialPath)
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath || '/shop'], // falls Container keinen initialPath liefert
    });

  // 2) Wenn Container einen onNavigate-Callback übergeben hat,
  //    rufen wir ihn bei JEDER internen Navigation auf (MFE -> Container)
  if (onNavigate) {
    history.listen((update) => {
      const nextPathname = update.location.pathname;
      onNavigate({ pathname: nextPathname });
    });
  }

  // 3) React 18 Root erstellen und rendern
  const root = createRoot(el);
  root.render(
    <Router history={history}>
      {/* Wir geben den onAddToCart-Callback in die React-App weiter */}
      <App onAddToCart={onAddToCart} />
    </Router>
  );

  // 4) API an den Container zurückgeben:
  //    Container ruft das auf, wenn sich die Browser-URL ändert (Back/Forward)
  return {
    onParentNavigate({ pathname: containerPathname }) {
      const { pathname } = history.location;
      if (pathname !== containerPathname) {
        history.push(containerPathname); // MFE intern nachziehen
      }
    },
  };
};

// 5) Standalone-Entwicklung: Wenn direkt im Browser geöffnet (nicht im Container),
//    mounten wir sofort und nehmen BrowserHistory. WICHTIG: ID hier korrekt für PRODUCTS:
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_products-dev-root'); // ← eigene Dev-Root-ID
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// 6) Für den Container exportieren
export { mount };
