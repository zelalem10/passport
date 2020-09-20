import React, { useEffect, useState } from 'react';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
} from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import { Form, Card, Row, Col, InputGroup, Button } from 'react-bootstrap';

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
    <blockquote className="blockquote mb-0">
      <form>
        <MDBRow>
          <MDBCol md="4">
            <MDBCol>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupFileAddon01">
                    Upload
                  </span>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="exampleFormControlFile1"
                    aria-describedby="inputGroupFileAddon01"
                  />
                  <label
                    className="custom-file-label"
                    htmlFor="inputGroupFile01"
                  >
                    Birth certificate
                  </label>
                </div>
              </div>
            </MDBCol>
          </MDBCol>
          <MDBCol md="4">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupFileAddon01">
                  Upload
                </span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="exampleFormControlFile1"
                  aria-describedby="inputGroupFileAddon01"
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Birth certificate
                </label>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </form>
    </blockquote>
  );
}
