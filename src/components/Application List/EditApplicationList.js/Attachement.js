import React, { useEffect, useState } from 'react';
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
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  {/* Size of the image should be less than 2MB and in JPEG, JPG, PNG, GIF or BMP format */}
                  <Form.File
                    id="exampleFormControlFile1"
                    label="Birth certificate"
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.File id="exampleFormControlFile1" label="Id" />
                </Form.Group>
              </Form.Row>
            </Form>
          </blockquote>
        </Card.Body>
      </Card>
    </MDBContainer>
  );
}
