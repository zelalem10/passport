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
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import API from '../Utils/API';
import { useTranslation, Trans } from 'react-i18next';
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
  debugger;
  const { t, i18n } = useTranslation();
  const [travelPlan, setTravelPlan] = useState({
    pageQuantity: 0,
    passportNumber: '',
    expirationDate: '',
    issueDate: '',
    correctionReason: '',
    isDatacorrected: false,
    dataSaved: false,
  });
  const [notCompleted, setNotCompleted] = useState({
    pageQuantity: true,
    passportNumber: true,
    expirationDate: true,
    issueDate: true,
    correctionReason: true,
    isDatacorrected: true,
  });
  const [passportTypeList, setPassportTypeList] = useState([]);
  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  const isRequired = 'is required!';
  const accesstoken = localStorage.systemToken;
  const usertoken = localStorage.userToken;
  const config = {
    headers: { Authorization: 'Bearer ' + accesstoken },
  };
  let requestTypefromRedux = useSelector((state) => state.service);
  let personalInfoReducer = useSelector((state) => state.personalInfoReducer);

  if (counter.travelPlan.length === 0) {
    dispatch(addTravelPlan(travelPlan));
  }
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTravelPlan((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (value != '') {
      setNotCompleted((prevState) => ({
        ...prevState,
        [name]: false,
      }));
    }
    else{
      setNotCompleted((prevState) => ({
        ...prevState,
        [name]: true,
      }));
    }
    dispatch(addTravelPlan(travelPlan))
  };
  const handleCheck = (name, checked) => {
    setTravelPlan((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    dispatch(addTravelPlan(travelPlan))
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
      pageQuantity: prevInfo ? prevInfo.pageQuantity : 0,
      passportNumber: prevInfo ? prevInfo.passportNumber : null,
      expirationDate: prevInfo ? new Date(prevInfo.expirationDate) : null,
      issueDate: prevInfo ? new Date(prevInfo.issueDate) : null,
      correctionReason: prevInfo ? prevInfo.correctionReason : null,
      isDatacorrected: prevInfo ? prevInfo.isDatacorrected : false,
      dataSaved: prevInfo ? prevInfo.dataSaved : null,
    }));

    setPassportTypeList(JSON.parse(localStorage.PassportPageQuantity))
    if(passportTypeList.length===0){
      API.get(
        'https://epassportservices.azurewebsites.net/Master/api/V1.0/PassportPage/GetAll',
        config
      )
        .then((todo) => {
          setPassportTypeList(todo.data.pagePassports);
        })
        .catch((err) => {
          console.log('AXIOS ERROR: ', err.response);
        });
    }
  }, []);
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
        pageQuantity: Number.parseInt(travelPlan.pageQuantity, 10) === 0 ? true : false,
        passportNumber: travelPlan.passportNumber === '' ? true : false,
        expirationDate: travelPlan.expirationDate === '' ? true : false,
        issueDate: travelPlan.issueDate === '' ? true : false,
        correctionReason: travelPlan.correctionReason === '' ? true : false,
        passportNumber: travelPlan.passportNumber === '' ? true : false,
      });
      if (notCompleted.pageQuantity === true) 
      return false;
      else return true;
    },
  }));
  return (
    <MDBCard>
      <MDBCardBody>
        {props.respnseGet === true ? (
          props.isSucces === true ? (
            null
          ) : (
            <MDBAlert color="danger">{props.resMessage}</MDBAlert>
          )
        ) : null}
        <form>
          <div className="grey-text">
            <MDBRow>
              <MDBCol md="4"  className="required-field">
                <div>
                  <label>
                  {t('requestForm.passportPageNo')}<i style={{ color: 'red' }}>*</i>{' '}
                  </label>
                  <select
                    className="browser-default custom-select"
                    name="pageQuantity"
                    onChange={handleChange}
                  >
                    <option>  {t('requestForm.selectPassportPage')}</option>
                    {passportTypeList.map((passportType) => (
                      <option value={passportType.id} selected={passportType.id ===Number.parseInt(travelPlan.pageQuantity, 10)}>
                        {passportType.passportPage}
                      </option>
                    ))}
                  </select>
                </div>
                <span style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.pageQuantity === true &&
                  travelPlan.dataSaved == true
                    ? 'Passport page ' + isRequired
                    : null}
                </span>{' '}
              </MDBCol>
              {requestTypeStr != 'New' ? (
              <MDBCol md="4">
                  <MDBInput
                    valueDefault={prevInfo ? prevInfo.passportNumber : null}
                    name="passportNumber"
                    className="form-control"
                    onBlur={handleChange}
                    type="text"
                    label="Old Passport Number"
                  />
                </MDBCol>
              ):(null)}
            
            </MDBRow>
            <hr />
            {requestTypeStr != 'New' ? (
              <MDBRow>
                <MDBCol md="4" className="date-picker">
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
                <MDBCol md="4" className="date-picker">
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
