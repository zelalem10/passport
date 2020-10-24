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

const tokenValue = () => {
    const UserToken = localStorage.userToken;

    if (UserToken) {
        return UserToken;
    } else {
        const SystemToken = localStorage.systemToken;
        return SystemToken;
    }
};

const PaymentSelection = forwardRef((props, ref) => {
    const [selectedOption, setSelectedOption] = useState(0);
    const [paymentOptions, setPaymentOptions] = useState([]);
    const [message, setMessage] = useState('');
    const [code, setCode] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [dataSaved, setDataSaved] = useState(false);
    const [showError, setShowError] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const counter = useSelector((state) => state);
    const accesstoken = tokenValue();
    const serviceSelcetion = counter.service[counter.service.length - 1];
    const travelPlan = counter.travelPlan[counter.travelPlan.length - 1];
    const requestType = serviceSelcetion.appointemntType;
    const requestInfo = counter.request[counter.request.length - 1];
    const personalInformation = requestInfo ? requestInfo.personResponses : null;
    let requestId = requestInfo ? requestInfo.requestId : 0;
    const config = {
        headers: { Authorization: 'Bearer ' + accesstoken },
    };

    const [loading, setloading] = useState(true);
    useEffect(() => {
        API.get(
            'https://epassportservicesaddt.azurewebsites.net/Payment/api/V1.0/Payment/GetPaymentOptions',
            config
        )
            .then((todo) => {
                setPaymentOptions(todo.data.paymentOptions)
                setloading(false);
            })
            .catch((err) => {
                console.log('AXIOS ERROR: ', err);
                setloading(false);
            });
    }, []);
    const handelClick = (optionId, selectedCode) => {
        setCode(selectedCode)
        setSelectedOption(optionId);
    };
    const handelConfirm = (event) => {
        setConfirmed(event.target.checked)

    };
    useImperativeHandle(ref, () => ({

        saveData() {
            const priceInfo = counter.priceInfo[counter.priceInfo.length - 1];
            setDataSaved(true)
            if (confirmed === true) {
                if (selectedOption !== 0) {
                    const body = {
                        FirstName: personalInformation ? personalInformation.firstName : null,
                        LastName: personalInformation ? personalInformation.lastName : null,
                        Email: personalInformation ? personalInformation.email : null,
                        Phone: personalInformation ? personalInformation.phoneNumber : null,
                        Amount: priceInfo ? priceInfo.totalPrice : 0,
                        Currency: "ETB",
                        City: "Addis Ababa",
                        Country: "ET",
                        Channel: "Mobile",
                        PaymentOptionsId: selectedOption,
                        username: "ETHIOUSER",
                        password: "123456",
                        requestId: requestId,
                    };
                    setloading(true);
                    API.post("https://epassportservicesaddt.azurewebsites.net/Payment/api/V1.0/Payment/OrderRequest", body, config)
                        .then((resopnse) => {
                            dispatch(addPaymentOptionId(resopnse.data));
                            history.push('/InstructionPage')
                            setloading(false);
                        })
                        .catch((err) => {
                            console.log("AXIOS ERROR: ", err.response);
                            setMessage(err.response.statusText);
                            setShowError(true);
                            setloading(false);
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
            ) : (
                    <MDBContainer className="payment-container" fluid>
                        <MDBRow>
                            <MDBCol md="7">
                                {showError === true ? (<MDBAlert color="danger">{message}</MDBAlert>) : (null)}
                                <MDBRow>
                                    <article class="card">
                                        <div class="card-title">
                                            <h3 class="heading-secondary">Payment</h3>
                                        </div>
                                        <div class="card-body">
                                            <div class="payment-type">
                                                <h4>Choose payment method below</h4>
                                                {paymentOptions && typeof (paymentOptions) !== "undefined" ? (paymentOptions.map((paymentOption) => (
                                                    <div
                                                        class="types flex col-sm-12 justify-space-between"
                                                        onClick={() => handelClick(paymentOption.id, paymentOption.code)}
                                                    >
                                                        <div
                                                            class={`type ${paymentOption.id == selectedOption ? 'selected' : ''
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
                                                ))) : null}
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
                            <span style={{ color: "red" }}> {(selectedOption === 0 && dataSaved === true) ? "Please select a payment option" : null}</span>
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
                            <span style={{ color: "red" }}> {(confirmed === false && selectedOption > 0 && dataSaved === true) ? "Please confirm to agree to terms and conditions" : null}</span>

                        </div>
                    </MDBContainer>
                )}
        </div>
    );
});
export default PaymentSelection;
