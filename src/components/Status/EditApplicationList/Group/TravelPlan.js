import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { MDBRow, MDBCol, MDBInput } from 'mdbreact';
import addTravelPlan from '../../../../redux/actions/addTravelPlanAction';
import { useDispatch, useSelector } from 'react-redux';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const TravelPlan = forwardRef((props, ref) => {
  const [validated, setValidated] = useState(false);
  const [travelPlan, setTravelPlan] = useState([]);
  const { applicants, applicantNumber } = props;
  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  let travelInfo = [];
  if (counter.travelPlan.length === 0) {
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
  );
});
export default TravelPlan;
