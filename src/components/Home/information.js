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
import { useTranslation, Trans } from 'react-i18next';

const MultiCarouselPage = () => {
    const { t, i18n } = useTranslation();
    return (
        <MDBContainer className="passport-card-deck passport-container my-5" fluid>
            <div class="u-center-text u-margin-bottom-big">
                <h2 class="heading-secondary">
                   <Trans>howToApply.howtoApply</Trans>
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
                                            <MDBCardTitle>
                                                <Trans>howToApply.newPassport</Trans>
                                                </MDBCardTitle>
                                            <MDBCardText>
                                            <Trans>howToApply.newPassportDescription</Trans>
                                      
                    </MDBCardText>

                                            <Link to="/Information" class="btn btnBlu"><Trans>howToApply.seeMore</Trans></Link>

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
                                            <MDBCardTitle>
                                            <Trans>howToApply.expiredPassport</Trans>
                                          
                                                </MDBCardTitle>
                                            <MDBCardText>
                                            <Trans>howToApply.expiredPassportDescription</Trans>
                    </MDBCardText>
                                            <Link to="/Information" class="btn btnBlu"><Trans>howToApply.seeMore</Trans></Link>

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
                                            <MDBCardTitle><Trans>howToApply.passportRunout</Trans></MDBCardTitle>
                                            <MDBCardText>
                                            <Trans>howToApply.passportRunoutDescription</Trans>
                    </MDBCardText>
                                            <Link to="/Information" class="btn btnBlu"><Trans>howToApply.seeMore</Trans></Link>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol md='3' className='equalcard'>
                                    <MDBCard className='mb-2'>
                                        <MDBCardImage
                                            className='img-fluid'
                                            src={require('../../images/Information/Damaged.jpg')}
                                        />
                                        <MDBCardBody>
                                            <MDBCardTitle><Trans>howToApply.damagedPassport</Trans></MDBCardTitle>
                                            <MDBCardText>
                                            <Trans>howToApply.damagedPassportDescription</Trans>

                    </MDBCardText>
                                            <Link to="/Information" class="btn btnBlu"><Trans>howToApply.seeMore</Trans></Link>
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
                                            <MDBCardTitle><Trans>howToApply.lostPassport</Trans></MDBCardTitle>
                                            <MDBCardText>
                                            <Trans>howToApply.lostPassportDescription</Trans>
                                        </MDBCardText>
                                            <Link to="/Information" class="btn btnBlu"><Trans>howToApply.seeMore</Trans></Link>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol md='3' className='equalcard'>
                                    <MDBCard className='mb-2'>
                                        <MDBCardImage
                                            className='img-fluid'
                                            src={require('../../images/Information/DATA CORRECTION.jpg')}
                                        />
                                        <MDBCardBody>
                                            <MDBCardTitle><Trans>howToApply.changeofPassportData</Trans></MDBCardTitle>
                                            <MDBCardText>
                                            <Trans>howToApply.changeofPassportDataDescription</Trans>

                    </MDBCardText>
                                            <Link to="/Information" class="btn btnBlu"><Trans>howToApply.seeMore</Trans></Link>
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
                                            <MDBCardTitle><Trans>howToApply.validPassport</Trans></MDBCardTitle>
                                            <MDBCardText>
                                            <Trans>howToApply.validPassportDescription</Trans>
                    </MDBCardText>
                                            <Link to="/Information" class="btn btnBlu"><Trans>howToApply.seeMore</Trans></Link>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol md='3' className='equalcard'>
                                    <MDBCard className='mb-2'>
                                        <MDBCardImage
                                            className='img-fluid'
                                            src={require('../../images/Information/under 18.jpg')}
                                        />
                                        <MDBCardBody>
                                            <MDBCardTitle><Trans>howToApply.applicantUnder18</Trans></MDBCardTitle>
                                            <MDBCardText>
                                            <Trans>howToApply.applicantUnder18Description</Trans>
                    </MDBCardText>
                                            <Link to="/Information" class="btn btnBlu"><Trans>howToApply.seeMore</Trans></Link>
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
                                            src={require('../../images/Information/Urgent passport.jpg')}
                                        />
                                        <MDBCardBody>
                                            <MDBCardTitle><Trans>howToApply.urgentService</Trans> </MDBCardTitle>
                                            <MDBCardText>
                                            <Trans>howToApply.urgentServiceDescription</Trans>
                    </MDBCardText>
                                            <Link to="/Information" class="btn btnBlu"><Trans>howToApply.seeMore</Trans></Link>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol md='3' className='equalcard'>
                                    <MDBCard className='mb-2'>
                                        <MDBCardImage
                                            className='img-fluid'
                                            src={require('../../images/Information/EMERGENCY.jpg')}
                                        />
                                        <MDBCardBody>
                                            <MDBCardTitle><Trans>howToApply.emergency</Trans></MDBCardTitle>
                                            <MDBCardText>
                                            <Trans>howToApply.emergencyDescription</Trans>
                    </MDBCardText>
                                            <Link to="/Information" class="btn btnBlu"><Trans>howToApply.seeMore</Trans></Link>
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
                                            <MDBCardTitle>
                                                <Trans>howToApply.newPassport</Trans>
                                                </MDBCardTitle>
                                            <MDBCardText>
                                            <Trans>howToApply.newPassportDescription</Trans>
                                      
                    </MDBCardText>

                                            <Link to="/Information" class="btn btnBlu"><Trans>howToApply.seeMore</Trans></Link>

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
                                            <MDBCardTitle>
                                            <Trans>howToApply.expiredPassport</Trans>
                                          
                                                </MDBCardTitle>
                                            <MDBCardText>
                                            <Trans>howToApply.expiredPassportDescription</Trans>
                    </MDBCardText>
                                            <Link to="/Information" class="btn btnBlu"><Trans>howToApply.seeMore</Trans></Link>

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