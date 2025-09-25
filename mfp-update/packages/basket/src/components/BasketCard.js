// packages/basket/src/components/BasketCard.js
import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const Shell = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[2],
}));

export default function BasketCard({ id, name, price, onRemove }) {
  return (
    <Shell>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Price: €{price?.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          color="error"
          variant="outlined"
          startIcon={<RemoveCircleOutlineIcon />}
          onClick={() => onRemove && onRemove(id)}
        >
          Remove
        </Button>
      </CardActions>
    </Shell>
  );
}
