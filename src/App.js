import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import AboutPage from './components/ServicePage';
import NavbarPage from './components/common/Header';
import CoursesPage from './components/RequestAppointmentPage';
import { Route } from 'react-router-dom';

function App() {
  return (
    <>
      <NavbarPage />
      <Route path="/" exact component={HomePage} />
      <Route path="/request-appointment" component={CoursesPage} />
      <Route path="/service" component={AboutPage} />
    </>
  );
}

export default App;
