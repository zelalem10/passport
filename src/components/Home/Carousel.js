import React from 'react';
import {
  MDBCarousel,
  MDBCarouselCaption,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBBtn,
  MDBContainer,
  MDBCardTitle,
} from 'mdbreact';
import { Link, useHistory } from 'react-router-dom';

const CarouselPage = () => {
  return (
    <MDBContainer
      className="Passport-Carousel"
      fluid
      style={{
        'padding-right': 0,
        'padding-left': '0',
      }}
    >
      <MDBCarousel
        activeItem={1}
        length={6}
        showControls={true}
        showIndicators={true}
        className="z-depth-1"
      >
        <MDBCarouselInner>
        <MDBCarouselItem itemId="1">
            <MDBView>
              <img
                className="d-block w-100"
                src={require('../../images/default-source/carousel/lalibela.jpg')}
                alt="First slide"
              />
              {/* <MDBMask overlay="black-light" /> */}
            </MDBView>
            <MDBCarouselCaption className="passport-CarouselCaption">
              <h3 className="h3-responsive">
                Welcome to Ethiopian <br></br>
                Passport Services
              </h3>
   
            </MDBCarouselCaption>
          </MDBCarouselItem>
         
          <MDBCarouselItem itemId="2">
            <MDBView>
              <img
                className="d-block w-100"
                src={require('../../images/default-source/carousel/1920x550pix-ET-online-passport--web-0920--.jpg')}
                alt="First slide"
              />
              {/* <MDBMask overlay="black-light" /> */}
            </MDBView>
            <MDBCarouselCaption className="passport-CarouselCaption">
              <h3 className="h3-responsive">
                Welcome to Ethiopian <br></br>
                Passport Services
              </h3>
       
            </MDBCarouselCaption>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
              <img
                className="d-block w-100"
                src={require('../../images/default-source/carousel/1920x550pix-ET-online-passport--web-0920-.jpg')}
                alt="Second slide"
              />
              {/* <MDBMask overlay="black-strong" /> */}
            </MDBView>
            <MDBCarouselCaption className="passport-CarouselCaption">
              <h3 className="h3-responsive">
                Welcome to Ethiopian <br></br>
                Passport Services
              </h3>
          
            </MDBCarouselCaption>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="4">
            <MDBView>
              <img
                className="d-block w-100"
                src={require('../../images/default-source/carousel/1920x550pix-ET-online-passport--web-0920.jpg')}
                alt="Third slide"
              />
              {/* <MDBMask overlay="black-slight" /> */}
            </MDBView>
            <MDBCarouselCaption className="passport-CarouselCaption">
              <h3 className="h3-responsive">
                Welcome to Ethiopian <br></br>
                Passport Services
              </h3>
         
            </MDBCarouselCaption>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="5">
            <MDBView>
              <img
                className="d-block w-100"
                src={require('../../images/default-source/carousel/axum.jpg')}
                alt="Third slide"
              />
              {/* <MDBMask overlay="black-slight" /> */}
            </MDBView>
            <MDBCarouselCaption className="passport-CarouselCaption">
              <h3 className="h3-responsive">
                Welcome to Ethiopian <br></br>
                Passport Services
              </h3>
          
            </MDBCarouselCaption>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="6">
            <MDBView>
              <img
                className="d-block w-100"
                src={require('../../images/default-source/carousel/ertale.jpg')}
                alt="Third slide"
              />
              {/* <MDBMask overlay="black-slight" /> */}
            </MDBView>
            <MDBCarouselCaption className="passport-CarouselCaption">
              <h3 className="h3-responsive">
                Welcome to Ethiopian <br></br>
                Passport Services
              </h3>
          
            </MDBCarouselCaption>
          </MDBCarouselItem>
    
        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>
  );
};

export default CarouselPage;
