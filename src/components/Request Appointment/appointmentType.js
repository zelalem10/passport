import React, { useState, useEffect } from 'react';
import { MDBRow, MDBContainer, MDBCol, MDBInput } from 'mdbreact';
import axios from 'axios';
import addAppointmentType from '../../redux/actions/appointmentType';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import Spinner from '../common/Spinner';
import axiosInstance from '../Utils/axios';
import deleteRequestInfo from '../../redux/actions/deleteRequestInfo';

function AppointmetType(props) {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const counter = useSelector((state) => state);
    const [requestTypes, setRequestTypes] = useState([]);
    const [loading, setloading] = useState(true);
    const baseUrl = 'https://epassportservicesaddt.azurewebsites.net/';

    useEffect(() => {
        axiosInstance.get('/Master/api/V1.0/OfficeRequestType/GetAllRequestTypes')
        .then(async (response) => {
            dispatch(addAppointmentType(response.data.requestTypes));
            setRequestTypes(response.data.requestTypes);
            setloading(false);
        })
        .catch((error) => {
            console.log('error' + error.response);
            setloading(false);
        });
        
    }, []);
    const continueTo = (e) => {
        e.preventDefault();
        props.nextStep();
    };
    const backTo = (e) => {
        e.preventDefault();
        props.prevStep();
    };
    const { handleAppointmentType, handleIsUrgent } = props;
    const { isItGroup } = props;
    const { values } = props;
    if(counter.request){
        if(counter.request[counter.request.length-1]){
 
        
    dispatch(deleteRequestInfo([]));
        }
    }
    return (<div>{loading ? (
        <Spinner />
      ) : (
        <MDBContainer
            className="passport-container pt-3"
            id="request-an-appointment"
            fluid
        >
            <MDBRow>
                <MDBCol className="medium-8" sm="12" lg="7">
                    <div className="multistep-form__step">
                        <h2 className="h1"><Trans>requestAppointment.scheduleForAppointment</Trans></h2>

                        <div className="rtf"></div>
                        <div className="row align-center vertical-margin-2">
                            <div className="small-11 column request-type">
                                <div class="request-card card card--small-gutters card--shadow text-center row ">
                                    {requestTypes.map((request) => (
                                        <a
                                            onClick={() =>
                                                request.id !== 3
                                                    ? props.DoubleNextStep(request.id)
                                                    : handleAppointmentType(request.id)
                                            }
                                            class="small-12 column row card--link vertical-margin-1"
                                        >
                                            <div class="small-12 medium-4 column card card--small-gutters card--teal flex flex--column align-center text-center">
                                                <strong>{request.type} Appointment</strong>
                                                <div class="text-center vertical-margin-half">
                                                    <i class="fas fa-arrow-circle-right fa-lg"></i>
                                                </div>
                                            </div>
                                            <div class="small-12 medium-8 column card card--small-gutters card--gray rtf rtf--small bold text-justify">
                                                <p>{request.descrption}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <a class="button hollow gray vertical-margin-2 " onClick={backTo}>
                            <i class="fas fa-arrow-left"></i> 
                            <Trans>requestForm.previous</Trans>
            </a>
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
                                <h4>
                                <Trans>requestAppointment.cardTiltle</Trans>  
                                    </h4>
                                        <ul class="list--no-bullets list--single-line list--border">
                                            <li>
                                                <a href="tel:8133">
                                                    <i class="fas fa-phone fa-rotate-180"></i>{' '}
                                                    8133 FREE CALL
                                                </a>
                                            </li>
                                            <li>
                                                <a href="mailto:support@ethiopianpassportservices.gov.et">
                                                    <i class="fas fa-envelope"></i>{' '}
                                                    support@ethiopianpassportservices.gov.et
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <Trans>requestAppointment.time</Trans>  
                                            </li>
                                        </ul>
                                   
                            </div>
                        </aside>
                    <div class="multistep-form__details sidebar__box sidebar__box--border sidebar__box--teal ng-star-inserted">
                        <h4>
                            <span class="ng-star-inserted"><Trans>requestAppointment.appointmentRequest</Trans></span>
                        </h4>
                        <ul class="list--no-indent list--no-bullets ng-star-inserted">
                            <li>
                                <strong>
                                <Trans>requestAppointment.requestor</Trans>{isItGroup ? ' Group / ' + values : ' Individual'}
                                </strong>
                            </li>
                        </ul>
                    </div>
                </app-right-content>
            </MDBRow>
        </MDBContainer>
    )}</div> );
}
export default AppointmetType;
