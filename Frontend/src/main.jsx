import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Auth0Provider
      domain="dev-7p0xm2lh5immtryh.us.auth0.com"
      clientId="duOY6Gwc0loInbVStsgVBk0hPX2wgNz6"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
