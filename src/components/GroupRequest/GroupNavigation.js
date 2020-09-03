import React, { useState, useEffect } from 'react';
import { Tab, Row, Accordion, Col, Button, Card } from 'react-bootstrap';
import HorizontalStepper from '../GroupRequest/PersonslInfoStepper'
import { BsCheck } from 'react-icons/bs'
import { useSelector } from 'react-redux';

export default function RequestStepper() {
    const [completedForms, setCompletedForms] = useState([false, false, false]);
    const counter = useSelector((state) => state);
    const [formCompleted, setFormCompleted] = useState(false);

    const numberOfApplicants = parseInt(counter.service[counter.service.length - 1].numberOfApplicants, 10);
    const applicantList = [];
    function handelNext() {
        console.log(counter.groupPersonalInfo)
    }
    return (
        <Card>
            <Card.Header>Personal Info</Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <Accordion>
                        {(() => {
                            for (let i = 1; i <= numberOfApplicants; i++) {
                                applicantList.push(i)
                            }
                        })()}
                        {applicantList.map((applicantNumber) =>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey={applicantNumber}>
                                        {"Applicant "+ applicantNumber} {completedForms[0] ? <BsCheck /> : null}
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={applicantNumber}>
                                    <Card.Body>
                                        <HorizontalStepper applicantNumber={applicantNumber} handeler={handelNext} />
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