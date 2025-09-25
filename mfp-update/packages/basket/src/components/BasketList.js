// packages/basket/src/components/BasketList.js
// Zweck: Anzeige der Warenkorb-Artikel mit "Entfernen" & "Leeren"-Aktionen.
// - "items" kommt vom Container
// - "onRemove(id)" und "onClear()" ruft der Container durch (ändert den Container-State)
// - Zeigt Summe an

import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';

export default function BasketList({ items = [], onRemove, onClear }) {
  const total = items.reduce((sum, p) => sum + (p.price || 0), 0);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Warenkorb
      </Typography>

      {items.length === 0 ? (
        <Typography variant="body1">Der Warenkorb ist leer.</Typography>
      ) : (
        <>
          {items.map((p) => (
            <Card key={p.id} sx={{ mb: 2 }}>
              <CardContent
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography>
                  <strong>{p.title}</strong> — {p.price?.toFixed(2)} €
                </Typography>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => onRemove && onRemove(p.id)}
                >
                  Entfernen
                </Button>
              </CardContent>
            </Card>
          ))}

          <Box
            sx={{
              mt: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="subtitle1">
              Summe: <strong>{total.toFixed(2)} €</strong>
            </Typography>

            <Button
              variant="contained"
              color="warning"
              onClick={() => onClear && onClear()}
            >
              Warenkorb leeren
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
