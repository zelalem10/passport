import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { MDBRow, MDBCol, MDBInput, MDBCardBody, MDBCard } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import addTravelPlan from '../../../redux/actions/addTravelPlanAction';
import { Card } from 'react-bootstrap';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import axios from 'axios';

const TravelPlan = forwardRef((props, ref) => {
  const [validated, setValidated] = useState(false);
  const [passportPages, setPassportPages] = useState([]);
  const { passportRes, displayedApplication, personalInformation } = props;
  const [travelPlan, setTravelPlan] = useState({
    filledBy: passportRes.filledBy,
    passportPageId: parseInt(passportRes.passportPageId),
    passportType: passportRes.passportType,
    passportNumber: passportRes.passportNumber,
    expireDate: passportRes.expireDate,
    issueDate: passportRes.issueDate,
    correctionReason: passportRes.correctionReason,
    isDatacorrected: passportRes.isDatacorrected,
    dataSaved: false,
  });
  const [notCompleted, setNotCompleted] = useState({
    filledBy: true,
    pageQuantity: false,
    passportType: true,
    passportNumber: true,
    expireDate: true,
    issueDate: true,
    correctionReason: true,
    isDatacorrected: true,
  });
  const accesstoken = localStorage.systemToken;

  let requestPersonId = personalInformation.requestPersonId;
  let requestTypeId = displayedApplication.requestTypeId;
  let attachmentlength;
  let attachmentPath = [];
  let attachmentType = [];
  let attachmentId = [];

  useEffect(() => {
    axios({
      headers: { Authorization: 'Bearer ' + accesstoken },
      method: 'get',
      url:
        'https://epassportservices.azurewebsites.net/Request/api/V1.0/RequestAttachments/GetAttachment',
      params: { personRequestId: requestPersonId },
    })
      .then((Response) => {
        attachmentlength = Response.data.attachments.length;
        localStorage.setItem('attachmentlength', attachmentlength);
        for (let i = 0; i < attachmentlength; i++) {
          attachmentPath.push(Response.data.attachments[i].attachmentPath);
          attachmentType.push(Response.data.attachments[i].attachmentType);
          attachmentId.push(Response.data.attachments[i].attachmentId);
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
  const isRequired = 'is required!';
  const personRef = React.useRef();
  const requestTypeStr = displayedApplication.type;
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
        filledBy: travelPlan.filledBy === '' ? true : false,
        pageQuantity: travelPlan.pageQuantity === 0 ? true : false,
        passportType: travelPlan.passportType === '' ? true : false,
        passportNumber: travelPlan.passportNumber === '' ? true : false,
        expireDate: travelPlan.expireDate === '' ? true : false,
        issueDate: travelPlan.issueDate === '' ? true : false,
        correctionReason: travelPlan.correctionReason === '' ? true : false,
        passportNumber: travelPlan.passportNumber === '' ? true : false,
      });
      if (notCompleted.pageQuantity === true) return false;
      else return true;
    },
  }));
  if (passportPages.length === 0) {
    setPassportPages(JSON.parse(localStorage.PassportPageQuantity));
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
    setTravelPlan((prevState) => ({
      ...prevState,
      filledBy: prevInfo ? prevInfo.filledBy : null,
      passportPageId: prevInfo ? prevInfo.passportPageId : '0',
      passportType: prevInfo ? prevInfo.passportType : null,
      passportNumber: prevInfo ? prevInfo.passportNumber : null,
      expireDate: prevInfo ? prevInfo.expireDate : null,
      issueDate: prevInfo ? prevInfo.issueDate : null,
      correctionReason: prevInfo ? prevInfo.correctionReason : null,
      isDatacorrected: prevInfo ? prevInfo.isDatacorrected : null,
    }));
  }, []);

  const [selectedissueDate, setSelectedissueDate] = React.useState(
    new Date(prevInfo ? prevInfo.issueDate : new Date())
  );
  const [selectedexpirationDate, setSelectedexpirationDate] = React.useState(
    new Date(prevInfo ? prevInfo.expireDate : new Date())
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
  return (
    <Card.Body>
      <blockquote className=" mb-0">
        <form>
          <div className="grey-text">
            <MDBRow>
              <MDBCol md="3">
                <MDBCol>
                  <div
                    className="md-form form-group passport-select"
                    style={{ 'margin-bottom': '2.5rem' }}
                  >
                    <label class="passport-selectList-label">
                      Passport Page
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
                      <option disabled>select Nationality</option>
                      {passportPages.map((passPage) => (
                        <option value={passPage.id}>
                          {passPage.passportPage}
                        </option>
                      ))}
                    </select>
                  </div>
                  <span style={{ color: 'red' }}>
                    {' '}
                    {notCompleted.pageQuantity == true &&
                    travelPlan.dataSaved == true
                      ? 'Page quantity ' + isRequired
                      : null}
                  </span>{' '}
                </MDBCol>
              </MDBCol>

              <MDBCol md="3">
                <MDBInput
                  valueDefault={prevInfo ? prevInfo.filledBy : null}
                  name="filledBy"
                  className="form-control"
                  onBlur={handleChange}
                  type="text"
                  label="Application filled by"
                />
              </MDBCol>
              <MDBCol md="3"></MDBCol>
            </MDBRow>
            {requestTypeStr != 'New' ? (
              <MDBRow>
                <MDBCol md="3">
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
                <MDBCol md="3">
                  <MDBInput
                    valueDefault={prevInfo ? prevInfo.passportNumber : null}
                    name="passportNumber"
                    className="form-control"
                    onBlur={handleChange}
                    type="text"
                    label="Passport Number"
                  />
                </MDBCol>
                <MDBCol md="3" className="date-picker">
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
                <MDBCol md="3" className="date-picker">
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
      </blockquote>
    </Card.Body>
  );
});

export default TravelPlan;
