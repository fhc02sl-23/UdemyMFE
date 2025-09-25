// packages/basket/src/bootstrap.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

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
      onNavigate({ pathname: update.location.pathname });
    });
  }

  const root = createRoot(el);

  // 🔧 Wir halten die aktuellsten Props lokal
  let current = { items, onRemove, onClear };

  const render = () => {
    root.render(
      <App
        history={history}
        items={current.items}
        onRemove={current.onRemove}
        onClear={current.onClear}
      />
    );
  };

  // initialer Render
  render();

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },

    // 🔧 NEU: vom Container aufrufbar, um Props nachträglich zu aktualisieren
    update(next = {}) {
      current = { ...current, ...next };
      render();
    },
  };
};

if (process.env.NODE_ENV === 'development') {
  const devRoot =
    document.querySelector('#_basket-dev_root') ||
    document.querySelector('#_basket-dev-root');
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };
