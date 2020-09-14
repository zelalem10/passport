import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
} from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import addTravelPlan from '../../../../redux/actions/addTravelPlanAction';
import { Form, Card, Row, Col, InputGroup, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const TravelPlan = forwardRef((props, ref) => {
  const [validated, setValidated] = useState(false);
  const [travelPlan, setTravelPlan] = useState([]);
  const { applicants, applicantNumber } = props;
  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  let travelInfo = [];
  if (counter.travelPlan.length === 0) {
    debugger;
    for (let i = 0; i < applicants.length; i++) {
      travelInfo.push({
        applicantNumber: applicants[i].id,
        travelDate: applicants[i].flightDate,
        ticketNumber: applicants[i].flightNumber,
        dataSaved: false,
      });
    }
    setTravelPlan(travelInfo);
    dispatch(addTravelPlan(travelInfo));
  }

  useImperativeHandle(ref, () => ({
    saveData() {
      setTravelPlan((prevState) => ({
        ...prevState,
        dataSaved: true,
      }));
      dispatch(addTravelPlan(travelPlan));
    },
    Validate() {
      return true;
    },
  }));
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTravelPlan((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  let prevInfo;
  if (counter.travelPlan.length !== 0) {
    debugger;
    const resultLength = counter.travelPlan.filter(
      (item) => item.applicantNumber == props.applicantNumber
    ).length;

    const applicantInformation =
      counter.travelPlan[counter.travelPlan.length - 1];
    var size = applicantInformation.hasOwnProperty('travelDate');
    if (size && resultLength !== 0) {
      prevInfo = counter.travelPlan.filter(
        (item) => item.applicantNumber == props.applicantNumber
      )[resultLength - 1];
    } else {
      const applicantsInformation = counter.travelPlan[0];
      for (let applicant in applicantsInformation) {
        if (
          applicantsInformation[applicant].applicantNumber ==
          props.applicantNumber
        ) {
          prevInfo = applicantsInformation[applicant];
        }
      }
    }
  }
  useEffect(() => {
    setTravelPlan((prevState) => ({
      ...prevState,
      applicantNumber: prevInfo ? prevInfo.applicantNumber : null,
      travelDate: prevInfo ? prevInfo.travelDate : null,
      ticketNumber: prevInfo ? prevInfo.ticketNumber : null,
      dataSaved: prevInfo ? prevInfo.dataSaved : null,
    }));
  }, []);

  return (
    <Card>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <Form>
            <Form.Row>
              <Form.Group as={Col} md="4" controlId="date">
                <Form.Label>
                  Travel Date<i style={{ color: 'red' }}>*</i>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="travelDate"
                  defaultValue={prevInfo ? prevInfo.travelDate : null}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="ticketNumber">
                <Form.Label>
                  Ticket Number<i style={{ color: 'red' }}>*</i>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="ticketNumber"
                  defaultValue={prevInfo ? prevInfo.ticketNumber : null}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form.Row>
          </Form>
        </blockquote>
      </Card.Body>
    </Card>
  );
});
export default TravelPlan;
