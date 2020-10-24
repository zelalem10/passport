import React, { useEffect, useState } from 'react'
import './App.css';
import NavbarPage from './components/common/Header';
import { useLocation } from 'react-router-dom';
import FooterPage from './components/common/footer';
import PassportRoute from './components/common/route/route';
import SystemToken from './components/common/route/systemToken';
import pss from './components/Payment/PaymentSelection'

function App() {
    const location = useLocation();

    return (
        <>
            <SystemToken />
            <NavbarPage location={location} />
            <PassportRoute />
            <FooterPage />

        </>
    );
}

export default App;
