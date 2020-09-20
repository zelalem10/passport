import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { MDBRow, MDBCol, MDBInput, MDBCardBody } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import addTravelPlan from '../../../redux/actions/addTravelPlanAction';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const TravelPlan = forwardRef((props, ref) => {
  const [validated, setValidated] = useState(false);
  const { flightData, flightNumber } = props;
  debugger;
  const [travelPlan, setTravelPlan] = useState({
    travelDate: flightData,
    ticketNumber: flightNumber,
    dataSaved: false,
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
  var prevInfo = counter.travelPlan[counter.travelPlan.length - 1];
  useEffect(() => {
    setTravelPlan((prevState) => ({
      ...prevState,
      travelDate: prevInfo ? new Date(prevInfo.travelDate) : null,
      ticketNumber: prevInfo ? prevInfo.ticketNumber : null,
      dataSaved: prevInfo ? prevInfo.dataSaved : null,
    }));
  }, []);
  const [selectedTravelDate, setSelectedTravelDate] = React.useState(
    new Date(prevInfo ? prevInfo.travelDate : '2014-08-18T21:11:54')
  );

  const handleTravelDateChange = (date) => {
    setSelectedTravelDate(date);
    setTravelPlan((prevState) => ({
      ...prevState,
      travelDate: date,
    }));
  };

  return (
    <MDBCardBody>
      <blockquote className=" mb-0">
        <form>
          <MDBRow>
            <MDBCol md="4">
              <MDBCol className="travel-date-picker">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Enrollment Date"
                    value={selectedTravelDate}
                    onChange={handleTravelDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </MDBCol>
            </MDBCol>
            <MDBCol md="4">
              <MDBCol>
                <MDBInput
                  label="Ticket Number"
                  group
                  type="text"
                  name="ticketNumber"
                  validate
                  error="wrong"
                  success="right"
                  valueDefault={prevInfo ? prevInfo.ticketNumber : null}
                  onChange={handleChange}
                />
              </MDBCol>
            </MDBCol>
          </MDBRow>
        </form>
      </blockquote>
    </MDBCardBody>
  );
});

export default TravelPlan;
