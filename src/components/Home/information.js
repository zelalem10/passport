import React from 'react';
import {
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn
} from 'mdbreact';
import { Link } from 'react-router-dom';

const MultiCarouselPage = () => {
    return (
        <MDBContainer className="passport-card-deck passport-container my-5" fluid>
            <div class="u-center-text u-margin-bottom-big">
                <h2 class="heading-secondary">
                    How to Apply
                    </h2>
            </div>

            <MDBCarousel
                activeItem={1}
                length={3}
                slide={true}
                showControls={true}
                showIndicators={true}
                multiItem
            >
                <MDBCarouselInner>
                    <MDBRow>
                        <MDBCarouselItem itemId='1'>
                            <MDBRow className='info equalcard'>
                                <MDBCol md='3' className='equalcard'>
                                    <MDBCard className='mb-2'>
                                        <MDBCardImage
                                            className='img-fluid'
                                            src={require('../../images/Information/new.jpg')}
                                        />
                                        <MDBCardBody>
                                            <MDBCardTitle>New Passport</MDBCardTitle>
                                            <MDBCardText>
                                                New Passport applicants must fulfill the following requirements.
                    </MDBCardText>

                                            <Link to="/Information" class="btn btnBlu">See More</Link>

                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol md='3' className='equalcard'>
                                    <MDBCard className='mb-2'>
                                        <MDBCardImage
                                            className='img-fluid'
                                            src={require('../../images/Information/expired passport.jpg')}
                                        />
                                        <MDBCardBody>
                                            <MDBCardTitle>Expired Passport</MDBCardTitle>
                                            <MDBCardText>
                                                Expired Passport applicants must fulfill the following requirements.
                    </MDBCardText>
                                            <Link to="/Information" class="btn btnBlu">See More</Link>

                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol md='3' className='equalcard'>
                                    <MDBCard className='mb-2'>
                                        <MDBCardImage
                                            className='img-fluid'
                                            src={require('../../images/Information/Passport Page Runout.jpg')}
                                        />
                                        <MDBCardBody>
                                            <MDBCardTitle>Passport Page Runout</MDBCardTitle>
                                            <MDBCardText>
                                                For applicants of passport pagerun out must fulfill the following requirements.
                    </MDBCardText>
                                            <Link to="/Information" class="btn btnBlu">See More</Link>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol md='3' className='equalcard'>
                                    <MDBCard className='mb-2'>
                                        <MDBCardImage
                                            className='img-fluid'
                                            src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(35).jpg'
                                        />
                                        <MDBCardBody>
                                            <MDBCardTitle>Damaged Passport</MDBCardTitle>
                                            <MDBCardText>
                                                For applicants of damaged passport must fulfill the following requirements.

                    </MDBCardText>
                                            <Link to="/Information" class="btn btnBlu">See More</Link>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>

                            </MDBRow>
                        </MDBCarouselItem>
                        <MDBCarouselItem itemId='2'>
                            <MDBRow className='info equalcard'>
                                <MDBCol md='3' className='equalcard'>
                                    <MDBCard className='mb-2'>
                                        <MDBCardImage
                                            className='img-fluid'
                                            src={require('../../images/Information/lost.jpg')}
                                        />
                                        <MDBCardBody>
                                            <MDBCardTitle>Lost/Stolen passport</MDBCardTitle>
                                            <MDBCardText>
                                                For applicants of Lost/Stolen passport must fulfill the following requirements.
                    </MDBCardText>
                                            <Link to="/Information" class="btn btnBlu">See More</Link>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol md='3' className='equalcard'>
                                    <MDBCard className='mb-2'>
                                        <MDBCardImage
                                            className='img-fluid'
                                            src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(48).jpg'
                                        />
                                        <MDBCardBody>
                                            <MDBCardTitle>Change of Passport Data</MDBCardTitle>
                                            <MDBCardText>
                                                Applicants for change of passport data must fulfill the following requirements.

                    </MDBCardText>
                                            <Link to="/Information" class="btn btnBlu">See More</Link>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol md='3' className='equalcard'>
                                    <MDBCard className='mb-2'>
                                        <MDBCardImage
                                            className='img-fluid'
                                            src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(47).jpg'
                                        />
                                        <MDBCardBody>
                                            <MDBCardTitle>Valid Passport </MDBCardTitle>
                                            <MDBCardText>
                                                Applicants for change of passport data must fulfill the following requirements.
                    </MDBCardText>
                                            <Link to="/Information" class="btn btnBlu">See More</Link>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol md='3' className='equalcard'>
                                    <MDBCard className='mb-2'>
                                        <MDBCardImage
                                            className='img-fluid'
                                            src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(47).jpg'
                                        />
                                        <MDBCardBody>
                                            <MDBCardTitle>Applicant Under 18</MDBCardTitle>
                                            <MDBCardText>
                                                If the applicant is under 18, parents or guardians are required to attach the following document
                    </MDBCardText>
                                            <Link to="/Information" class="btn btnBlu">See More</Link>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>

                            </MDBRow>
                        </MDBCarouselItem>
                        <MDBCarouselItem itemId='3'>
                            <MDBRow className='info equalcard'>
                                <MDBCol md='3' className='equalcard'>
                                    <MDBCard className='mb-2'>
                                        <MDBCardImage
                                            className='img-fluid'
                                            src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(45).jpg'
                                        />
                                        <MDBCardBody>
                                            <MDBCardTitle>Urgent Service </MDBCardTitle>
                                            <MDBCardText>
                                                If you are applying for Urgent Services, you must have reason or evidence like
                    </MDBCardText>
                                            <Link to="/Information" class="btn btnBlu">See More</Link>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol md='3' className='equalcard'>
                                    <MDBCard className='mb-2'>
                                        <MDBCardImage
                                            className='img-fluid'
                                            src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(41).jpg'
                                        />
                                        <MDBCardBody>
                                            <MDBCardTitle>Emergency</MDBCardTitle>
                                            <MDBCardText>
                                                Emergency requests are handled in INVEA main office or branch offices in person.
                    </MDBCardText>
                                            <Link to="/Information" class="btn btnBlu">See More</Link>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol md='3' className='equalcard'>
                                    <MDBCard className='mb-2'>
                                        <MDBCardImage
                                            className='img-fluid'
                                            src={require('../../images/Information/new.jpg')}
                                        />
                                        <MDBCardBody>
                                            <MDBCardTitle>New Passport</MDBCardTitle>
                                            <MDBCardText>
                                                New Passport applicants must fulfill the following requirements.
                    </MDBCardText>

                                            <Link to="/Information" class="btn btnBlu">See More</Link>

                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol md='3' className='equalcard'>
                                    <MDBCard className='mb-2'>
                                        <MDBCardImage
                                            className='img-fluid'
                                            src={require('../../images/Information/expired passport.jpg')}
                                        />
                                        <MDBCardBody>
                                            <MDBCardTitle>Expired Passport</MDBCardTitle>
                                            <MDBCardText>
                                                Expired Passport applicants must fulfill the following requirements.
                    </MDBCardText>
                                            <Link to="/Information" class="btn btnBlu">See More</Link>

                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                               
                            </MDBRow>
                        </MDBCarouselItem>
                    </MDBRow>
                </MDBCarouselInner>
            </MDBCarousel>
        </MDBContainer>
    );
};

export default MultiCarouselPage;