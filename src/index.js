import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

// DONE: wrap everything in Auth0
ReactDOM.render(
  <Auth0Provider
    domain="dev-xmbqk6d0.us.auth0.com"
    clientId="YwlXJEa6tPbTT5IHOb6kVPOHCYp7Kuq0"
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </Auth0Provider>,
  document.getElementById('root')
);
