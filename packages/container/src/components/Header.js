import React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Badge } from '@mui/material';

/**
 * Header
 * - Links: Home, Shop, Cart
 * - Rechts: Login/Logout (je nach isSignedIn)
 *
 * Props:
 * - isSignedIn: boolean -> steuert Button-Text/Login-Logout
 * - onSignOut: function -> wird beim Logout-Klick ausgeführt
 * - cartCount?: number -> (optional) Anzahl Items im Warenkorb; wenn nicht übergeben, wird nichts gebadged
 */
export default function Header({ isSignedIn, onSignOut, cartCount }) {
  // Logout-Click (nur aktiv, wenn isSignedIn === true)
  const onClick = () => {
    if (isSignedIn && onSignOut) {
      onSignOut();
    }
  };

  return (
    <React.Fragment>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {/* LINKE SEITE: Logo/Home */}
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            component={RouterLink}
            to="/"
            sx={{ textDecoration: 'none' }}
          >
            Finance App
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          {/* 👇 Nur wenn eingeloggt → Dashboard-Button */}
          {isSignedIn && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="primary"
              sx={{ my: 1, mx: 1.5 }}
              component={RouterLink}
              to="/dashboard"
            >
              Dashboard
            </Button>
           {/* MITTE: Navigation zu Shop & Cart */}
            <Button
              color="inherit"
              component={RouterLink}
              to="/shop"          // -> Products-MFE
            >
              Markets
            </Button>
            {/* Cart mit optionalem Badge für cartCount */}
            <Button
              color="inherit"
              component={RouterLink}
              to="/cart"          // -> Basket-MFE
            >
              {typeof cartCount === 'number' ? (
                <Badge badgeContent={cartCount} color="primary">
                  Portfolio
                </Badge>
              ) : (
                'Cart'
              )}
            </Button>
            </Box>
           )}

           <Box>
              {/* RECHTE SEITE: Login/Logout */}
              <Button
                color="primary"
                variant="outlined"
                sx={{ my: 1, mx: 1.5 }}
                component={RouterLink}
                // Wenn eingeloggt: klick führt Logout aus & Link geht nach "/"
                // Wenn NICHT eingeloggt: Link zur Auth-Seite
                to={isSignedIn ? '/' : '/auth/signin'}
                onClick={onClick}
              >
                {isSignedIn ? 'Logout' : 'Login'}
              </Button>
            </Box>
          </Box>

        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
