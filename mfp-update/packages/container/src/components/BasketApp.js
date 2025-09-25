// packages/container/src/components/BasketApp.js
// Zweck: Adapter/Wrapper für das BASKET-MFE.
// - Mount-Punkt liefern
// - Routing synchronisieren
// - State vom Container zum MFE "schieben":
//   (a) beim Mount über options.getItems()
//   (b) Laufend via zurückgegebener API: setItems(items)

import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { mount as mountBasket } from 'basket/BasketApp';

export default function BasketApp({ items, onRemove, onClear }) {
  const ref = useRef(null);
  const history = useHistory();
  // Wir speichern die vom MFE gelieferte API (setItems) in einem Ref
  const apiRef = useRef({ setItems: null });

  useEffect(() => {
    const { onParentNavigate, setItems } = mountBasket(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname }) => {
        if (history.location.pathname !== pathname) {
          history.push(pathname);
        }
      },
      // Container-Aktionen an MFE
      onRemove, // Produkt entfernen
      onClear,  // Warenkorb leeren
      // Start-Daten: MFE kann initial lesen
      getItems: () => items,
    });

    // API merken, damit wir später bei State-Änderung updaten können
    apiRef.current.setItems = setItems;

    const unlisten = history.listen(onParentNavigate);
    return unlisten;
  }, []); // mount einmal

  // Wenn sich items ändern → MFE mit neuem Stand füttern
  useEffect(() => {
    if (apiRef.current.setItems) {
      apiRef.current.setItems(items);
    }
  }, [items]);

  return <div ref={ref} />;
}
