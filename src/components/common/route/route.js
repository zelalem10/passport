import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from '../../Home/HomePage';
import AboutPage from '../../ServicePage';
import CheckAvailablityPage from '../../CheckAvailablityPage';
import ManageBookingPage from '../../ManageBooking';
import CheckStatusPage from '../../CheckStatusPage';
import RequestStepper from '../../RequestStepper/RequestStepper'
import Login from '../../UserManagement/SignIn'
import SignUp from '../../UserManagement/SignUp'
import CustomizedAccordions from '../../display/viewAppointment';
import ApplicationList from '../../Application List/ApplicationList';
import FAQ from '../../Help and Support/FAQ';
import Status from '../../Status/Status';
import SignIn from '../../UserManagement/SignIn';
import ServiceSelection from '../../Request Appointment/ServiceSelection';

function PassportRoute() {
  return (
    <>
      <Route path="/" exact component={HomePage} />
      <Route path="/request-appointment" component={ServiceSelection} />
      <Route path="/service" component={CustomizedAccordions} />
      <Route path="/check-availablity" exact component={CheckAvailablityPage} />
      <Route path="/manage-booking" component={ManageBookingPage} />
      <Route path="/check-status" component={CheckStatusPage} />
      <Route path="/request-stepper" component={RequestStepper} />
      <Route path="/SignIn" component={Login} />
      <Route path="/SignUp" component={SignUp} />
      <Route path="/signup" component={SignUp} />
      <Route path="/Application-List" component={ApplicationList} />
      <Route path="/Faq" component={FAQ} />
      <Route path="/Status" component={Status} />
      <Route path="/SignIn" component={SignIn} />
    </>
  );
}
export default PassportRoute;
