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
  debugger;
  
  const [passportPages, setPassportPages] = useState([]);
  const { passportRes, displayedApplication, personalInformation } = props;
  const [passportTypeList,setPassportTypeList]=useState([]);

  const [travelPlan, setTravelPlan] = useState({
    filledBy: passportRes.filledBy,
    passportPageId: parseInt(passportRes.passportPageId),
    passportNumber: passportRes.passportNumber,
    expireDate: passportRes.expireDate?passportRes.expireDate:null,
    issueDate: passportRes.issueDate?passportRes.issueDate:null,
    correctionReason: personalInformation?personalInformation.correctionTypeEnum:0,
    isDatacorrected: passportRes.isDatacorrected,
    dataSaved: false,
  });
  const [isOldPassportValid, setIsOldPassportValid] = useState(passportRes.passportNumber?true:false);
  const [isIssueDateValid, setIsIssueDateValid] = useState(passportRes.issueDate?true:false);
  const [isExpireDateValid, setIsExpireDateValid] = useState(passportRes.expireDate?true:false);
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
    setNotCompleted((prevState)=>({
      ...prevState,
      [name]: false,
    }))
    if (name === 'passportNumber') {
      let checkPassport = new RegExp(/^[a-zA-Z]{2}\d{7}$/).test(value);
      if(checkPassport){
          setIsOldPassportValid(true);
      } 
      else {
          setIsOldPassportValid(false);
      }
     

  }
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
      expirationDate: prevInfo ? new Date(prevInfo.expireDate) : travelPlan.expireDate,
      issueDate: prevInfo ? new Date(prevInfo.issueDate) : travelPlan.issueDate,
      correctionReason: prevInfo ? prevInfo.correctionReason : 0,
      isDatacorrected: prevInfo ? prevInfo.isDatacorrected : false,
      dataSaved: prevInfo ? prevInfo.dataSaved : null,
    }));
    setNotCompleted({
      //passportPageId:travelPlan.passportPageId&& travelPlan.passportPageId !== 0 ? false : true,
      passportPageId: false,
      passportNumber: passportRes.passportNumber ? false : true,
      expirationDate: passportRes.expireDate ? false : true,
      issueDate: passportRes.issueDate ? false : true,
      correctionReason: personalInformation.correctionTypeEnum?false:true,
      passportNumber: passportRes.passportNumber ? false : true,
    });

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
        isIssueDateChanged: true,
    }));

    setIsIssueDateValid(true);
};
const handleexpirationDateChange = (date) => {
    setSelectedexpirationDate(date);


    setTravelPlan((prevState) => ({
        ...prevState,
        expirationDate: date,
        isExpirationDateChanged: true,
    }));
    setIsExpireDateValid(true);
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
      debugger;
    //   if(requestTypeStr=='Correction' && notCompleted.correctionReason===true){
    //     return false;
    // }
    if (notCompleted.pageQuantity === true) {
        return false;
    }
    else if (requestTypeStr != 'New' && notCompleted.passportNumber === true) {
        return false;
    }
    else if (requestTypeStr != 'New' && (isOldPassportValid === false ||isIssueDateValid===false||isExpireDateValid===false)) {
        return false;
    }
    else
        return true;
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
            {/* {requestTypeStr != 'New' ? (
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
            ) : null} */}
             <MDBRow>
              {requestTypeStr === 'Correction' ||
              travelPlan.isDatacorrected === true ? (
                <MDBCol md="3">
                  <label>Correction type<i
                      class="required-for-select-list"
                      style={{ color: 'red' }}
                    >
                      *
                    </i>{' '}</label>
                  <select
                    className="browser-default custom-select"
                    name="correctionReason"
                    onChange={handleChange}
                  >
                    <option value="" disabled>select correction type</option>
                    <option value="1" selected={prevInfo ? prevInfo.correctionReason==1?true:false:false}>Name Correction</option>
                    <option value="2" selected={prevInfo ? prevInfo.correctionReason==2?true:false:false}>Birth Date Correction</option>
                    <option value="3" selected={prevInfo ? prevInfo.correctionReason==3?true:false:false}>
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
