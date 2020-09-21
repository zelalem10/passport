import React, { useState, useEffect } from 'react';
import { Tab, Row, Col, Button, Card } from 'react-bootstrap';
import HorizontalStepper from '../GroupRequest/PersonslInfoStepper'
import { BsCheck } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import addPersonalInfo from '../../redux/actions/addPersonalInfoAction';
import { MDBContainer } from 'mdbreact';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';


const Accordion = withStyles({
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
    },
    expanded: {},
  })(MuiAccordion);
  
  const AccordionSummary = withStyles({
    root: {
      backgroundColor: 'rgba(0, 0, 0, .03)',
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      marginBottom: -1,
      minHeight: 56,
      '&$expanded': {
        minHeight: 56,
      },
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expanded: {},
  })(MuiAccordionSummary);
  
  const AccordionDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiAccordionDetails);
export default function RequestStepper() {
    const [completedForms, setCompletedForms] = useState([false, false, false]);
    const [personalInfo, setPersonalInfo] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        birthCountry: "",
        birthCity: "",
        birthDate: "",
        gender: "",
        height: "",
        eyeColor: "",
        hairColor: "",
        occupation: "",
        halfCast: "",
        enrolmentDate: "",
        nationality: "",
        formCompleted: false
    });
    const dispatch = useDispatch();
    const counter = useSelector((state) => state);
    const [formCompleted, setFormCompleted] = useState(false);
    const prevInfo = counter.personalInfoReducer
    const numberOfApplicants = parseInt(counter.service[counter.service.length - 1].numberOfApplicants, 10);
    const applicantList = [];
    function handelNext() {
        console.log(counter.groupPersonalInfo)
    }
    return (
        <MDBContainer
        className=" view-appointment-group pt-3"
        fluid
      >
        
        <Card className="pt-3">
          <Card.Header>Personal Info</Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
            {(() => {
                            for (let i = 1; i <= numberOfApplicants; i++) {
                               applicantList.push(i)
                            }
                        })()}
              {applicantList.map((applicantNumber) =>
                <Accordion className="accordion-item">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    eventKey={applicantNumber}
                  >
                    <Typography className="accordion-title">
                    {(prevInfo.filter(item =>item.applicantNumber==applicantNumber)[prevInfo.filter(item =>item.applicantNumber==applicantNumber).length-1] && prevInfo.filter(item =>item.applicantNumber==applicantNumber)[prevInfo.filter(item =>item.applicantNumber==applicantNumber).length-1].firstName !="")?
                                   prevInfo.filter(item =>item.applicantNumber==applicantNumber)[prevInfo.filter(item =>item.applicantNumber==applicantNumber).length-1].firstName+" "+ prevInfo.filter(item =>item.applicantNumber==applicantNumber)[prevInfo.filter(item =>item.applicantNumber==applicantNumber).length-1].middleName:"Applicant "+applicantNumber} {completedForms[0] ? <BsCheck /> : null}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    eventKey={applicantNumber}
                    className="group-edit"
                  >
                    <HorizontalStepper
                      applicantNumber={applicantNumber}
                      handeler={handelNext}
                    />
                  </AccordionDetails>
                </Accordion>
              )}
            </blockquote>
          </Card.Body>
        </Card>
      </MDBContainer>
        // <Card>
        //     <Card.Header>Personal Info</Card.Header>
        //     <Card.Body>
        //             <Accordion>
        //                 {(() => {
        //                     for (let i = 1; i <= numberOfApplicants; i++) {
        //                         applicantList.push(i)
        //                     }
        //                 })()}
        //                 {applicantList.map((applicantNumber) =>
        //                     <Card>
        //                         <Card.Header>
        //                             <Accordion.Toggle as={Button} variant="link" eventKey={applicantNumber}>
        //                                 {(prevInfo.filter(item =>item.applicantNumber==applicantNumber)[prevInfo.filter(item =>item.applicantNumber==applicantNumber).length-1] && prevInfo.filter(item =>item.applicantNumber==applicantNumber)[prevInfo.filter(item =>item.applicantNumber==applicantNumber).length-1].firstName !="")?
        //                                 prevInfo.filter(item =>item.applicantNumber==applicantNumber)[prevInfo.filter(item =>item.applicantNumber==applicantNumber).length-1].firstName+" "+ prevInfo.filter(item =>item.applicantNumber==applicantNumber)[prevInfo.filter(item =>item.applicantNumber==applicantNumber).length-1].middleName:"Applicant "+applicantNumber} {completedForms[0] ? <BsCheck /> : null}
        //                             </Accordion.Toggle>
        //                         </Card.Header>
        //                         <Accordion.Collapse eventKey={applicantNumber}>
        //                             <Card.Body>
        //                                 <HorizontalStepper applicantNumber={applicantNumber} handeler={handelNext} />
        //                             </Card.Body>
        //                         </Accordion.Collapse>
        //                     </Card>
        //                 )}

        //             </Accordion>
        //     </Card.Body>
        // </Card>
    );
}