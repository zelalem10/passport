import React, { useEffect, useState } from 'react'
import './App.css';
import NavbarPage from './components/common/Header';
import { useLocation } from 'react-router-dom';
import FooterPage from './components/common/footer';
import PassportRoute from './components/common/route/route';
import SystemToken from './components/common/route/systemToken';

function App() {
  const location = useLocation();
  return (
    <>
      <NavbarPage location={location} />
      <PassportRoute />
      <FooterPage />
      <SystemToken />
      
    </>
  );
}

export default App;
