import React, { useState, useContext, useEffect } from 'react';
import SiteSelection from '../Request/SiteSelection'
import {SiteSelectionContext} from '../Request/SiteSelection'
import DateSelection from '../Request/DateSelection'
import PersonalInfo from '../Request/PersonalInfo'
import GroupNavigation from '../Request/GroupNavigation'
import PaymentSelection from '../Payment/PaymentSelection'
import { Tab, Row, Nav, Col, Button, Card } from 'react-bootstrap';
import {BsCheck,BsArrowRightShort, BsArrowLeftShort,BsHouseFill, BsPeopleCircle, BsCalendar, BsWallet} from 'react-icons/bs'

export default function RequestStepper() {
  const [indexValue, setIndexValue] = useState(0);
  const [formCompleted, setFormCompleted] = useState([false, false, false, false]);
  const activeKey = ["first", "second", "third", "fourth"];

  const siteSelectionCompleted = useContext(SiteSelectionContext)
  
  useEffect(() => {
    console.log(siteSelectionCompleted)
  }, [])
  function handelNext(){
    setIndexValue(indexValue + 1)
    formCompleted[indexValue]=true
  }
  function handelPrevious(){
    setIndexValue(indexValue - 1)
  }
  function handelSiteSelection(){
    setIndexValue(0)
  }
  function handelPersonalInfo(){
    setIndexValue(1)
  }
  function handelDateAndTime(){
    setIndexValue(2)
  }
  function handelPayment(){
    setIndexValue(3)
  }
  return (
    <Tab.Container defaultActiveKey="first" activeKey={activeKey[indexValue]}>
      <div style={{ margin: '2rem' }}>
        <Row>
          <Col variant="secondary" md={3}>
            <Card>
              <Card.Header>Request Appointment </Card.Header>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey={activeKey[0]} onClick={handelSiteSelection} disabled={formCompleted[0] === true ? false : true} > <BsHouseFill /> Site Selection { formCompleted[0] ? <BsCheck /> : null } </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={activeKey[1]} onClick={handelPersonalInfo} disabled={formCompleted[1] === true ? false : true}><BsPeopleCircle /> Personal information{ formCompleted[1] ? <BsCheck /> : null }</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={activeKey[2]} onClick={handelDateAndTime} disabled={formCompleted[2] === true ? false : true}><BsCalendar /> Date and time{ formCompleted[2] ? <BsCheck /> : null }</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={activeKey[3]} onClick={handelPayment} disabled={formCompleted[3] === true ? false : true}><BsWallet /> Payment{ formCompleted[3] ? <BsCheck /> : null }</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey={activeKey[0]}>
                <SiteSelection />
              </Tab.Pane>
              <Tab.Pane eventKey={activeKey[1]}>
                <GroupNavigation />
              </Tab.Pane>
              <Tab.Pane eventKey={activeKey[2]}>
                <DateSelection />
              </Tab.Pane>
              <Tab.Pane eventKey={activeKey[3]}>
                <PaymentSelection />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
        <Row>
          <Col md={3}></Col>
          <Col md={2}>
            <Button variant="primary" onClick={handelPrevious}><BsArrowLeftShort /> previous</Button>{' '}
          </Col>
          <Col md={5}></Col>
          <Col md={2}>
            <Button variant="primary" onClick={handelNext} disabled={siteSelectionCompleted === true ? false : true} >Next<BsArrowRightShort /></Button>{' '}
          </Col>
        </Row>
      </div>
    </Tab.Container>
  );
}