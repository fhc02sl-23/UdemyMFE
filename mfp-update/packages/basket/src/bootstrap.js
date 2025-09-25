// packages/basket/src/bootstrap.js
// Zweck: Startpunkt für das Basket-MFE.
// - Definiert mount(el, options), das vom Container aufgerufen wird
// - Stellt History ein (Memory im Container, Browser im Dev-Standalone)
// - Synchronisiert Routing Container <-> MFE
// - Rendert App mit Items + Callbacks vom Container

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createMemoryHistory, createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import App from './App';

/**
 * mount(el, options)
 * @param {HTMLElement} el - DOM-Element, in das das Basket-MFE gerendert wird
 * @param {Object} options:
 *  - defaultHistory?: History       -> für Standalone-Dev
 *  - initialPath?: string           -> Startpfad vom Container
 *  - onNavigate?: (loc) => void     -> Callback MFE -> Container (Route-Änderungen)
 *  - items?: Array                  -> Produkte vom Container
 *  - onRemove?: (id) => void        -> Produkt entfernen
 *  - onClear?: () => void           -> Warenkorb leeren
 */
const mount = (
  el,
  { onNavigate, defaultHistory, initialPath, items = [], onRemove, onClear } = {}
) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath || '/cart'],
    });

  if (onNavigate) {
    history.listen((update) => {
      const nextPathname = update.location.pathname;
      onNavigate({ pathname: nextPathname });
    });
  }

  const root = createRoot(el);
  root.render(
    <Router history={history} location={history.location} navigator={history}>
      <App history={history} items={items} onRemove={onRemove} onClear={onClear} />
    </Router>
  );

  return {
    onParentNavigate({ pathname: containerPathname }) {
      const { pathname } = history.location;
      if (pathname !== containerPathname) {
        history.push(containerPathname);
      }
    },
  };
};

// Standalone-Dev: Direkt mounten mit BrowserHistory
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_basket-dev-root');
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// Export für Container
export { mount };
