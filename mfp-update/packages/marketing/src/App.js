import React, { useState, useEffect } from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';

import Landing from './components/Landing';
import Pricing from './components/Pricing';

export default ({ history }) => {
  const [location, setLocation] = useState(history.location);

  useEffect(() => {
    // Listen to history changes and update location state
    const unlisten = history.listen((update) => {
      setLocation(update.location);
    });

    return unlisten; // Clean up the listener on unmount
  }, [history]);

  return (
    <div>
      <StyledEngineProvider injectFirst>
        <Router location={location} navigator={history}>
          <Routes>
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/" element={<Landing />} />
          </Routes>
        </Router>
      </StyledEngineProvider>
    </div>
  );
};
