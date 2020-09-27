import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { MDBRow, MDBCol, MDBInput, MDBCardBody, MDBCard } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import addTravelPlan from '../../../redux/actions/addTravelPlanAction';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';

const TravelPlan = forwardRef((props, ref) => {
  const [validated, setValidated] = useState(false);
  const {
    flightData,
    flightNumber,
    filledBy,
    pageQuantity,
    passportType,
    passportNumber,
    expirationDate,
    issueDate,
    isDatacorrected,
    displayedApplication,
    personalInformation
  } = props;
  debugger;
  const [travelPlan, setTravelPlan] = useState({
    travelDate: flightData,
    ticketNumber: flightNumber,
    filledBy: filledBy,
    pageQuantity: pageQuantity,
    passportType: passportType,
    passportNumber: passportNumber,
    expirationDate: expirationDate,
    issueDate: issueDate,
    isDatacorrected: isDatacorrected,
    dataSaved: false,
  });
  debugger;
  const accesstoken = localStorage.systemToken;

  let requestPersonId = personalInformation.requestPersonId;
  let requestTypeId = displayedApplication.requestTypeId;
  let attachmentlength;
  let attachmentPath = [];
  let attachmentType = [];
  let attachmentId = [];

  

  console.log(displayedApplication)

  useEffect(() => {
    axios({
      headers: { Authorization: 'Bearer ' + accesstoken },
      method: 'get',
      url:
        'https://epassportservices.azurewebsites.net/Request/api/V1.0/RequestAttachments/GetAttachment',
        params: { personRequestId: requestPersonId },
    })
      .then((Response) => {
        debugger;
        attachmentlength = Response.data.attachments.length;
        localStorage.setItem('attachmentlength', attachmentlength);
        for (let i=0; i< attachmentlength; i++){
          attachmentPath.push(Response.data.attachments[i].attachmentPath)
          attachmentType.push(Response.data.attachments[i].attachmentType)
          attachmentId.push(Response.data.attachments[i].attachmentId)
        }
        if (localStorage.attachmentPath) {
          localStorage.removeItem('attachmentPath');
        }
        if (localStorage.attachmentType) {
          localStorage.removeItem('attachmentType');
        }
        if (localStorage.attachmentId) {
          localStorage.removeItem('attachmentId');
        }
        localStorage.setItem('attachmentPath', JSON.stringify(attachmentPath));
        localStorage.setItem('attachmentType', JSON.stringify(attachmentType));
        localStorage.setItem('attachmentId', JSON.stringify(attachmentId));


      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
      filledBy: prevInfo ? prevInfo.filledBy : null,
      pageQuantity: prevInfo ? prevInfo.pageQuantity : '0',
      passportType: prevInfo ? prevInfo.passportType : null,
      passportNumber: prevInfo ? prevInfo.passportNumber : null,
      expirationDate: prevInfo ? new Date(prevInfo.expirationDate) : null,
      issueDate: prevInfo ? new Date(prevInfo.issueDate) : null,
      isDatacorrected: prevInfo ? prevInfo.isDatacorrected : false,
    }));
  }, []);

  const [selectedtravelDate, setSelectedtravelDate] = React.useState(
    new Date(prevInfo ? prevInfo.travelDate : new Date())
  );
  const [selectedissueDate, setSelectedissueDate] = React.useState(
    new Date(prevInfo ? prevInfo.issueDate : new Date())
  );
  const [selectedexpirationDate, setSelectedexpirationDate] = React.useState(
    new Date(prevInfo ? prevInfo.expirationDate : new Date())
  );
  const handletravelDateChange = (date) => {
    setSelectedtravelDate(date);
    setTravelPlan((prevState) => ({
      ...prevState,
      travelDate: date,
    }));
  };
  const handleissueDateChange = (date) => {
    setSelectedissueDate(date);
    setTravelPlan((prevState) => ({
      ...prevState,
      issueDate: date,
    }));
  };
  const handleexpirationDateChange = (date) => {
    setSelectedexpirationDate(date);
    setTravelPlan((prevState) => ({
      ...prevState,
      expirationDate: date,
    }));
  };
  const handleCheck = (name, checked) => {
    setTravelPlan((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };
  return (
    <MDBCard>
      <MDBCardBody>
        <form>
          <div className="grey-text">
            <MDBRow>
              <MDBCol className="date-picker">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Travel Date"
                    format="MM/dd/yyyy"
                    value={selectedtravelDate}
                    onChange={handletravelDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
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
              <MDBCol>
                <MDBInput
                  valueDefault={prevInfo ? prevInfo.filledBy : null}
                  name="filledBy"
                  className="form-control"
                  onBlur={handleChange}
                  type="text"
                  label="Application filled by"
                />
              </MDBCol>
              <MDBCol>
                <label>Page Quantity</label>
                <select className="browser-default custom-select">
                  <option value="0">32</option>
                  <option value="1">64</option>
                </select>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol>
                <MDBInput
                  valueDefault={prevInfo ? prevInfo.passportType : null}
                  name="passportType"
                  className="form-control"
                  onBlur={handleChange}
                  type="text"
                  label="Passport Type"
                />
              </MDBCol>
              <MDBCol>
                <MDBInput
                  valueDefault={prevInfo ? prevInfo.passportNumber : null}
                  name="passportNumber"
                  className="form-control"
                  onBlur={handleChange}
                  type="text"
                  label="Passport Number"
                />
              </MDBCol>
              <MDBCol className="date-picker">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Expiration Date"
                    format="MM/dd/yyyy"
                    value={selectedexpirationDate}
                    onChange={handleexpirationDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </MDBCol>
              <MDBCol className="date-picker">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Issue Date"
                    format="MM/dd/yyyy"
                    value={selectedissueDate}
                    onChange={handleissueDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol>
                <label></label>
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="isCorrection"
                    onChange={(e) =>
                      handleCheck('isDatacorrected', e.target.checked)
                    }
                  />
                  <label class="custom-control-label" for="isCorrection">
                    Is Data corrected
                  </label>
                </div>
              </MDBCol>
            </MDBRow>
          </div>
        </form>
      </MDBCardBody>
    </MDBCard>
  );
});

export default TravelPlan;
