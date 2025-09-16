import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default () => {
  const ref = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const onParentNavigateRef = useRef(null);

  // Mount the microfrontend once
  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        navigate(nextPathname);
      },
    });

    onParentNavigateRef.current = onParentNavigate;
  }, []); // Empty dependency - mount once

  // Sync navigation from container to child
  useEffect(() => {
    if (onParentNavigateRef.current) {
      onParentNavigateRef.current({ pathname: location.pathname });
    }
  }, [location]); // Only run when location changes

  return <div ref={ref} />;
};