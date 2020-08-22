import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from '../../Home/HomePage';
import AboutPage from '../../ServicePage';
import CoursesPage from '../../Request Appointment/RequestAppointmentPage';
import CheckAvailablityPage from '../../CheckAvailablityPage';
import ManageBookingPage from '../../ManageBooking';
import CheckStatusPage from '../../CheckStatusPage';
import SignUp from '../../UserManagement/SignUp';
import ApplicationList from '../../Application List/ApplicationList';
import FAQ from '../../Help and Support/FAQ';
import Status from '../../Status/Status';
import SignIn from '../../UserManagement/SignIn';

function PassportRoute() {
  return (
    <>
      <Route path="/" exact component={HomePage} />
      <Route path="/request-appointment" component={CoursesPage} />
      <Route path="/service" component={AboutPage} />
      <Route path="/check-availablity" exact component={CheckAvailablityPage} />
      <Route path="/manage-booking" component={ManageBookingPage} />
      <Route path="/check-status" component={CheckStatusPage} />
      <Route path="/signup" component={SignUp} />
      <Route path="/Application-List" component={ApplicationList} />
      <Route path="/Faq" component={FAQ} />
      <Route path="/Status" component={Status} />
      <Route path="/SignIn" component={SignIn} />
    </>
  );
}
export default PassportRoute;
