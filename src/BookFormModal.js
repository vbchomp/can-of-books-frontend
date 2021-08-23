import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

class BookFormModal extends React.Component {

  render() {
    return (

      <>
        {/* Used from React bootstrap site https://react-bootstrap-v4.netlify.app/components/modal/ */}
        <Modal
          show={this.props.openModal}
          onHide={this.props.closeModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add a Book to My Favorite Books List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicTitle">
                <Form.Label>Book Title</Form.Label>
                <Form.Control type="text" placeholder="Enter book title" />
                <Form.Text className="text-muted">
                  Title of book
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicDesc">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Description" />
              </Form.Group>
              <Form.Group controlId="formBasicStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control type="text" placeholder="Status" />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  I will share your email with everyone! Muhahahaha!
                </Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default BookFormModal;
