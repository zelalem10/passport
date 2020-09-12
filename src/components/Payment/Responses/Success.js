import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter
    , MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { FcApproval } from "react-icons/fc";
const SuccessResponse = () => {
return (
<MDBContainer>
<MDBRow>
<MDBCol md="1">

</MDBCol>
<MDBCol md="6">
<MDBCard style={{marginTop: "1rem" }} className="text-center">
    <MDBCardHeader color="success-color"><FcApproval /> Payment completed</MDBCardHeader>
    <MDBCardBody>
      <MDBCardTitle>Special title treatment</MDBCardTitle>
      <MDBCardText>
        With supporting text below as a natural lead-in to additional
        content.
        With supporting text below as a natural lead-in to additional
        content.
        With supporting text below as a natural lead-in to additional
        content.
      </MDBCardText>
    </MDBCardBody>
  </MDBCard>

</MDBCol>

</MDBRow>
</MDBContainer>
);
};

export default SuccessResponse;