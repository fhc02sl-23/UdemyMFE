// packages/marketing/src/components/Landing.js
import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Typography,
  Link as MaterialLink,
} from '@mui/material';
import { Link } from 'react-router-dom';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PieChartIcon from '@mui/icons-material/PieChart';
import ShieldIcon from '@mui/icons-material/Shield';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <MaterialLink component={Link} to="/" color="inherit" sx={{ textDecoration: 'none' }}>
      Simon Litrop
      </MaterialLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Landing() {
  return (
    <>
      <main>
        {/* HERO – finance look */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            background:
              'linear-gradient(135deg, rgba(3,136,229,.08) 0%, rgba(0,187,126,.08) 100%)',
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
            pt: { xs: 8, md: 10 },
            pb: { xs: 6, md: 8 },
          }}
        >
          <Container maxWidth="md" sx={{ textAlign: 'center' }}>
            <Typography component="h1" variant="h3" color="text.primary" gutterBottom>
              Invest smarter. Stay in control.
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 720, mx: 'auto' }}>
              Track your portfolio, explore markets, and monitor performance in real-time.
              Microfrontends keep features independent and fast.
            </Typography>

            {/* KPI chips */}
            <Grid container spacing={2} sx={{ mt: 4 }} justifyContent="center">
              <Grid item>
                <Chip
                  label="Portfolio Value: $12,000"
                  icon={<PieChartIcon />}
                  sx={{ fontWeight: 600 }}
                  color="default"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <Chip
                  label="Day P/L: +$3,200"
                  icon={<TrendingUpIcon />}
                  sx={{ fontWeight: 600, color: 'success.main', borderColor: 'success.light' }}
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <Chip label="Holdings: 7" sx={{ fontWeight: 600 }} variant="outlined" />
              </Grid>
            </Grid>

            {/* CTA buttons */}
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
              <Grid item>
                <Button component={Link} to="/shop" variant="contained">
                  Explore Markets
                </Button>
              </Grid>
              <Grid item>
                <Button component={Link} to="/dashboard" variant="outlined">
                  Open Dashboard
                </Button>
              </Grid>
              <Grid item>
                <Button component={Link} to="/pricing" variant="text">
                  View Pricing
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* FEATURE CARDS */}
        <Container sx={{ py: 8 }} maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  sx={{ pt: '56.25%' }}
                  image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop"
                  title="Markets"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Markets
                  </Typography>
                  <Typography color="text.secondary">
                    Browse assets and add them to your portfolio. The Products MFE powers this
                    view independently.
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button size="small" component={Link} to="/shop">
                    Go to Markets
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  sx={{ pt: '56.25%' }}
                  image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop"
                  title="Portfolio"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Portfolio
                  </Typography>
                  <Typography color="text.secondary">
                    Manage positions and totals in one place. Basket MFE syncs state via callbacks
                    from the Host.
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button size="small" component={Link} to="/cart">
                    Open Portfolio
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  sx={{ pt: '56.25%' }}
                  image="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1200&auto=format&fit=crop"
                  title="Secure"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Secure & Modular
                  </Typography>
                  <Typography color="text.secondary">
                    Auth, Dashboard, and Markets are isolated MFEs, deployed independently and
                    federated at runtime.
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button size="small" component={Link} to="/auth/signin" startIcon={<ShieldIcon />}>
                    Sign in
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>

      {/* FOOTER */}
      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          Built with Module Federation – scale features without redeploying the whole app.
        </Typography>
        <Copyright />
      </Box>
    </>
  );
}
