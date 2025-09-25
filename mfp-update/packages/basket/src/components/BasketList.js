// packages/basket/src/components/BasketList.js
import React from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import BasketCard from './BasketCard';

export default function BasketList({ items = [], onRemove, onClear }) {
  const total = items.reduce((sum, p) => sum + (p.price || 0), 0);

  return (
    <Box sx={{ px: 3, py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Portfolio
      </Typography>

      {items.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No positions yet. Add assets from <strong>Markets</strong>.
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {items.map((p) => (
              <Grid item key={p.cartItemId} xs={12} sm={6} md={4}>
                <BasketCard
                  id={p.cartItemId} // Wichtig: eindeutige ID für Remove
                  name={p.name}
                  price={p.price}
                  onRemove={onRemove}
                />
              </Grid>
            ))}
          </Grid>

          {/* Summary row */}
          <Box
            sx={{
              mt: 4,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">
              <strong>Total:</strong> {total.toFixed(2)} $
            </Typography>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteSweepIcon />}
              onClick={() => onClear && onClear()}
            >
              Clear Portfolio
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
