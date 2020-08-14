import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import AboutPage from './components/ServicePage';
import NavbarPage from './components/common/Header';
import CoursesPage from './components/RequestAppointmentPage';
import SignInPage from './components/UserManagement/SignIn'
import SignUpPage from './components/UserManagement/SignUp'
import RequestStepper from './components/RequestStepper/RequestStepper'
import { Route } from 'react-router-dom';

function App() {
  return (
    <>
      <NavbarPage />
      <Route path="/" exact component={RequestStepper} />
      <Route path="/request-appointment" component={CoursesPage} />
      <Route path="/service" component={AboutPage} />

      <Route path="/signIn" component={SignInPage} />
      <Route path="/signUp" component={SignUpPage} />
    </>
  );
}

export default App;
