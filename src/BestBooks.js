import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import patricktomasso from './img/patricktomasso.JPEG';
import { withAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button'
import BookFormModal from './BookFormModal';
import BookUpdateFormModal from './BookUpdateFormModal';

const SERVER = process.env.REACT_APP_BACKEND_URL;

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isOpen: false,
      isUpdateOpen: false,
      selectedBook: null,
    }
  }

  // make sure db is mounted at page load
  componentDidMount = async () => {
    const { getIdTokenClaims } = this.props.auth0;
    let claimThatToken = await getIdTokenClaims();
    const jwt = claimThatToken.__raw;
    console.log(jwt);// could console.log the claimThatToken if want to see the long token
    let email = this.props.auth0.user.email
    const config = {
      headers: { "Authorization": `Bearer ${jwt}` },
      // params sending the email from auth0 to the database request on server side
      // don't need this for this lab. old code form old lessonplans
      params: { email: this.props.auth0.user.email },
    };
    console.log('email:', email);
    const results = await axios.get(`${SERVER}/books`, config);
    console.log(results.data);
    this.setState({
      books: results.data,
    })
  }

  // makeAuthReq fixed from App.js in code review
  makeAuthReq = async () => {
    const { getIdTokenClaims } = this.props.auth0;
    let claimThatToken = await getIdTokenClaims();
    const jwt = claimThatToken.__raw;
    console.log(jwt);// could console.log the claimThatToken if want to see the long token
    const config = {
      headers: { "Authorization": `Bearer ${jwt}` },
      // params sending the email from auth0 to the database request on server side
      params: { email: this.props.auth0.user.email },
    };
    const serverResponse = await axios.get(`${SERVER}/test`, config);
    console.log('I hope it works this way, since it did not work the other way', serverResponse);
  }

  // 
  handleCreate = async (book) => {
    try {
      let response = await axios.post(`${SERVER}/books`, book);
      console.log('i am here');
      console.log(response.data);
      this.setState({
        books: [...this.state.books, response.data],
      })
    }
    catch (err) {
      console.log(err);
    }
  }

  handleDelete = async (id) => {
    try {
      let response = await axios.delete(`${SERVER}/books/${id}`);
      console.log('i am here');
      console.log('response:', response.data);
      let remainingBooks = this.state.books.filter(book => book._id !== id);
      console.log('remainingbooks:', remainingBooks);
      this.setState({
        books: remainingBooks,
      })
    }
    catch (err) {
      console.log(err);
    }
  }

  handleUpdate = async (book) => {
    try {
      let response = await axios.put(`${SERVER}/books/${book._id}`, book);
      console.log('i am here');
      console.log('response:', response.data);
      let updatingBooks = this.state.books.map(stateBook => {
        if (stateBook._id === book._id) {
          return book;
        } else {
          return stateBook;
        }
      });
      console.log('updatingbooks:', updatingBooks);
      this.setState({
        books: updatingBooks,
      })
    }
    catch (err) {
      console.log(err);
    }
  }

  // This closes the Book Modal
  closeModal = () => {
    this.setState({
      isOpen: false,
    });
  }

  // This opens the Book Modal
  openModal = () => {
    this.setState({
      isOpen: true,
    });
  }

  // This closes the Book Update Modal
  closeUpdateModal = () => {
    this.setState({
      isUpdateOpen: false,
    });
  }

  // This opens the Book Update Modal
  openUpdateModal = (book) => {
    this.setState({
      isUpdateOpen: true,
      selectedBook: book,
    });
  }

  render() {
    console.log(this.state);

    return (
      <>
        <Jumbotron>
          <h1>My Favorite Books</h1>
          <p>
            This is a collection of my favorite books
          </p>
          {
            this.state.books.length > 0 ?
              <Carousel>
                {this.state.books.map(book => (
                  <Carousel.Item key={book._id}>
                    <img
                      className="d-block w-100"
                      style={{ height: 'auto', width: '100%' }}
                      src={patricktomasso}
                      alt="Open Book Lot by Patrick Tomasso"
                      title="Open Book Lot by Patrick Tomasso"
                      description="Open Book Lot by Patrick Tomasso"
                    />
                    <Carousel.Caption>
                      <h3>{book.title}</h3>
                      <p>{book.description}</p>
                      <p>{book.status}</p>
                    </Carousel.Caption>
                    <Button
                      variant="outline-danger"
                      className="randomDeleteButton"
                      onClick={() => this.handleDelete(book._id)}>Don't Touch
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className="randomUpdateButton"
                      onClick={() => this.openUpdateModal(book)}>Make Changes to a Book?</Button>
                  </Carousel.Item>
                ))}
              </Carousel> : ''}
          <button onClick={this.openModal}>Want to Add a New Book?</button>
          <BookFormModal
            isOpen={this.state.isOpen}
            closeModal={this.closeModal}
            handleCreate={this.handleCreate}
          />
          {
            this.state.isUpdateOpen ?
              <BookUpdateFormModal
                isUpdateOpen={this.state.isUpdateOpen}
                closeUpdateModal={this.closeUpdateModal}
                handleUpdate={this.handleUpdate}
                selectedBook={this.state.selectedBook}
              />
              : ''
          }
        </Jumbotron>
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
