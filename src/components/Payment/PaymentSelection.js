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
  MDBAlert,
} from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import addPaymentOptionId from '../../redux/actions/addPaymentOptionIdAction';
import { makeStyles } from '@material-ui/core/styles';
import API from '../Utils/API';
import token from '../common/accessToken';
import Response from './Responses/Confirmation';
import PricingInfo from './PricingDetail'
import { useHistory } from 'react-router-dom';
import Spinner from '../common/Spinner';

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
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [instruction, setInstruction] = useState('');
  const [message, setMessage] = useState('');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [dataSaved, setDataSaved] = useState(false);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const counter = useSelector((state) => state);
  const accesstoken = localStorage.systemToken;
  const serviceSelcetion = counter.service[counter.service.length - 1];
  const travelPlan = counter.travelPlan[counter.travelPlan.length - 1];
  const requestType = serviceSelcetion.appointemntType;
  const requestInfo = counter.request[counter.request.length - 1];
  let requestId = requestInfo? requestInfo.requestId:0;
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
        setMessage(todo.data.message);
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
  const [loading, setloading] = useState(true);
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
  const handelClick = (optionId,selectedCode) => {
    setCode(selectedCode)
    setSelectedOption(optionId);
  };
  const handelConfirm = (event) => {
    setConfirmed(event.target.checked)
    
  };
  useImperativeHandle(ref, () => ({
    
    saveData() {
    const priceInfo= counter.priceInfo[counter.priceInfo.length - 1];
    setDataSaved(true)
    if(confirmed===true){
      if(selectedOption !== 0){
        const body = {
          FirstName : "test",
          LastName:"Zelalem",
          Email:"Zelalem@gmail.com",
          Phone:"+251944772496",
          Amount:priceInfo? priceInfo.totalPrice:0,
          Currency:"ETB",
          City:"Addis Ababa",
          Country:"ET",
          Channel:"Mobile",
          PaymentOptionsId:selectedOption,
          username : "ETHIOUSER",
          password : "123456",
          requestId: requestId,
        };
        console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
        API.post("https://epassportservices.azurewebsites.net/Payment/api/V1.0/Payment/OrderRequest", body, config)
          .then((resopnse) => {
            debugger;
            dispatch(addPaymentOptionId(resopnse.data));
            history.push('/InstructionPage')
          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err.response);
            setMessage(err.response.statusText);
            setShowError(true);
          })
      }
    }
    },
    isCompleted() {
      // if(formCompleted===true){
      //   return true;
      // }
      // else{
        return false;
      //}
    },
  }));
  return (
    <div>
    {loading ? (
      <Spinner />
    ):(
    <MDBContainer className="payment-container" fluid>
      <MDBRow>
        <MDBCol md="7">
          {showError===true?(<MDBAlert color="danger">{message}</MDBAlert>):(null)}
          <MDBRow>
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
                      onClick={() => handelClick(paymentOption.id, paymentOption.code)}
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
          <PricingInfo requestId={requestId} />
        </div>
        
        
        
      </MDBRow>
      <MDBRow>
      <span style={{ color: "red" }}> {(selectedOption === 0 && dataSaved=== true) ? "Please select a payment option" : null}</span>
      </MDBRow>
      <hr />
      <div class="custom-control custom-checkbox">
        <input
          type="checkbox"
          class="custom-control-input"
          id="defaultUncheckedDisabled2"
          onChange={handelConfirm}
          indeterminate
        />
        <label class="custom-control-label" for="defaultUncheckedDisabled2">
          Agree to terms and conditions
        </label><br />
        <span style={{ color: "red" }}> {(confirmed === false && selectedOption>0 && dataSaved=== true) ? "Please confirm to agree to terms and conditions" : null}</span>
        
      </div>
    </MDBContainer>
  )}
  </div>
  );
});
export default PaymentSelection;
