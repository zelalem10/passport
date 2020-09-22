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
  MDBAlert,
} from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import addTravelPlan from '../../redux/actions/addTravelPlanAction';
import axios from 'axios';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function requestTypeGetter(requetTypeId) {
  switch (requetTypeId) {
    case 2:
      return 'New';
    case 3:
      return 'Renew/Replacement';
    case 4:
      return 'Lost';
    case 8:
      return 'Correction';
    default:
      return 'Unkown';
  }
}
const TravelPlan = forwardRef((props, ref) => {
  const [travelPlan, setTravelPlan] = useState({
    travelDate: '',
    ticketNumber: '',
    filledBy: '',
    pageQuantity: '0',
    passportType: '',
    passportNumber: '',
    expirationDate: '',
    issueDate: '',
    isDatacorrected: false,
    dataSaved: false,
  });
  const [notCompleted, setNotCompleted] = useState({
    travelDate: true,
    ticketNumber: true,
    filledBy: true,
    pageQuantity: false,
    passportType: true,
    passportNumber: true,
    expirationDate: true,
    issueDate: true,
    isDatacorrected: true,
  });

  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  const isRequired = 'is required!';
  const accesstoken = localStorage.systemToken;
  let requestTypefromRedux = useSelector((state) => state.service);
  let requestTypeId =
    requestTypefromRedux[requestTypefromRedux.length - 1].appointemntType;

  useEffect(() => {
    axios({
      headers: { Authorization: 'Bearer ' + accesstoken },
      method: 'get',
      url:
        'https://epassportservices.azurewebsites.net/Master/api/V1.0/OfficeRequestType/GetRequiredAttachementsByRequestTypeId',
      params: { requestTypeId: requestTypeId },
    })
      .then((response) => {
        let requiredAttachements = response.data.requiredAttachements.length;
        let requiredAttachementType = [];
        let attachmentTypeName = [];
        for (let i = 0; i < response.data.requiredAttachements.length; i++) {
          requiredAttachementType.push(
            response.data.requiredAttachements[i].attachmentTypeId
          );
          attachmentTypeName.push(
            response.data.requiredAttachements[i].attachmentType
          );

          console.log(response.data.requiredAttachements);
        }
        console.log(requiredAttachementType);

        if (localStorage.requiredAttachements) {
          localStorage.removeItem('requiredAttachements');
        }
        localStorage.setItem('requiredAttachements', requiredAttachements);
        localStorage.setItem(
          'requiredAttachementType',
          JSON.stringify(requiredAttachementType)
        );
        localStorage.setItem(
          'attachmentTypeName',
          JSON.stringify(attachmentTypeName)
        );
      })
      .catch((error) => {
        console.log('error' + error.message);
      });
  }, []);

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
      setNotCompleted({
        travelDate: travelPlan.travelDate === '' ? true : false,
        ticketNumber: travelPlan.ticketNumber === '' ? true : false,
        filledBy: travelPlan.filledBy === '' ? true : false,
        pageQuantity: travelPlan.pageQuantity === '' ? true : false,
        passportType: travelPlan.passportType === '' ? true : false,
        passportNumber: travelPlan.passportNumber === '' ? true : false,
        expirationDate: travelPlan.expirationDate === '' ? true : false,
        issueDate: travelPlan.issueDate === '' ? true : false,
        passportNumber: travelPlan.passportNumber === '' ? true : false,
      });
      if (
        notCompleted.passportType === true ||
        notCompleted.issueDate === true ||
        notCompleted.expirationDate === true ||
        notCompleted.pageQuantity === true ||
        notCompleted.filledBy === true
      )
        return false;
      else return true;
    },
  }));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTravelPlan((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    dispatch(addTravelPlan(travelPlan));
  };
  const handleCheck = (name, checked) => {
    setTravelPlan((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    // if (!event.target.checked) {
    //     setNotCompleted((prevState) => ({
    //         ...prevState,
    //         [name]: false,
    //     }))
    // }
  };
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
  var prevInfo = counter.travelPlan[counter.travelPlan.length - 1];
  const serviceSelcetion = counter.service[counter.service.length - 1];
  const requestType = serviceSelcetion.appointemntType;
  const requestTypeStr = requestTypeGetter(requestType);
  useEffect(() => {
    if (counter.travelPlan.length === 0) {
      dispatch(addTravelPlan(travelPlan));
    }
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
      dataSaved: prevInfo ? prevInfo.dataSaved : null,
    }));
  }, []);

  return (
    <MDBCard>
      <MDBCardBody>
        {props.respnseGet === true ? (
          props.isSucces === true ? (
            <MDBAlert color="success">{props.resMessage}</MDBAlert>
          ) : (
            <MDBAlert color="danger">{props.resMessage}</MDBAlert>
          )
        ) : null}
        <form>
          <div className="grey-text">
            <MDBRow>
              <MDBCol className="date-picker">
                {/* <MDBInput
                  valueDefault={prevInfo ? prevInfo.travelDate : null}
                  name="travelDate"
                  className="form-control"
                  onBlur={handleChange}
                  type="date"
                  label="Travel Date"
                /> */}
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
                <span style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.filledBy == true && travelPlan.dataSaved == true
                    ? 'Filled by ' + isRequired
                    : null}
                </span>
              </MDBCol>
              <MDBCol>
                <label>Page Quantity</label>
                <select className="browser-default custom-select">
                  <option value="0">32</option>
                  <option value="1">64</option>
                </select>
                <span style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.pageQuantity == true &&
                  travelPlan.dataSaved == true
                    ? 'Page quantity ' + isRequired
                    : null}
                </span>
              </MDBCol>
            </MDBRow>
            <hr />
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
                <span style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.passportType == true &&
                  travelPlan.dataSaved == true
                    ? 'Passport type' + isRequired
                    : null}
                </span>
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
              {requestTypeStr === 'Renew/Replacement' ||
              requestTypeStr === 'Lost' ? (
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
              ) : null}
            </MDBRow>
          </div>
        </form>
      </MDBCardBody>
    </MDBCard>
  );
});

export default TravelPlan;
