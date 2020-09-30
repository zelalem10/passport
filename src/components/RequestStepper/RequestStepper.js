import React, { useState, useRef, useEffect } from 'react';
import SiteSelection from '../Request/SiteSelection';
import DateSelection from '../Request Appointment/appointment/appointmentDate';
import PersonalInfoStepper from '../Request/PersonslInfoStepper';
import GroupNavigation from '../GroupRequest/GroupNavigation';
import PaymentSelection from '../Payment/PaymentSelection';
import Confirmation from '../Payment/Responses/Confirmation';
import { Tab, Row, Nav, Col, Button, Card } from 'react-bootstrap';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import ViewAppointment from '../Request/Summary';
import {
  BsCheck,
  BsArrowRightShort,
  BsArrowLeftShort,
  BsHouseFill,
  BsPeopleCircle,
  BsCalendar,
  BsWallet,
  BsFillInfoCircleFill,
} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import addPaymentOptionId from '../../redux/actions/addPaymentOptionIdAction';

export default function RequestStepper() {
  const [indexValue, setIndexValue] = useState(0);
  const [formCompleted, setFormCompleted] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const activeKey = ['first', 'second', 'third', 'fourth', 'Fivth'];
  const counter = useSelector((state) => state);
  const isGroup = counter.service[counter.service.length - 1].isGroup;
  const personalRef = useRef();
  const siteRef = useRef();
  const appointmentRef = useRef();
  const summaryRef = useRef();
  const paymentRef = useRef();
  const dispatch = useDispatch();
  function handelNext() {
    if (indexValue === 0) {
      siteRef.current.saveData();
      if (siteRef.current.isCompleted() === true) {
        setIndexValue((prevActiveStep) => prevActiveStep + 1);
        formCompleted[indexValue] = true;
      }
    } else if (indexValue === 1) {
      if (appointmentRef.current.isCompleted() === true) {
        setIndexValue((prevActiveStep) => prevActiveStep + 1);
        formCompleted[indexValue] = true;
      } else {
        appointmentRef.current.saveData();
      }
    } else if (indexValue === 2) {
      personalRef.current.saveData();
      setIndexValue((prevActiveStep) => prevActiveStep + 1);
      formCompleted[indexValue] = true;
    } else if (indexValue === 3) {
      summaryRef.current.saveData();
      if (summaryRef.current.isCompleted() === true) {
        setIndexValue((prevActiveStep) => prevActiveStep + 1);
        formCompleted[indexValue] = true;
      }
    } else if (indexValue === 4) {
      paymentRef.current.saveData();
      if (paymentRef.current.isCompleted() === true) {
        setIndexValue((prevActiveStep) => prevActiveStep + 1);
        formCompleted[indexValue] = true;
      }
    }
  }
  function handelPrevious() {
    setIndexValue(indexValue - 1);
  }
  function handelSiteSelection() {
    setIndexValue(0);
  }
  function handelDateAndTime() {
    setIndexValue(1);
  }
  function handelPersonalInfo() {
    setIndexValue(2);
  }
  function handelSummary() {
    setIndexValue(3);
  }
  function handelPayment() {
    setIndexValue(4);
  }
  function handelConfirmation() {
    setIndexValue(5);
  }
  useEffect(() => {
    if (counter.commonData.length === 0) {
      const selectedId = { optionId: 0 };
      dispatch(addPaymentOptionId(selectedId));
    }
  }, []);
  return (
    <Tab.Container defaultActiveKey="first" activeKey={activeKey[indexValue]}>
      <div style={{ margin: '2rem' }}>
        <Row>
          <Col variant="secondary" md={3}>
            <Card>
              <Card.Header>Request Appointment </Card.Header>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link
                    eventKey={activeKey[0]}
                    onClick={handelSiteSelection}
                    disabled={formCompleted[0] === true ? false : true}
                  >
                    {' '}
                    <BsHouseFill /> Site Selection{' '}
                    {formCompleted[0] ? <BsCheck /> : null}{' '}
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link
                    eventKey={activeKey[1]}
                    onClick={handelDateAndTime}
                    disabled={formCompleted[1] === true ? false : true}
                  >
                    <BsCalendar /> Date and time
                    {formCompleted[1] ? <BsCheck /> : null}
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link
                    eventKey={activeKey[2]}
                    onClick={handelPersonalInfo}
                    disabled={formCompleted[2] === true ? false : true}
                  >
                    <BsPeopleCircle /> Personal information
                    {formCompleted[2] ? <BsCheck /> : null}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey={activeKey[3]}
                    onClick={handelSummary}
                    disabled={formCompleted[3] === true ? false : true}
                  >
                    <i class="fas fa-list-alt"></i> Summary
                    {formCompleted[3] ? <BsCheck /> : null}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey={activeKey[4]}
                    onClick={handelPayment}
                    disabled={formCompleted[4] === true ? false : true}
                  >
                    <BsWallet /> Payment{formCompleted[4] ? <BsCheck /> : null}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey={activeKey[5]}
                    onClick={handelConfirmation}
                    disabled={formCompleted[5] === true ? false : true}
                  >
                    <BsFillInfoCircleFill /> Confirmation
                    {formCompleted[5] ? <BsCheck /> : null}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey={activeKey[0]}>
                <SiteSelection ref={siteRef} />
              </Tab.Pane>
              <Tab.Pane eventKey={activeKey[1]}>
                <DateSelection ref={appointmentRef} Next={handelNext} />
              </Tab.Pane>
              <Tab.Pane eventKey={activeKey[2]}>
                {isGroup === true ? (
                  <GroupNavigation ref={personalRef} />
                ) : (
                  <PersonalInfoStepper ref={personalRef} Next={handelNext} />
                )}
              </Tab.Pane>
              <Tab.Pane eventKey={activeKey[3]}>
                <ViewAppointment ref={summaryRef} />
              </Tab.Pane>
              <Tab.Pane eventKey={activeKey[4]}>
                <PaymentSelection ref={paymentRef} />
              </Tab.Pane>
              <Tab.Pane eventKey={activeKey[5]}>
                <Confirmation />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
        {indexValue === 2 ? null : (
          <MDBRow>
            <Col sm={3}></Col>
            <Col sm={9}>
              <MDBRow>
                <MDBCol md={2}>
                  <Button
                    variant="primary"
                    onClick={handelPrevious}
                    disabled={indexValue == 0 ? true : false}
                  >
                    <BsArrowLeftShort /> previous
                  </Button>{' '}
                </MDBCol>
                <MDBCol md={8}></MDBCol>
                <MDBCol md={2} className="next-button">
                  <Button variant="primary" onClick={handelNext}>
                    Next
                    <BsArrowRightShort />
                  </Button>{' '}
                </MDBCol>
              </MDBRow>
            </Col>
          </MDBRow>
        )}
      </div>
    </Tab.Container>
  );
}
