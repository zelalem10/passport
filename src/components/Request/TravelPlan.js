
import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import addTravelPlan from '../../redux/actions/addTravelPlanAction';

const TravelPlan = forwardRef((props, ref) => {
  const [travelPlan, setTravelPlan] = useState({
    travelDate: "",
    ticketNumber: "",
    dataSaved: false
  });

  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  const personRef = React.useRef();
  if (counter.travelPlan.length === 0) {
    dispatch(addTravelPlan(travelPlan));
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
      return true
    }
  }));
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTravelPlan((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    dispatch(addTravelPlan(travelPlan));

  }
  var prevInfo = counter.travelPlan[counter.travelPlan.length - 1]
  useEffect(() => {
    setTravelPlan((prevState) => ({
      ...prevState,
      travelDate: prevInfo ? prevInfo.travelDate : null,
      ticketNumber: prevInfo ? prevInfo.ticketNumber : null,
      dataSaved: prevInfo ? prevInfo.dataSaved : null,
    }))
  }, []);

  return (
    <MDBCard>
      <MDBCardBody>
        <form>
          <div className="grey-text">
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
            <MDBRow>
              <MDBCol>
                <label>Passport type</label>
                <select className="browser-default custom-select">
                  <option value="">Select passport type</option>
                  <option value="0">passport type 1</option>
                  <option value="1">passport type 2</option>
                  <option value="2">passport type 3</option>
                </select>
              </MDBCol>
              <MDBCol>
                <MDBInput
                  label="Passport Number"
                  icon="passport"
                  name="passportNumber"
                  group
                  type="number"
                  validate
                  error="wrong"
                  success="right"
                  onChange={props.replacmentReasonInputs}
                />
              </MDBCol>
              <MDBCol>
                <MDBInput
                  label="Expiration date"
                  icon="calendar"
                  group
                  name="expirationDate"
                  type="date"
                  validate
                  error="wrong"
                  success="right"
                  onChange={props.replacmentReasonInputs}
                />
              </MDBCol>
              <MDBCol>
                <MDBInput
                  label="Issue date"
                  icon="calendar"
                  group
                  name="issuedDate"
                  type="date"
                  validate
                  onChange={props.replacmentReasonInputs}
                />
              </MDBCol>
            </MDBRow>
          </div>
        </form>
      </MDBCardBody>
    </MDBCard>
  );
});

export default TravelPlan