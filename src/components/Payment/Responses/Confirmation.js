import React, { useEffect, useState } from 'react';
import {
  MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter
  , MDBContainer, MDBRow, MDBCol
} from "mdbreact";
import { FcApproval } from "react-icons/fc";
import { FcDisapprove } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import addPaymentOptionId from '../../../redux/actions/addPaymentOptionIdAction';
import API from '../..//Utils/API'
import Spinner from '../../common/Spinner';

const SuccessResponse = (props) => {
  const [requestSubmited, setRequestSubmited] = useState(false);
  const [instruction, setInstruction] = useState("");
  const [message, setMessage] = useState("");
  const [flowType, setFlowType] = useState(0);
  const [status, setStatus] = useState(0);
  function getContent(paymentFlowType) {
    switch (paymentFlowType) {
      case 1:
        return (<MDBContainer>
          <MDBRow>
            <MDBCol md="1">
            </MDBCol>
            <MDBCol md="6">
              <MDBCard style={{ marginTop: "1rem" }} className="text-center">
                {status === 1 ? (<MDBCardHeader color="success-color"><FcApproval /> Payment completed</MDBCardHeader>) :
                  (<MDBCardHeader color="danger-color"><FcDisapprove /> Payment not completed</MDBCardHeader>)}
                <MDBCardBody>
                  <MDBCardTitle>{message}</MDBCardTitle>
                  <MDBCardText>{instruction}</MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>)
        default:
          return(<MDBContainer>
            <MDBRow>
              <MDBCol md="6">
                <MDBCard style={{ marginTop: "1rem" }} className="text-center">
                  <MDBCardBody>
                    <MDBCardTitle>Payment option not working</MDBCardTitle>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>)
    }
  }
  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  const selectedId = { optionId: 0 }
  var selectedOption = counter.paymentOption[counter.paymentOption.length - 1]
  console.log(selectedOption)
  //useEffect(() => {
    const accesstoken = localStorage.systemToken;
    const config = {
      headers: { Authorization: "Bearer " + accesstoken }
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
      channel: "Mobile",
      paymentOptionsId: selectedOption ? selectedOption.optionId : 0,
      traceNumbers: "",
      Status: 4,
      OrderId: "",
      otp: "",
      requestId: 3,
    };
    API.post("https://epassportservices.azurewebsites.net/Payment/api/V1.0/Payment/OrderRequest", body, config)
      .then((todo) => {
        //console.log(todo.data)
        setStatus(todo.data.status)
        setInstruction(todo.data.instruction)
        setFlowType(todo.data.paymentFlowType)
        setMessage(todo.data.message)
        setRequestSubmited(true)
      })
      .catch((err) => {
        //console.log("AXIOS ERROR: ", err.response);
      })
//}, [])
  
  return (

    <MDBContainer>
      <MDBCard>
        <MDBCardBody>
          <form>
            {requestSubmited === false ?
              (<Spinner />)
              :
              (getContent(flowType))
            }
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>

  );
};

export default SuccessResponse;