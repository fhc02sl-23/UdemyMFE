import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ProductCard from './ProductCard';

const PRODUCTS = [
  { id: 'AAPL', name: 'Apple Inc.',     price: 182.35 },
  { id: 'MSFT', name: 'Microsoft Corp', price: 431.62 },
  { id: 'TSLA', name: 'Tesla Inc.',     price: 245.18 },
  { id: 'NVDA', name: 'NVIDIA Corp',    price: 118.22 },
];

const Wrap = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 3),
}));

export default function ProductList({ onAddToCart }) {
  return (
    <Wrap>
      <Typography variant="h4" gutterBottom>Markets</Typography>
      <Grid container spacing={3}>
        {PRODUCTS.map((p) => (
          <Grid item key={p.id} xs={12} sm={6} md={3}>
            <ProductCard
              id={p.id}
              name={p.name}
              price={p.price}
              onAdd={() => onAddToCart && onAddToCart(p)}
            />
          </Grid>
        ))}
      </Grid>
    </Wrap>
  );
}
