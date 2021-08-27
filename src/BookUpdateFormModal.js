import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';

class BookUpdateFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.selectedBook.title,
      description: this.props.selectedBook.description,
      status: this.props.selectedBook.status,
      email: this.props.auth0.user.email,
      _id: this.props.selectedBook._id,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleUpdate(this.state);
    this.props.closeUpdateModal();

  }

  render() { 
    console.log('selectedbook:', this.props.selectedBook);
    console.log('formUpdateModal:', this.state);
    return (

      <>
        {/* Used from React bootstrap site https://react-bootstrap-v4.netlify.app/components */}
        <Modal
          show={this.props.isUpdateOpen}
          onHide={this.props.closeUpdateModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Make Changes to a Book in My Favorite Books List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicTitle">
                <Form.Label>Book Title</Form.Label>
                <Form.Control type="text" value={this.state.title} onChange={(e)=>this.setState({title: e.target.value})}/>
                <Form.Text className="text-muted">
                  Title of book
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicDesc">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={this.state.description} onChange={(e)=>this.setState({description: e.target.value})}/>
              </Form.Group>
              <Form.Group controlId="formBasicStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control type="text" value={this.state.status} onChange={(e)=>this.setState({status: e.target.value})}/>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit changes to that Book
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

export default withAuth0(BookUpdateFormModal);
