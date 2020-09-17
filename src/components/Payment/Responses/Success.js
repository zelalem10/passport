import React, {useEffect, useState} from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter
    , MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { FcApproval } from "react-icons/fc";
import { FcDisapprove } from "react-icons/fc";
const SuccessResponse = (props) => {

  useEffect(() => {
}, [])
return (
<MDBContainer>
<MDBRow>
<MDBCol md="1">

</MDBCol>
<MDBCol md="6">
<MDBCard style={{marginTop: "1rem" }} className="text-center">
{props.status===1?(<MDBCardHeader color="success-color"><FcApproval /> Payment completed</MDBCardHeader>):
(<MDBCardHeader color="danger-color"><FcDisapprove /> Payment not completed</MDBCardHeader>)}
    <MDBCardBody>
      <MDBCardTitle>{props.message}</MDBCardTitle>
      <MDBCardText>{props.instruction}</MDBCardText>
    </MDBCardBody>
  </MDBCard>
</MDBCol>
</MDBRow>
</MDBContainer>
);
};

export default SuccessResponse;