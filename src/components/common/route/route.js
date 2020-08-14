import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from '../../Home/HomePage';
import AboutPage from '../../ServicePage';
import CoursesPage from '../../Request Appointment/RequestAppointmentPage';
import CheckAvailablityPage from '../../CheckAvailablityPage';
import ManageBookingPage from '../../ManageBooking';
import CheckStatusPage from '../../CheckStatusPage';

function PassportRoute() {
  return (
    <>
      <Route path="/" exact component={HomePage} />
      <Route path="/request-appointment" component={CoursesPage} />
      <Route path="/service" component={AboutPage} />
      <Route path="/check-availablity" exact component={CheckAvailablityPage} />
      <Route path="/manage-booking" component={ManageBookingPage} />
      <Route path="/check-status" component={CheckStatusPage} />
    </>
  );
}
export default PassportRoute;
