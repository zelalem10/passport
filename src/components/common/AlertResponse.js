import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody } from 'mdbreact';

class ModalPage extends React.Component {
state = {
  modal10: true,
  modal11: true
}

toggle = nr => () => {
  let modalNumber = 'modal' + nr
  this.setState({
    [modalNumber]: !this.state[modalNumber]
  });
}

render() {
  return (
      <MDBContainer>
        {/* <MDBBtn color="warning" onClick={this.toggle(10)}>Bottom</MDBBtn>
        <MDBModal isOpen={this.state.modal10} toggle={this.toggle(10)} frame position="bottom">
          <MDBModalBody className="text-center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua.
            <MDBBtn color="secondary" onClick={this.toggle(10)}>Close</MDBBtn>
            <MDBBtn color="primary">Save changes</MDBBtn>
          </MDBModalBody>
        </MDBModal>
        <MDBBtn color="warning" onClick={this.toggle(11)}>Top</MDBBtn> */}
        <MDBModal isOpen={true} toggle="true" frame position="top">
          <MDBModalBody className="text-center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua.
            <MDBBtn color="secondary" onClick={this.toggle(11)}>Close</MDBBtn>
            <MDBBtn color="primary">Save changes</MDBBtn>
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default ModalPage;