import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';

import Progress from './components/Progress';
import Header from './components/Header';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    setIsSignedIn(true);
    navigate('/dashboard');
  };

  return (
      <StyledEngineProvider injectFirst>
        <div>
          <Header
            onSignOut={() => setIsSignedIn(false)}
            isSignedIn={isSignedIn}
          />
          <Suspense fallback={<Progress />}>
            <Routes>
              <Route path="/auth/*" element={
                <AuthLazy onSignIn={handleSignIn} />
              } />
              <Route path="/dashboard" element={
                !isSignedIn ? <Navigate to="/" /> : <DashboardLazy />
              } />
              <Route path="/*" element={<MarketingLazy />} />
            </Routes>
          </Suspense>
        </div>
      </StyledEngineProvider>
  );
};

export default () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};