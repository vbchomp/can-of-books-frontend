import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import axios from 'axios';
// import LoginButton from './LoginButton';
// import LogoutButton from './LogoutButton';
import Profile from './Profile';
import BestBooks from './BestBooks';
import { withAuth0 } from '@auth0/auth0-react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
// import Bookshelf from 'bookshelf';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  makeAuthReq = async () => {
    const { getIdTokenClaims } = this.props.auth0;
    let claimThatToken = await getIdTokenClaims();
    const jwt = claimThatToken.__raw;
    const config = {
      headers: { "Authorization": `Bearer ${jwt}` },
    };

    const serverResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/test`, config);

    console.log('I hope it works this way, since it did not work the other way', serverResponse);
  }

  render() {
    console.log(this.props.auth0);
    const { user, isLoading, isAuthenticated } = this.props.auth0;
    console.log('user', user);
    console.log('app', this.props);
    if (isLoading) {

    }
    return (
      <>
        <Router>
          <IsLoadingAndError>
            <Header>
              {/* {isAuthenticated ?
                <LogoutButton /> :
                <LoginButton
                />} */}
            </Header>
            <Switch>
              <Route exact path="/">
                {/* Not Sure if Done - Is BestBooks supposed to be Bookshelf?: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
                {user ? <BestBooks /> : ''}
              </Route>
              <Route exact path="/Profile">
                {/* DONE: add a route with a path of '/profile' that renders a `Profile` component */}
                {user ? <Profile /> : ''}
              </Route>
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
