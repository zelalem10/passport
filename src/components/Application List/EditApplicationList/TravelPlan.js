import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { MDBRow, MDBCol, MDBInput, MDBCardBody, MDBCard,MDBAlert } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import addTravelPlan from '../../../redux/actions/addTravelPlanAction';
import { Card } from 'react-bootstrap';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import axiosInstance from '../../Utils/axios';

const TravelPlan = forwardRef((props, ref) => {
  
  const [passportPages, setPassportPages] = useState([]);
  const { passportRes, displayedApplication, personalInformation } = props;
  const [passportTypeList,setPassportTypeList]=useState([]);
  const [travelPlan, setTravelPlan] = useState({
    filledBy: passportRes.filledBy,
    //passportPageId: parseInt(passportRes.passportPageId),
    passportPageId:1,
    passportNumber: passportRes.passportNumber,
    expireDate: passportRes.expireDate?passportRes.expireDate:null,
    issueDate: passportRes.issueDate?passportRes.issueDate:null,
    correctionReason: passportRes.correctionReason,
    isDatacorrected: passportRes.isDatacorrected,
    dataSaved: false,
  });
  const [notCompleted, setNotCompleted] = useState({
    filledBy: true,
    passportPageId: false,
    passportType: true,
    passportNumber: true,
    expireDate: true,
    issueDate: true,
    correctionReason: true,
    isDatacorrected: true,
  });



const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  const isRequired = 'is required!';
  const personRef = React.useRef();
  const requestTypeStr = displayedApplication.type;
  if (counter.travelPlan.length === 0) {
    dispatch(addTravelPlan(travelPlan));
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTravelPlan((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  var prevInfo = counter.travelPlan[counter.travelPlan.length - 1];
  useEffect(() => {
    if (counter.travelPlan.length === 0) {
      dispatch(addTravelPlan(travelPlan));
    }
    setTravelPlan((prevState) => ({
      ...prevState,
      //passportPageId: prevInfo ? prevInfo.passportPageId : 0,
      passportPageId:1,
      passportNumber: prevInfo ? prevInfo.passportNumber : null,
      expirationDate: prevInfo ? new Date(prevInfo.expirationDate) : travelPlan.expireDate,
      issueDate: prevInfo ? new Date(prevInfo.issueDate) : travelPlan.issueDate,
      correctionReason: prevInfo ? prevInfo.correctionReason : null,
      isDatacorrected: prevInfo ? prevInfo.isDatacorrected : false,
      dataSaved: prevInfo ? prevInfo.dataSaved : null,
    }));

    setPassportTypeList(JSON.parse(localStorage.PassportPageQuantity))
    if(passportTypeList.length===0){
      axiosInstance.get('/Master/api/V1.0/PassportPage/GetAll')
        .then((todo) => {
          setPassportTypeList(todo.data.pagePassports);
        })
        .catch((err) => {
          console.log('AXIOS ERROR: ', err.response);
        });
    }
  }, []);
  const [selectedissueDate, setSelectedissueDate] = React.useState(
    new Date(prevInfo ? prevInfo.issueDate : travelPlan.issueDate?travelPlan.issueDate:null)
  );
  const [selectedexpirationDate, setSelectedexpirationDate] = React.useState(
    new Date(prevInfo ? prevInfo.expireDate : travelPlan.expireDate?travelPlan.expireDate:null)
  );

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
      expireDate: date,
    }));
  };
  const handleCheck = (name, checked) => {
    setTravelPlan((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };
  useImperativeHandle(ref, () => ({
    saveData() {
      setTravelPlan((prevState) => ({
        ...prevState,
        dataSaved: true,
      }));
      dispatch(addTravelPlan(travelPlan));
      return travelPlan;
    },
    Validate() {
      setNotCompleted({
        //passportPageId:travelPlan.passportPageId&& travelPlan.passportPageId !== 0 ? false : true,
        passportPageId:1,
        passportNumber: travelPlan.passportNumber ? false : true,
        expirationDate: travelPlan.expirationDate ? false : true,
        issueDate: travelPlan.issueDate ? false : true,
        correctionReason: travelPlan.correctionReason ? false : true,
        passportNumber: travelPlan.passportNumber ? false : true,
      });
      if (notCompleted.passportPageId === true) return false;
      else return true;
    },
  }));
  return (
    <MDBCard>
      <MDBCardBody>
      {props.resMessage?
            <MDBAlert color="danger">{props.resMessage}</MDBAlert>
          
         : null}
        <form>
          <div className="grey-text">
            <MDBRow>
            <MDBCol md="3">
                <div
                  className="md-form form-group passport-select"
                  style={{ 'margin-bottom': '2.5rem' }}
                >
                  <label class="passport-selectList-label">
                  Passport Page No.(Requested)
                    <i
                      class="required-for-select-list"
                      style={{ color: 'red' }}
                    >
                      *
                    </i>{' '}
                  </label>
                  <select
                    name="passportPageId"
                    onChange={handleChange}
                    className="browser-default custom-select"
                    defaultValue={prevInfo ? prevInfo.passportPageId : 0}
                  >
                    <option >Select Passport Page</option>
                    {passportTypeList.map((passportType) => (
                      <option value={passportType.id} selected={prevInfo.passportPageId==passportType.id}>{passportType.passportPage}</option>
                    ))}
                  </select>
                </div>
                <span style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.passportPageId === true &&
                  travelPlan.dataSaved == true
                    ? 'Passport page ' + isRequired
                    : null}
                </span>{' '}
              </MDBCol>
              {requestTypeStr != 'New' ? (
              <MDBCol md="3">
                  <MDBInput
                    valueDefault={prevInfo ? prevInfo.passportNumber : travelPlan.passportNumber?travelPlan.passportNumber:null}
                    name="passportNumber"
                    className="form-control"
                    onBlur={handleChange}
                    type="text"
                    label="Old Passport Number"
                  />
                </MDBCol>
              ):null}
            </MDBRow>
            <hr />
            {requestTypeStr != 'New' ? (
              <MDBRow>
              
                <MDBCol md="3" className="date-picker">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Old Issue Date"
                      format="MM/dd/yyyy"
                      value={selectedissueDate}
                      onChange={handleissueDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </MDBCol>
                <MDBCol md="3" className="date-picker">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Old Expiration Date"
                      format="MM/dd/yyyy"
                      value={selectedexpirationDate}
                      onChange={handleexpirationDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </MDBCol>
              </MDBRow>
            ) : null}
            <MDBRow>
              {requestTypeStr === 'Correction' ||
              travelPlan.isDatacorrected === true ? (
                <MDBCol md="3">
                  <label>Correction type</label>
                  <select
                    className="browser-default custom-select"
                    name="correctionReason"
                    onChange={handleChange}
                  >
                    <option value="">select correction type</option>
                    <option value="1">NameCorrection</option>
                    <option value="2">Birth Date Correction</option>
                    <option value="3">
                      Both Name and Birth Date Correction
                    </option>
                  </select>
                  <span style={{ color: 'red' }}>
                    {' '}
                    {notCompleted.correctionReason == true &&
                    travelPlan.dataSaved == true
                      ? 'correction reason ' + isRequired
                      : null}
                  </span>
                </MDBCol>
              ) : null}

              {requestTypeStr === 'Renew/Replacement' ||
              requestTypeStr === 'Lost' ? (
                <MDBCol md="3">
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
                      Is Data correction
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
