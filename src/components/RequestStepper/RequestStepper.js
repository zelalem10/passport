import React, { useState, useRef, useEffect } from 'react';
import SiteSelection from '../Request/SiteSelection';
import DateSelection from '../Request Appointment/appointment/appointmentDate';
import PersonalInfoStepper from '../Request/PersonslInfoStepper';
import GroupNavigation from '../GroupRequest/GroupNavigation';
import PaymentSelection from '../Payment/PaymentSelection';
import Confirmation from '../Payment/Responses/Confirmation';
import { Tab, Row, Nav, Col, Button, Card } from 'react-bootstrap';
import { MDBModal, MDBModalBody, MDBBtn } from 'mdbreact';
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
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(0);
  const [formCompleted, setFormCompleted] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [inompleteAlert, setInompleteAlert] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const activeKey = ['first', 'second', 'third', 'fourth', 'Fivth'];
  const counter = useSelector((state) => state);
  const serviceVal = counter.service[counter.service.length - 1];
  const isGroup = counter.service[counter.service.length - 1].isGroup;
  const childRef = useRef();
  const dispatch = useDispatch();
  function handelNext() {
    if (indexValue === 1) {
      console.log('date and time');
      childRef.current.saveData();
    }
    childRef.current.saveData();
    if (childRef.current.isCompleted() == true) {
      setIndexValue(indexValue + 1);
      formCompleted[indexValue] = true;
    } else {
      inompleteAlert[indexValue] = true;
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
  function handelPayment() {
    setIndexValue(3);
  }
  function handelConfirmation() {
    setIndexValue(4);
  }
  function handelPaymentSelection(optionId) {
    setSelectedPaymentOption(optionId);
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
                    onClick={handelPayment}
                    disabled={formCompleted[3] === true ? false : true}
                  >
                    <BsWallet /> Payment{formCompleted[3] ? <BsCheck /> : null}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey={activeKey[4]}
                    onClick={handelConfirmation}
                    disabled={formCompleted[4] === true ? false : true}
                  >
                    <BsFillInfoCircleFill /> Confirmation
                    {formCompleted[4] ? <BsCheck /> : null}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey={activeKey[0]}>
                <SiteSelection ref={childRef} />
              </Tab.Pane>
              <Tab.Pane eventKey={activeKey[1]}>
                <DateSelection ref={childRef} />
              </Tab.Pane>
              <Tab.Pane eventKey={activeKey[2]}>
                {isGroup === true ? (
                  <GroupNavigation />
                ) : (
                  <PersonalInfoStepper />
                )}
              </Tab.Pane>
              <Tab.Pane eventKey={activeKey[3]}>
                <PaymentSelection />
              </Tab.Pane>
              <Tab.Pane eventKey={activeKey[4]}>
                <Confirmation />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
        <Row>
          <Col md={3}></Col>
          <Col md={2}>
            <Button
              variant="primary"
              onClick={handelPrevious}
              disabled={indexValue == 0 ? true : false}
            >
              <BsArrowLeftShort /> previous
            </Button>{' '}
          </Col>
          <Col md={5}></Col>
          <Col md={2}>
            <Button variant="primary" onClick={handelNext}>
              Next
              <BsArrowRightShort />
            </Button>{' '}
          </Col>
        </Row>
      </div>
    </Tab.Container>
  );
}
