import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';

const FooterPage = () => {
  return (
    <MDBFooter color="black" className="font-small pt-4 mt-4">
      <MDBContainer
        fluid
        style={{ width: '80%' }}
        className="text-center text-md-left"
      >
        <MDBRow>
          <MDBCol md="4">
            <h5 className="title">About</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">Link 1</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 2</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 3</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 4</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="4">
            <h5 className="title">Contact</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">Link 1</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 2</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 3</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 4</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="4">
            <h5 className="title">Help and Support</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">Link 1</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 2</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 3</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 4</a>
              </li>
            </ul>
          </MDBCol>
          <hr />
        </MDBRow>
        <MDBRow>
          <img
            className="pr-3"
            src={require('../../images/default-source/footer_img/first.png')}
          ></img>
          <img
            className="pr-3"
            src={require('../../images/default-source/footer_img/second.png')}
          ></img>
          <img
            className="pr-3"
            src={require('../../images/default-source/footer_img/third.png')}
          ></img>
          <img
            className="pr-3"
            src={require('../../images/default-source/footer_img/fourth.png')}
          ></img>
          <img
            className="pr-3"
            src={require('../../images/default-source/footer_img/fifth.png')}
          ></img>
        </MDBRow>
        <MDBRow>
          <hr
            style={{
              color: 'white',
              backgroundColor: 'white',
              height: 5,
            }}
          />
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: Immigration Nationality
          and Vital Events Agency Ethiopia
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default FooterPage;
