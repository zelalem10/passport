import React from 'react';
import './App.css';
import NavbarPage from './components/common/Header';
import { useLocation } from 'react-router-dom';
import FooterPage from './components/common/footer';
import PassportRoute from './components/common/route/route';

function App() {
  const location = useLocation();
  return (
    <>
      <NavbarPage location={location} />
      <PassportRoute />
      <FooterPage />
    </>
  );
}

export default App;
