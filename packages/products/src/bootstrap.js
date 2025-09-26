// packages/products/src/bootstrap.js

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

const mount = (
  el,
  { onNavigate, defaultHistory, initialPath, onAddToCart } = {}
) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath || '/shop'],
    });

  if (onNavigate) {
    history.listen((update) => {
      onNavigate({ pathname: update.location.pathname });
    });
  }

  const root = createRoot(el);
  root.render(<App history={history} onAddToCart={onAddToCart} />);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_products-dev-root');
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };
