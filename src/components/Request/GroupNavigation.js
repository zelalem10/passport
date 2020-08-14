import React, { useState } from 'react';
import SiteSelection from '../Request/SiteSelection'
import DateSelection from '../Request/DateSelection'
import PersonalInfo from '../Request/PersonalInfo'
import { Tab, Row, Accordion, Col, Button, Card } from 'react-bootstrap';
import HorizontalStepper from '../Request/PersonslInfoStepper'
import {BsCheck} from 'react-icons/bs'


export default function RequestStepper() {
    const [indexValue, setIndexValue] = useState(0);
    const [formCompleted, setFormCompleted] = useState([false, false, false]);
    const activeKey = ["first", "second", "third"];
    function handelNext() {
        setIndexValue(indexValue + 1)
        formCompleted[indexValue] = true
    }
    function handelPrevious() {
        setIndexValue(indexValue - 1)
    }
    return (
        <Card>
            <Card.Header>Personal Info</Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <Accordion>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    Atalay Tilahun{ formCompleted[0] ? <BsCheck /> : null }
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <HorizontalStepper />
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                    Yisacc Abraham{ formCompleted[0] ? <BsCheck /> : null }
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body> <HorizontalStepper /></Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                    Abebe Mekonen{ formCompleted[0] ? <BsCheck /> : null }
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body> <HorizontalStepper /></Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </blockquote>
            </Card.Body>
        </Card>
    );
}