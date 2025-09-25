import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Shell = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[2],
}));

export default function ProductCard({ id, name, price, onAdd }) {
  return (
    <Shell>
      <CardContent style={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {id} <TrendingUpIcon fontSize="small" color="primary" />
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">{name}</Typography>
        <Typography variant="h5" color="success.main" sx={{ mt: 1, fontWeight: 'bold' }}>
          ${price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="contained" onClick={onAdd}>
          Add to Portfolio
        </Button>
      </CardActions>
    </Shell>
  );
}
