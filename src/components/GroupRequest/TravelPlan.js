
import React, { useEffect, useState, useImperativeHandle,forwardRef } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import addTravelPlan from '../../redux/actions/addTravelPlanAction';

 const TravelPlan= forwardRef((props, ref) => {
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
    const resultLength=counter.travelPlan.filter(item => item.applicantNumber == props.applicantNumber).length;
    var prevInfo = counter.travelPlan.filter(item => item.applicantNumber == props.applicantNumber)[resultLength-1]
        useEffect(() => {
            setTravelPlan((prevState) =>({
                ...prevState,
                travelDate: prevInfo? prevInfo.travelDate:null,
                 ticketNumber: prevInfo? prevInfo.ticketNumber:null,
                 dataSaved: prevInfo? prevInfo.dataSaved:null,
                }))
        }, []);

    return (
        <MDBCard>
            <MDBCardBody>
                    <form >
                        <MDBRow>
                        <MDBCol>
                            <MDBInput
                                valueDefault={prevInfo ? prevInfo.travelDate : null}
                                name="travelDate"
                                className="form-control"
                                onBlur={handleChange}
                                type="date"
                                label="Travel Date"
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                valueDefault={prevInfo ? prevInfo.ticketNumber : null}
                                name="ticketNumber"
                                className="form-control"
                                onBlur={handleChange}
                                type="text"
                                label="Ticket Number"
                            />
                        </MDBCol>
                        <MDBCol></MDBCol>
                        <MDBCol></MDBCol>
                        </MDBRow>
                    </form>
            </MDBCardBody>
        </MDBCard>
    );
});

export default TravelPlan