
import React, { useEffect, useState, useImperativeHandle,forwardRef } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle } from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import { Form, Card, Row, Col, InputGroup, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import addTravelPlan from '../../redux/actions/addTravelPlanAction';

 const TravelPlan= forwardRef((props, ref) => {
    const [validated, setValidated] = useState(false);
    const [travelPlan, setTravelPlan] = useState({
        applicantNumber: props.applicantNumber,
        travelDate:"",
        ticketNumber:"",
        dataSaved:false
    });
    
    const dispatch = useDispatch();
    const counter = useSelector((state) => state);
    const personRef = React.useRef();
    if(counter.travelPlan.length===0){
        dispatch(addTravelPlan(travelPlan));
    }
    useImperativeHandle(ref, () => ({
        saveData() {
            setTravelPlan((prevState) =>({
            ...prevState,
            dataSaved: true,
            }));
        dispatch(addTravelPlan(travelPlan));
        },
        Validate() {
            return true
        }
      }));
    const handleChange = (event) => {
        const { name, value } = event.target;
        setTravelPlan((prevState) =>({
             ...prevState,
              [name]: value,
             }))
        dispatch(addTravelPlan(travelPlan));

    }
    var prevInfo=counter.travelPlan[counter.travelPlan.length-1]
        useEffect(() => {
            setTravelPlan((prevState) =>({
                ...prevState,
                travelDate: prevInfo? prevInfo.travelDate:null,
                 ticketNumber: prevInfo? prevInfo.ticketNumber:null,
                 dataSaved: prevInfo? prevInfo.dataSaved:null,
                }))
        }, []);

    return (
        <Card>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <Form >
                        <Form.Row>
                        <Form.Group  as={Col} md="4" controlId="date">
                                        <Form.Label>Travel Date<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="date"  name="travelDate"  defaultValue={prevInfo? prevInfo.travelDate:null} onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group  as={Col} md="4" controlId="ticketNumber">
                                        <Form.Label>Ticket Number<i style={{ color: "red" }}>*</i></Form.Label>
                                        <Form.Control type="text" name="ticketNumber"  defaultValue={prevInfo? prevInfo.ticketNumber:null} onChange={handleChange} />
                                    </Form.Group>
                        </Form.Row>
                    </Form>
                </blockquote>
            </Card.Body>
        </Card>
    );
});

export default TravelPlan