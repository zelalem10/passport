import React, { useState, useEffect } from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBContainer,
  MDBCardHeader,
  MDBNavLink,
  MDBCardBody,
  MDBLink,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBRow,
} from 'mdbreact';
import PaymentSelection from '../Payment/PaymentSelection';
import API from '../Utils/API';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from 'react-html-parser';

const PayWithPSS = () => {
  const [contentResponse, setContentResponse] = useState('');
  const [returnBack, setReturnBack] = useState(false);
  const [responseGot, setResponseGot] = useState(false);

  function hadndelBack() {
    setReturnBack(true);
  }
  const accesstoken = localStorage.systemToken;
  const config = {
    headers: { Authorization: 'Bearer ' + accesstoken },
  };
  const localConfig = {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiYXRhbGF5IiwibmJmIjoxNjAxMzcwMDIyLCJleHAiOjE2MDEzODQ0MjIsImlhdCI6MTYwMTM3MDAyMn0.WB-wbxZCoOP7LnUHLu_UHpznFg9gtH11_JH9ipXHRHs',
      'content-type': 'application/json',
      Accept: 'application/json',
    },
  };
  const prodURL =
    'https://epassportservices.azurewebsites.net/Payment/api/V1.0/Payment/OrderRequest';

  const html = `<h1>Transform Example</h1>

    <span>span elements are banned and won't be included in the output</span>
    
    <ul>
      <li>This unordered list has been transformed</li>
      <li>into an ordered list</li>
    </ul>
    
    <p>
      React components can be returned directly.
      <b>This bold tag will be replaced directly with manually specified React element</b>
    </p>
    
    <button type="button">this is button</button>
    
    <p>
      Attributes can also be modified.
      All links like <a href="https://facebook.github.io/react/">this one</a>
      and <a href="https://github.com/wrakky/react-html-parser">this one</a>
      will automatically have the <code>target="_blank"</code> attribute added to them.
    </p>
    
    `;
  function transform(node, index) {
    // return null to block certain elements
    // don't allow <span> elements
    if (node.type === 'tag' && node.name === 'span') {
      return null;
    }

    // Transform <ul> into <ol>
    // A node can be modified and passed to the convertNodeToElement function which will continue to render it and it's children
    if (node.type === 'tag' && node.name === 'ul') {
      node.name = 'ol';
      return convertNodeToElement(node, index, transform);
    }

    // return an <i> element for every <b>
    // a key must be included for all elements
    if (node.type === 'tag' && node.name === 'b') {
      return <i key={index}>{processNodes(node.children, transform)}</i>;
    }

    // all links must open in a new window
    if (node.type === 'tag' && node.name === 'a') {
      node.attribs.target = '_blank';
      // console.log(node);
      // console.log(index);
      return convertNodeToElement(node, index, transform);
    }
  }
  const options = {
    decodeEntities: true,
  };
  useEffect(() => {
    const body = {
      firstName: 'Atalay',
      lastName: 'Tilahun',
      email: 'atehun@gmail.com',
      phone: '0932876051',
      amount: 600,
      currency: 'ETB',
      city: 'Addis Ababa',
      country: 'Ethiopia',
      channel: 'PSS',
      paymentOptionsId: 6,
      traceNumbers: '',
      Status: 4,
      OrderId: '',
      otp: '',
      requestId: 7465,
    };

    API.post(prodURL, body, config)
      .then((todo) => {
        setContentResponse(todo.data.redirectMSG);
        setResponseGot(true);
        console.log('MSG: ', todo.data.redirectMSG);
      })
      .catch((err) => {
        console.log('AXIOS ERROR: ', err.response);
      });
  }, []);
  return returnBack === true ? (
    <PaymentSelection />
  ) : responseGot === true ? (
    <div>{ReactHtmlParser(contentResponse, options)}</div>
  ) : null;
};

export default PayWithPSS;
