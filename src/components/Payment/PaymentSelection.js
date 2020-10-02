import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  MDBBtn,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge,
  MDBCard,
  MDBCardHeader,
  MDBContainer,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBRow,
} from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import addPaymentOptionId from '../../redux/actions/addPaymentOptionIdAction';

import { makeStyles } from '@material-ui/core/styles';

import API from '../Utils/API';
import token from '../common/accessToken';
import Response from './Responses/Confirmation';
import PricingInfo from './PricingDetail'

const useStyles = makeStyles({
  root: {
    //   minWidth: 275,
    border: `5px solid green`,
    //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
});
function requestTypeGetter(requetTypeId) {
  switch (requetTypeId) {
    case 2:
      return 'New';
    case 3:
      return 'Renew/Replacement';
    case 4:
      return 'Lost';
    case 8:
      return 'Correction';
    default:
      return 'Unkown';
  }
}
const PaymentSelection = forwardRef((props, ref) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [optionSelected, setOptionSelected] = useState(false);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [requestSubmited, setRequestSubmited] = useState(false);
  const [instruction, setInstruction] = useState('');
  const [message, setMessage] = useState('');
  const [flowType, setFlowType] = useState(0);
  const [status, setStatus] = useState(0);
  const [formCompleted, setFormCompleted] = useState(false);
  const [dataSaved, setDataSaved] = useState(false);
  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  const accesstoken = localStorage.systemToken;
  const serviceSelcetion = counter.service[counter.service.length - 1];
  const travelPlan = counter.travelPlan[counter.travelPlan.length - 1];
  const requestType = serviceSelcetion.appointemntType;
  const requestTypeStr = requestTypeGetter(requestType);
  const config = {
    headers: { Authorization: 'Bearer ' + accesstoken },
  };
  const classes = useStyles();
  function getSelectedOption(id) {
    const config = {
      headers: { Authorization: token },
    };
    const body = {
      firstName: 'Atalay',
      lastName: 'Tilahun',
      email: 'atehun@gmail.com',
      phone: '0932876051',
      amount: 10,
      currency: 'ETB',
      city: 'Addis Ababa',
      country: 'Ethiopia',
      channel: 'Amole',
      paymentOptionsId: id,
      traceNumbers: '',
      Status: 4,
      OrderId: '',
      otp: '',
      requestId: 3,
    };
    API.post(
      'https://epassportservices.azurewebsites.net/Payment/api/V1.0/Payment/OrderRequest',
      body,
      config
    )
      .then((todo) => {
        console.log(todo.data);
        setStatus(todo.data.status);
        setInstruction(todo.data.instruction);
        setFlowType(todo.data.paymentFlowType);
        setMessage(todo.data.message);
        setRequestSubmited(true);
      })
      .catch((err) => {
        console.log('AXIOS ERROR: ', err.response);
      });
  }
  function getContent(paymentFlowType) {
    switch (paymentFlowType) {
      case 1:
        return (
          <Response
            instruction={instruction}
            message={message}
            status={status}
          />
        );
    }
  }

  useEffect(() => {
    API.get(
      'https://epassportservices.azurewebsites.net/Payment/api/V1.0/Payment/GetPaymentOptions',
      config
    )
      .then((todo) => setPaymentOptions(todo.data.paymentOptions))
      .catch((err) => {
        console.log('AXIOS ERROR: ', err);
      });
  }, []);
  const handelClick = (optionId) => {
    setSelectedOption(optionId);
  };
  const handelConfirm = (event) => {
    setFormCompleted(event.target.checked);
  };
  useImperativeHandle(ref, () => ({
    saveData() {
      const selectedId = { optionId: selectedOption };
    dispatch(addPaymentOptionId(selectedId));
      setDataSaved(true)
    },
    isCompleted() {
      return formCompleted;
    },
  }));
  return (
    <MDBContainer className="payment-container" fluid>
      <MDBRow>
        <MDBCol md="8">
          <MDBRow>
            {/* {paymentOptions.map((paymentOption) => (
                  <MDBCol md="4" style={{ marginTop: '2rem' }}>
                    <MDBCard
                      className={
                        selectedOption === paymentOption.id ? classes.root : ''
                      }
                      style={{ marginBottom: '5px' }}
                      onClick={() => handelClick(paymentOption.id)}
                    >
                      <MDBCardImage
                        className="img-fluid"
                        style={{ height: '80px', width: '100%' }}
                        src={paymentOption.imageUrl}
                        waves
                      />
                      
                      <MDBCardTitle>
                        <MDBRow>
                          <MDBCol md="4"></MDBCol>
                          <MDBCol md="8">{paymentOption.name}</MDBCol>
                        </MDBRow>
                      </MDBCardTitle>
                    </MDBCard>
                  </MDBCol>
                ))} */}

            <article class="card">
              <div class="card-title">
                <h3 class="heading-secondary">Payment</h3>
              </div>
              <div class="card-body">
                <div class="payment-type">
                  <h4>Choose payment method below</h4>
                  {paymentOptions.map((paymentOption) => (
                    <div
                      class="types flex col-sm-12 justify-space-between"
                      onClick={() => handelClick(paymentOption.id)}
                    >
                      <div
                        class={`type ${
                          paymentOption.id == selectedOption ? 'selected' : ''
                        }`}
                      >
                        <div class="logo">
                          {/* <i class="far fa-credit-card"></i> */}
                          <img
                            class="payment-card-logo"
                            src={paymentOption.imageUrl}
                          ></img>
                        </div>
                        <div class="text">
                          <p>Pay with {paymentOption.name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </MDBRow>
        </MDBCol>
        <div class="col-md-4 order-md-2 mb-4 mt-5">
          <h4 class="d-flex justify-content-between align-items-center mb-4-5">
            <span class="text-muted">
              <strong>Pricing Information</strong>
            </span>
          </h4>
          <PricingInfo />
          {/* <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 class="my-0">Request type</h6>
              </div>
              <span class="text-muted">{requestTypeStr}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 class="my-0">Request Mode</h6>
              </div>
              <span class="text-muted">
                {serviceSelcetion.isUrgent ? 'Urgent' : 'Normal'}
              </span>
            </li>

            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 class="my-0">Page quantity</h6>
              </div>
              <span class="text-muted">32</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>Total Price (ETB)</span>
              <strong>600</strong>
            </li>
          </ul> */}
        </div>
        
        
        {/* <MDBCol md="4">
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
                <h4>Pricing Information</h4>
                <MDBListGroup>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                    Request type
                    <MDBBadge color="primary" pill>
                      {requestTypeStr}
                    </MDBBadge>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                    Request Mode
                    <MDBBadge color="primary" pill>
                      {serviceSelcetion.isUrgent ? 'Urgent' : 'Normal'}
                    </MDBBadge>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                    Total Price
                    <MDBBadge color="primary" pill>
                      600
                    </MDBBadge>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                    Page quantity
                    <MDBBadge color="primary" pill>
                      32
                    </MDBBadge>
                  </MDBListGroupItem>
                </MDBListGroup>
              </div>
            </aside>
          </app-right-content>
        </MDBCol> */}
      </MDBRow>

      <div class="custom-control custom-checkbox">
        <input
          type="checkbox"
          class="custom-control-input"
          id="defaultUncheckedDisabled2"
          onChange={handelConfirm}
          indeterminate
        />
        <span style={{ color: "red" }}> {(formCompleted === false && dataSaved=== true) ? "Please confirm to agree to terms and conditions" : null}</span>
        <label class="custom-control-label" for="defaultUncheckedDisabled2">
          Agree to terms and conditions
        </label>
      </div>
    </MDBContainer>
  );
});
export default PaymentSelection;
