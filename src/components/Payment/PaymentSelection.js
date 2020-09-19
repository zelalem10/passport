import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { MDBBtn, MDBInput, MDBCard, MDBCardHeader, MDBContainer, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import addCommonData from '../../redux/actions/addCommonDataAction';

import { makeStyles } from '@material-ui/core/styles';

import API from '../Utils/API'
import token from '../common/accessToken'
import Response from './Responses/Confirmation'


const useStyles = makeStyles({
    root: {
        //   minWidth: 275,
        border: `5px solid green`,
        //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
});
const PaymentSelection = forwardRef((props, ref) => {
    const [selectedOption, setSelectedOption] = useState();
    const [optionSelected, setOptionSelected] = useState(false);
    const [paymentOptions, setPaymentOptions] = useState([]);
    const [requestSubmited, setRequestSubmited] = useState(false);
    const [instruction, setInstruction] = useState("");
    const [message, setMessage] = useState("");
    const [flowType, setFlowType] = useState(0);
    const [status, setStatus] = useState(0);
    const [formCompleted, setFormCompleted] = useState(false);
    const [test, setTest] = useState({id:10});
  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
    const accesstoken = localStorage.systemToken;
    const config = {
        headers: { Authorization: "Bearer " + accesstoken }
    };
    const classes = useStyles();
    function getSelectedOption(id) {
        const config = {
            headers: { Authorization: token }
        };
        const body = {
            firstName: 'Atalay',
            lastName: 'Tilahun',
            email: 'atehun@gmail.com',
            phone: "0932876051",
            amount: 10,
            currency: "ETB",
            city: "Addis Ababa",
            country: "Ethiopia",
            channel: "Amole",
            paymentOptionsId: id,
            traceNumbers: "",
            Status: 4,
            OrderId: "",
            otp: "",
            requestId: 3,
        };
        API.post("https://epassportservices.azurewebsites.net/Payment/api/V1.0/Payment/OrderRequest", body, config)
            .then((todo) => {
                console.log(todo.data)
                setStatus(todo.data.status)
                setInstruction(todo.data.instruction)
                setFlowType(todo.data.paymentFlowType)
                setMessage(todo.data.message)
                setRequestSubmited(true)
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err.response);
            })
    }
    function getContent(paymentFlowType) {
        switch (paymentFlowType) {
            case 1:
                return <Response instruction={instruction} message={message} status={status} />
        }
    }
    useEffect(() => {
        API.get("https://epassportservices.azurewebsites.net/Payment/api/V1.0/Payment/GetPaymentOptions", config)
            .then((todo) => setPaymentOptions(todo.data.paymentOptions))
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    }, [])
    const handelClick = (optionId) => {
        setSelectedOption(optionId);
        const selectedId={optionId:optionId}
        dispatch(addCommonData(selectedId))
        console.log(optionId)
        //setOptionSelected(true);
    }
    const handelConfirm = (event) => {
        setFormCompleted(event.target.checked)
    }
    useImperativeHandle(ref, () => ({
        isCompleted() {
            return formCompleted;
        }
    }));
    return (
        
        <MDBContainer>
            <MDBCard style={{ marginTop: "1rem" }}>
                <MDBCardHeader color="primary-color" tag="h3">
                    Select payment option to pay
                 </MDBCardHeader>
                <MDBRow>
                    <MDBCol md="8">
                        <MDBCardBody>
                            <MDBRow>
                                {paymentOptions.map((paymentOption) =>
                                    <MDBCol md="4">
                                        <MDBCard className={selectedOption === paymentOption.id ? classes.root : ""}
                                            style={{ marginBottom: "5px" }} onClick={() => handelClick(paymentOption.id)}>
                                            <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/50.jpg"
                                                waves />
                                            {/* <MDBCardBody> */}
                                            <MDBCardTitle>{paymentOption.name}</MDBCardTitle>
                                            {/* <MDBCardText>{paymentOption.instruction}</MDBCardText> */}
                                            {/* </MDBCardBody> */}
                                            {/* <MDBBtn onClick={() => getSelectedOption(paymentOption.id)}>Select</MDBBtn> */}
                                        </MDBCard>
                                    </MDBCol>
                                )
                                }
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCol>

                    <MDBCol md="4">
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
                                    <h4>Pricing Details</h4>
                                    <ul class="vertical-margin-0">
                                        <li>
                                            <ul class="list--no-bullets list--single-line list--border">
                                                <li>
                                                    <a href="tel:8008817385">
                                                        <span class="show-for-sr">Call us at:</span>
                                                        <i class="fas fa-phone fa-rotate-180"></i>{' '}
                                                              800-881-7385{' '}
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="tel:6147226200">
                                                        <span class="show-for-sr">Call us at:</span>
                                                        <i class="fas fa-phone fa-rotate-180"></i>{' '}
                                                          614-722-6200{' '}
                                                    </a>
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
                    </MDBCol>
                </MDBRow>

            </MDBCard>
            
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="defaultUncheckedDisabled2" onChange={handelConfirm} indeterminate />
                <label class="custom-control-label" for="defaultUncheckedDisabled2">Agree to terms and conditions</label>
            </div>
        </MDBContainer>
        
    )
});
export default PaymentSelection