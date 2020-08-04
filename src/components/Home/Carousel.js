import React from 'react';
import {
  MDBCarousel,
  MDBCarouselCaption,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBBtn,
  MDBContainer,
} from 'mdbreact';

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
        length={3}
        showControls={true}
        showIndicators={true}
        className="z-depth-1"
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView>
              <img
                className="d-block w-100"
                src={require('../../images/default-source/carousel/xWQ2.png.pagespeed.ic.oNh09n_9os.jpg')}
                alt="First slide"
              />
              {/* <MDBMask overlay="black-light" /> */}
            </MDBView>
            <MDBCarouselCaption className="passport-CarouselCaption">
              <h3 className="h3-responsive">
                Welcome to Ethiopian <br></br>
                e-passport Services
              </h3>
              <MDBBtn className="passport-btn d-none d-sm-block">
                Request Appointment
              </MDBBtn>
            </MDBCarouselCaption>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <img
                className="d-block w-100"
                src={require('../../images/default-source/carousel/Lisbon2.jpg')}
                alt="Second slide"
              />
              {/* <MDBMask overlay="black-strong" /> */}
            </MDBView>
            <MDBCarouselCaption className="passport-CarouselCaption">
              <h3 className="h3-responsive">
                Welcome to Ethiopian <br></br>
                e-passport Services
              </h3>
              <MDBBtn className="passport-btn d-none d-sm-block">
                Request Appointment
              </MDBBtn>
            </MDBCarouselCaption>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
              <img
                className="d-block w-100"
                src={require('../../images/default-source/carousel/NEGEV-header-1920-x-550.jpg')}
                alt="Third slide"
              />
              {/* <MDBMask overlay="black-slight" /> */}
            </MDBView>
            <MDBCarouselCaption className="passport-CarouselCaption">
              <h3 className="h3-responsive">
                Welcome to Ethiopian <br></br>
                e-passport Services
              </h3>
              <MDBBtn className="passport-btn d-none d-sm-block">
                Request Appointment
              </MDBBtn>
            </MDBCarouselCaption>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>
  );
};

export default CarouselPage;
