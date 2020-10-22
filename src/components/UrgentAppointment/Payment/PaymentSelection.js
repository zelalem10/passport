import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { MDBContainer, MDBCol, MDBRow } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import addPaymentOptionId from '../../../redux/actions/addPaymentOptionIdAction';
import InstructionPage from './InstructionPage';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import BasicTable from './PricingDetail';

import API from '../../Utils/API';

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
  const { handlePaymentId,status,backToList } = props;
  const [selectedOption, setSelectedOption] = useState();
  const [optionSelected, setOptionSelected] = useState('');
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [procced, setProcced] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formCompleted, setFormCompleted] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const appList = data.applicationList[data.applicationList.length - 1];
  let displayedApplication = {};
  let history = useHistory();
if(status){
  if (appList.hasOwnProperty('requestId')?appList.requestId == handlePaymentId:false) {
    displayedApplication = appList;
  }
}else{
  for (let item in appList) {
    if (appList[item].requestId == handlePaymentId) {
      displayedApplication = appList[item];
    }
  }
}
  const personalInformation = displayedApplication.personResponses;
  const accesstoken = localStorage.systemToken;
  const requestType = displayedApplication.requestTypeId;
  const requestTypeStr = requestTypeGetter(requestType);
  const config = {
    headers: { Authorization: 'Bearer ' + accesstoken },
  };
  const priceDetail = data.priceInfo[data.priceInfo.length - 1];
  const handleProcced = () => {
    if (formCompleted && optionSelected) {
      const body = {
        firstName: personalInformation.firstName,
        lastName: personalInformation.middleName,
        email: personalInformation.email,
        phone: personalInformation.phoneNumber,
        amount: priceDetail ? priceDetail.totalAmount : 0,
        currency: 'ETB',
        city: 'Addis Ababa',
        country: 'Ethiopia',
        channel: 'Amole',
        paymentOptionsId: selectedOption,
        traceNumbers: '',
        Status: 4,
        OrderId: '',
        otp: '',
        requestId: displayedApplication.requestId,
      };
      API.post(
        'https://epassportservicesaddt.azurewebsites.net/Payment/api/V1.0/Payment/OrderRequest',
        body,
        config
      )
        .then((resopnse) => {
          dispatch(addPaymentOptionId(resopnse.data));
          setProcced(true);
        })
        .catch((err) => {
          setErrorMessage(err.response.data.message);
        });
    } else if (!formCompleted && optionSelected) {
      setErrorMessage('Please check this box if you want to proceed');
    } else if (formCompleted && !optionSelected) {
      setErrorMessage('Please Choose payment method');
    } else {
      setErrorMessage(
        'Please Choose payment method and check this box if you want to proceed'
      );
    }
  };
  const classes = useStyles();

  useEffect(() => {
    API.get(
      'https://epassportservicesaddt.azurewebsites.net/Payment/api/V1.0/Payment/GetPaymentOptions',
      config
    )
      .then((todo) => setPaymentOptions(todo.data.paymentOptions))
      .catch((err) => {
        console.log('AXIOS ERROR: ', err);
      });
  }, []);

  const handelClick = (optionId) => {
    setSelectedOption(optionId);
    setOptionSelected(optionId);
    const selectedId = { optionId: optionId };
    dispatch(addPaymentOptionId(selectedId));
  };
  const handelConfirm = (event) => {
    setFormCompleted(event.target.checked);
  };

  if (formCompleted && optionSelected && procced) {
    return <InstructionPage passportPage={personalInformation.passportRes.passportPage} />;
  } else {
    return (
      <MDBContainer className="passport-container payment-container" fluid>
        <MDBRow>
          <MDBCol md="8">
            <MDBRow>
              <article class="card">
                <div class="card-title">
                  <h3 class="heading-secondary">Payment</h3>
                </div>
                <div class="card-body">
                  <div class="payment-type">
                    <h4>Choose payment method</h4>
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

            <BasicTable
              handlePaymentId={handlePaymentId}
              firstName={personalInformation.firstName}
              lastName={personalInformation.lastName}
            />
          </div>
        </MDBRow>
        <MDBCol md="8">
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
            </label>
            {errorMessage ? (
              <div className="text-monospace">
                <p className="check-agree">{errorMessage}</p>
              </div>
            ) : null}
          </div>

          <div class="pt-3 multistep-form__step">
            <a class="button hollow gray vertical-margin-2 ng-star-inserted"
            onClick={()=>backToList()}>
              <i class="fas fa-arrow-left"></i> Return to My Applications
            </a>
            <a
              class="specialty-next-step button float-right vertical-margin-2"
              onClick={() => handleProcced()}
            >
              {' '}
              Proceed <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </MDBCol>
      </MDBContainer>
    );
  }
});

export default PaymentSelection;
