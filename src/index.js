import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import './index.css';


// Half Background image code found here
// https://mdbootstrap.com/docs/react/css/background-image/
const BackgroundImagePage = () => {
  return (
    <div className="bg"></div>
    );
  }
  
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

// export code for the half page background image code. 
// not sure if all of the code is in right spot as it is not rendering
export default BackgroundImagePage;
