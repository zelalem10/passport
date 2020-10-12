import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { validate } from '@material-ui/pickers';
import { red } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';

function IndividualandGroup(props) {
    const [isAgreed, setIsAgreed] = useState(false);
    const [needValidation, setneedValidation] = useState(false);
    const continueTo = (e) => {
        props.nextStep(e);
    };
    const continueIndividual = (e) => {
        props.individualNextStep(e);
    };
    const handleAgrement = () => {
        setIsAgreed(!isAgreed);
        setneedValidation(false);
    };
    const validate = () => {
        setneedValidation(true);
    };
    return (
        <>
            <MDBContainer
                className="passport-container pt-3"
                id="request-an-appointment"
                fluid
            >
                <MDBRow>
                    <MDBCol lg="7">



                        <div className="multistep-form__step">
                            <h2 className="heading-secondary">Request an Appointment</h2>

                            <div className="rtf">
                                <p>
                                    By proceeding with this application, I understand that I am signifying my consent to the disclosure, collection,
                                    and use of my personal information and the data required under the Ethiopian Passport Act as amended and its Implementing
                                    Rules and Regulations. My consent effectively constitutes a waiver of any and all privacy rights pertaining to the disclosure,
                                    collection, and use of my personal information and data under the specific terms and condition of Ethiopian Online Passport
                                    Appointment System.
                  <br></br>

                                </p>
                                <div>

                                    <div class="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            id="defaultChecked2"
                                            onChange={() => handleAgrement()}
                                        />
                                        <label class="custom-control-label" for="defaultChecked2">
                                            I agree to the terms and conditions
                    </label>
                                        {needValidation ? (
                                            <div className="text-monospace">
                                                <p className="check-agree">
                                                    Please check this box if you want to proceed
                        </p>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            <div className="row align-center vertical-margin-2">
                                <div className="small-11 column">
                                    <div class="request-card card card--small-gutters card--shadow text-center row">
                                        <div class="small-12 medium-6 column">
                                            <a
                                                class="card card--link card--teal card--tile"
                                                onClick={
                                                    isAgreed
                                                        ? () => continueIndividual('individual')
                                                        : () => validate()
                                                }
                                            >
                                                <div class="card__content">
                                                    <i class="fas fa-user fa-7x"></i>
                                                    <p class="vertical-margin-1">
                                                        <span class="text-link--more-big text-link--light text-center">
                                                            Start Individual Appointment
                            </span>
                                                        <i class="fas fa-arrow-circle-right fa-2x arrow-icon-group"></i>
                                                    </p>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="small-12 medium-6 column vertical-margin-1-small vertical-margin-0-medium">
                                            <a
                                                class="card card--link card--teal card--tile"
                                                onClick={
                                                    isAgreed
                                                        ? () => continueTo('group')
                                                        : () => validate()
                                                }
                                            >
                                                <div class="card__content">
                                                    <i class="fas fa-users fa-7x"></i>
                                                    <p class="vertical-margin-1">
                                                        <span class="text-link--more-big text-link--light text-center">
                                                            Start Group Appointment
                            </span>
                                                        <i class="fas fa-arrow-circle-right fa-2x arrow-icon-group"></i>
                                                    </p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MDBCol>
                    <app-right-content
                        class="small-12 medium-4 large-offset-1 large-4 column sticky-container"
                        data-sticky-container=""
                        _nghost-kxs-c3=""
                    >
                        <aside
                            class="sidebar small sticky is-anchored is-at-top"
                            data-btm-anchor="request-an-appointment:bottom"
                            data-margin-top="2"
                            data-sticky="s2eunn-sticky"
                            data-sticky-on="medium"
                            data-top-anchor="180"
                            id="raa-sidebar"
                            data-resize="raa-sidebar"
                            data-mutate="raa-sidebar"
                            data-events="mutate"
                        >
                            <div class="sidebar__box sidebar__box--border ng-star-inserted">
                                <h4>Talk to an Appointment Scheduler</h4>
                                <ul class="vertical-margin-0">
                                    <li>
                                        <ul class="list--no-bullets list--single-line list--border">
                                            <li>
                                                <Link to="tel:8008817385">
                                                    <span class="show-for-sr">Call us at:</span>
                                                    <i class="fas fa-phone fa-rotate-180"></i>{' '}
                          800-881-7385{' '}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="tel:6147226200">
                                                    <span class="show-for-sr">Call us at:</span>
                                                    <i class="fas fa-phone fa-rotate-180"></i>{' '}
                          614-722-6200{' '}
                                                </Link>
                                            </li>
                                            <li>
                                                {' '}
                        7:30am – 5:30pm; Monday – Friday Eastern Time (ET).{' '}
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </aside>
                    </app-right-content>
                </MDBRow>
            </MDBContainer>
        </>
    );
}
export default IndividualandGroup;
