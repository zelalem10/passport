import React, { useState, useEffect } from 'react';
import SiteSelection from '../Request/SiteSelection'
import DateSelection from '../Request/DateSelection'
import PersonalInfo from '../Request/PersonalInfo'
import { Tab, Row, Accordion, Col, Button, Card } from 'react-bootstrap';
import HorizontalStepper from '../Request/PersonslInfoStepper'
import { BsCheck } from 'react-icons/bs'
import { useSelector } from 'react-redux';



export default function RequestStepper() {
    const [indexValue, setIndexValue] = useState(0);
    const [formCompleted, setFormCompleted] = useState([false, false, false]);
    const activeKey = ["first", "second", "third"];
    const counter = useSelector((state) => state);
    const numberOfApplicants = parseInt(counter.service[counter.service.length - 1].numberOfApplicants, 10);
    const applicantList = [];
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
                        {(() => {
                            console.log(numberOfApplicants)
                            for (let i = 1; i <= numberOfApplicants; i++) {
                                applicantList.push("Applicant " + i)

                            }
                        })()}
                        {applicantList.map((applicant) =>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey={applicant}>
                                        {applicant} {formCompleted[0] ? <BsCheck /> : null}
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={applicant}>
                                    <Card.Body>
                                        <HorizontalStepper />
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        )}

                    </Accordion>
                </blockquote>
            </Card.Body>
        </Card>
    );
}