// packages/container/src/components/BasketApp.js
import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { mount as mountBasket } from 'basket/BasketApp';

export default function BasketApp({ items, onRemove, onClear }) {
  const ref = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const apiRef = useRef(null); // <- hier merken wir uns die MFE-API (onParentNavigate, update)

  // 1) einmal mounten
  useEffect(() => {
    const api = mountBasket(ref.current, {
      initialPath: location.pathname,
      onNavigate: ({ pathname }) => {
        if (location.pathname !== pathname) {
          navigate(pathname);
        }
      },
      items,
      onRemove,
      onClear,
    });

    apiRef.current = api; // { onParentNavigate, update }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // nur einmal mounten

  // 2) Container-URL -> MFE nachziehen
  useEffect(() => {
    apiRef.current?.onParentNavigate?.({ pathname: location.pathname });
  }, [location]);

  // 3) 🔧 WICHTIG: Props-Änderungen an das MFE pushen
  useEffect(() => {
    apiRef.current?.update?.({ items, onRemove, onClear });
  }, [items, onRemove, onClear]);

  return <div ref={ref} />;
}
