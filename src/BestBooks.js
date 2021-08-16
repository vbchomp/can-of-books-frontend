import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import patricktomasso from './patricktomasso.JPEG';

class MyFavoriteBooks extends React.Component {
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
        </Jumbotron>
      </>
    )
  }
}

export default MyFavoriteBooks;
