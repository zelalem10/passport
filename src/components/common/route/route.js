import React, { useState } from "react";
import { Route } from "react-router-dom";
import HomePage from "../../Home/HomePage";
import ServicePage from "../../ServicePage";
import CheckAvailablityPage from "../../CheckAvailablityPage";
import ManageBookingPage from "../../ManageBooking";
import CheckStatusPage from "../../CheckStatusPage";
import RequestStepper from "../../RequestStepper/RequestStepper";
import Login from "../../UserManagement/SignIn";
import SignUp from "../../UserManagement/SignUp";
import ViewAppointment from "../../Application List/viewAppointment";
import ApplicationList from "../../Application List/ApplicationList";
import FAQ from "../../Help and Support/FAQ";
import Information from "../../Help and Support/Information";
import MainStatus from "../../Status/mainStatus";
import ServiceSelection from "../../Request Appointment/ServiceSelection";
import PayWithPSS from "../../Payment/PayWithPSS";
import contactUs from "../../Help and Support/contactUs";
import about from "../../Help and Support/about";
import confirmationPage from "../../confirmationPage";
import InstructionPage from "../../Payment/Responses/InstructionPage";
import GetContent from "../../UrgentAppointment/Payment/PaymentSelection";

function PassportRoute() {
  //   childUrl = window.open('/preview', '_blank')
  // childUrl.document.open('text/html', 'replace')
  // childUrl.document.write(htmlContent)
  return (
    <>
      <Route path="/" exact component={HomePage} />
      <Route path="/request-appointment" component={ServiceSelection} />
      <Route path="/service" component={ServicePage} />
      <Route path="/check-availablity" exact component={ViewAppointment} />
      <Route path="/manage-booking" component={ManageBookingPage} />
      <Route path="/check-status" component={CheckStatusPage} />
      <Route path="/request-stepper" component={ServiceSelection} />
      <Route path="/SignIn" component={Login} />
      <Route path="/SignUp" component={SignUp} />
      <Route path="/Application-List" component={ApplicationList} />
      <Route path="/Faq" component={FAQ} />
      <Route path="/Status" component={MainStatus} />
      <Route path="/Information" component={Information} />

      <Route path="/Confirmation" component={confirmationPage} />
      <Route path="/InstructionPage" component={InstructionPage} />

      <Route path="/Pay_With_PSS" component={PayWithPSS} />
      <Route path="/contactUs" component={contactUs} />
      <Route path="/about" component={about} />
      <Route path="/urgentAppointmentPayment" component={GetContent} />
    </>
  );
}
export default PassportRoute;
