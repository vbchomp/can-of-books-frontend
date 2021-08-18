import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import patricktomasso from './patricktomasso.JPEG';
import { withAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

class MyFavoriteBooks extends React.Component {
  // makeAuthReq fixed from App.js in code review
  makeAuthReq = async () => {
    const { getIdTokenClaims } = this.props.auth0;
    let claimThatToken = await getIdTokenClaims();
    const jwt = claimThatToken.__raw;
    console.log(jwt);// could console.log the claimThatToken if want to see the long token
    const config = {
      headers: { "Authorization": `Bearer ${jwt}` },
    };
    const serverResponse = await axios.get('http://localhost:3001/test', config);
    console.log('I hope it works this way, since it did not work the other way', serverResponse);
  }

  render() {
    return (
      <>
        <Jumbotron>
          <h1>My Favorite Books</h1>
          <div className="shape shape-style-1 shape-default alpha-4">
            <span>
              <img
                style={{ height: 'auto', width: '100%' }}
                src={patricktomasso}
                alt="Open Book Lot by Patrick Tomasso"
                title="Open Book Lot by Patrick Tomasso"
                description="Open Book Lot by Patrick Tomasso"
              />
            </span>
          </div>
          <p>
            This is a collection of my favorite books
          </p>
          <button onClick={this.makeAuthReq}>Send me to Server</button>
          <p>Check the console!</p>
        </Jumbotron>
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
