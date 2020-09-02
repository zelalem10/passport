import React, { useState } from 'react';
import { MDBContainer } from 'mdbreact';
import { Form, Card, Col } from 'react-bootstrap';

export default function Address() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <MDBContainer className="passport-container pt-3" fluid>
      <Card>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} md="4" controlId="date">
                  <Form.Label>
                    Travel Date<i style={{ color: 'red' }}>*</i>
                  </Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="ticketNumber">
                  <Form.Label>
                    Ticket Number<i style={{ color: 'red' }}>*</i>
                  </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Form.Row>
            </Form>
          </blockquote>
        </Card.Body>
      </Card>
    </MDBContainer>
  );
}
