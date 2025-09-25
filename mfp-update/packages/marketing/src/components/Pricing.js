// packages/marketing/src/components/Pricing.js
import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Link as MaterialLink,
  Typography,
  Chip,
} from '@mui/material';
import StarIcon from '@mui/icons-material/StarBorder';
import ShieldIcon from '@mui/icons-material/Shield';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PieChartIcon from '@mui/icons-material/PieChart';
import { Link as RouterLink } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <MaterialLink component={RouterLink} to="/" color="inherit" sx={{ textDecoration: 'none' }}>
        Your Website
      </MaterialLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// Finance-centric tiers
const tiers = [
  {
    title: 'Starter',
    price: '0',
    tagline: 'Get going',
    description: [
      'Real-time quotes (delayed)',
      'Basic portfolio tracking',
      'Watchlists (up to 2)',
      'Email support',
    ],
    cta: 'Start for free',
    variant: 'outlined',
    to: '/auth/signup',
    badge: null,
  },
  {
    title: 'Trader',
    tagline: 'Most popular',
    price: '15',
    description: [
      'Live quotes',
      'Unlimited watchlists',
      'Advanced charting',
      'Export to CSV',
      'Priority email support',
    ],
    cta: 'Start 14-day trial',
    variant: 'contained',
    to: '/auth/signup',
    badge: 'Best value',
    highlight: true,
  },
  {
    title: 'Pro',
    price: '39',
    tagline: 'For power users',
    description: [
      'Backtesting & alerts',
      'Multi-portfolio analytics',
      'API access',
      'Role-based teams',
      'SLA & phone support',
    ],
    cta: 'Contact sales',
    variant: 'outlined',
    to: '/auth/signin',
    badge: null,
  },
];

const footers = [
  { title: 'Product', description: ['Markets', 'Portfolio', 'Dashboard', 'Mobile'] },
  { title: 'Company', description: ['About', 'Careers', 'Contact', 'Blog'] },
  { title: 'Resources', description: ['Docs', 'API', 'Status', 'Community'] },
  { title: 'Legal', description: ['Privacy', 'Terms'] },
];

export default function Pricing() {
  return (
    <>
      {/* HERO */}
      <Container maxWidth="sm" component="section" sx={{ pt: 8, pb: 6, textAlign: 'center' }}>
        <Typography component="h1" variant="h3" gutterBottom>
          Simple pricing for serious investing
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Choose a plan that fits your strategy. Upgrade or downgrade any time.
        </Typography>

        {/* Finance badges */}
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Chip icon={<TrendingUpIcon />} label="Live markets" variant="outlined" />
          <Chip icon={<PieChartIcon />} label="Portfolio analytics" variant="outlined" />
          <Chip icon={<ShieldIcon />} label="Secure & modular MFEs" variant="outlined" />
        </Box>
      </Container>

      {/* TIERS */}
      <Container maxWidth="md" component="section">
        <Grid container spacing={5} alignItems="stretch">
          {tiers.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Pro' ? 12 : 6}
              md={4}
              sx={{ display: 'flex' }}
            >
              <Card
                sx={{
                  flex: 1,
                  borderWidth: tier.highlight ? 2 : 1,
                  borderStyle: 'solid',
                  borderColor: (t) =>
                    tier.highlight ? t.palette.primary.main : t.palette.divider,
                }}
                elevation={tier.highlight ? 2 : 0}
              >
                <CardHeader
                  title={tier.title}
                  subheader={tier.tagline}
                  action={tier.highlight ? <StarIcon color="primary" /> : null}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  sx={{
                    bgcolor: (t) =>
                      t.palette.mode === 'light' ? t.palette.grey[100] : t.palette.grey[800],
                  }}
                />

                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>

                  {tier.badge && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                      <Chip color="primary" size="small" label={tier.badge} />
                    </Box>
                  )}

                  <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
                    {tier.description.map((line) => (
                      <Typography
                        key={line}
                        component="li"
                        variant="subtitle1"
                        align="center"
                        sx={{ py: 0.5 }}
                      >
                        {line}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>

                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button
                    component={RouterLink}
                    to={tier.to}
                    fullWidth
                    variant={tier.variant}
                    color="primary"
                  >
                    {tier.cta}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FOOTER */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (t) => `1px solid ${t.palette.divider}`,
          mt: 8,
          py: { xs: 3, sm: 6 },
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" gutterBottom>
                {footer.title}
              </Typography>
              <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
                {footer.description.map((item) => (
                  <li key={item}>
                    <MaterialLink component={RouterLink} to="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </MaterialLink>
                  </li>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
