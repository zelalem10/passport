import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import addApplicationList from '../../redux/actions/addApplicationLIst';
import Status from './Status';
import ViewAppointment from './viewAppointment';
import HorizontalLabelPositionBelowStepper from './EditApplicationList/PersonslInfoStepper';
import GroupRequestStepper from './EditApplicationList/Group/GroupNavigation';
import RescheduleAppointment from './Rescheduleappointment/appointmentDate';

const Errorstyle = {
  fontSize: '1.2rem',
};

const MainStatus = () => {
  const dispatch = useDispatch();
  const accesstoken = localStorage.systemToken;
  const config = {
    headers: { Authorization: `Bearer ` + accesstoken },
  };
  const [loading, setloading] = useState(false);

  const [showPassportNumberResults, setShowPassportNumberResults] = useState(
    false
  );
  const [
    showApplicationNumberResults,
    setShowApplicationNumberResults,
  ] = useState(false);
  const [
    showConfirmationNumberDataResults,
    setShowConfirmationNumberDataResults,
  ] = useState(false);
  const [ShowForm, setShowForm] = useState(true);

  const [clearbutton, setclearbutton] = useState(false);

  let [PassportNumber, setPassportNumber] = useState('');
  let [ApplicationNumber, setApplicationNumber] = useState('');
  let [ConfirmationNumber, setConfirmationNumber] = useState('');

  let [PassportNumberData, setPassportNumberData] = useState([]);
  let [ApplicationNumberData, setApplicationNumberData] = useState([]);
  let [ConfirmationNumberData, setConfirmationNumberData] = useState([]);

  let [AllError, setAllError] = useState('');
  const [displayRequestId, setDisplayRequestId] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [numOfApplicants, setNumOfApplicants] = useState(0);
  const [handleDisplayId, sethandleDisplayId] = useState('');

  const handleDisplay = (id) => {
    debugger;
    setDisplayRequestId(id);
  };
  const handleEdit = (id, numberOfApplicants) => {
    debugger;
    if (numberOfApplicants === 1) {
      setIsGroup(false);
    } else {
      setNumOfApplicants(numberOfApplicants);
      setIsGroup(true);
    }
    setDisplayRequestId(id);
    setIsEdit(true);
  };
  const handleReschedule = (id) => {
    sethandleDisplayId(id);
  };
  //validate form
  const validate = () => {
    debugger;

    if (!PassportNumber && !ApplicationNumber && !ConfirmationNumber) {
      AllError = 'Please fill at least one field.';
    } else {
      AllError = '';
    }

    if (AllError) {
      setAllError(AllError);
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    const isValid = validate();
    if (isValid) {
      setPassportNumber(PassportNumber);
      setApplicationNumber(ApplicationNumber);
      setConfirmationNumber(ConfirmationNumber);

      if (PassportNumber) {
        axios
          .get(
            `https://epassportservices.azurewebsites.net/Request/api/V1.0/Request/GetRequestsByPassportNumber?passportNumber=${PassportNumber}`,
            config
          )
          .then((response) => {
            debugger;
            setPassportNumberData(response.data);
            setAllError('');
            console.log(response.data)
            if (response.data.status !== 0) {
              setShowForm(false);
              setShowPassportNumberResults(true);
              setclearbutton(true);
              setloading(false);
              dispatch(addApplicationList(response.data));
            }

            console.log(response.data);
          })
          .catch((error) => {
    
            console.log('error' + error);
          });
      } else if (ApplicationNumber) {
        axios
          .get(
            `https://epassportservices.azurewebsites.net/Request/api/V1.0/Request/GetRequestsByApplicationNumber?applicationNumber=${ApplicationNumber}`,
            config
          )
          .then((response) => {
            debugger;
            setApplicationNumberData(response.data);
            setAllError('');
            if (response.data.status !== 0) {
              setShowForm(false);
              setShowApplicationNumberResults(true);
              setclearbutton(true);
              setloading(false);
              dispatch(addApplicationList(response.data));
            }

            console.log(response.data);
          })
          .catch((error) => {
           
            console.log('error' + error);
          });
      } else if (ConfirmationNumber) {
        axios
          .get(
            `https://epassportservices.azurewebsites.net/Request/api/V1.0/Request/GetRequestsByConfirmationNumber?confirmationNumber=${ConfirmationNumber}`,
            config
          )
          .then((response) => {
            setConfirmationNumberData(response.data);
            setAllError('');
            if (response.data.status !== 0) {
              setShowForm(false);
              setShowConfirmationNumberDataResults(true);
              setclearbutton(true);
              setloading(false);
              dispatch(addApplicationList(Response.data));
            }

            console.log(response.data);
          })
          .catch((error) => {
           
            console.log('error' + error);
          });
      }
    }
  };

  // clear Serch Items
  const clearSerchItems = () => {
    setclearbutton(false);
    setShowPassportNumberResults(false);
    setShowApplicationNumberResults(false);
    setShowConfirmationNumberDataResults(false);
    setShowForm(true);
  };

  if (handleDisplayId) {
    return <RescheduleAppointment handleDisplayId={handleDisplayId} />;
  } else if (!displayRequestId && !isEdit) {
    return (
      <Status
        ApplicationNumberData={ApplicationNumberData}
        ShowForm={ShowForm}
        handleSubmit={handleSubmit}
        setPassportNumber={setPassportNumber}
        ConfirmationNumberData={ConfirmationNumberData}
        clearbutton={clearbutton}
        showApplicationNumberResults={showApplicationNumberResults}
        PassportNumberData={PassportNumberData}
        PassportNumber={PassportNumber}
        clearSerchItems={clearSerchItems}
        loading={loading}
        Errorstyle={Errorstyle}
        ApplicationNumber={ApplicationNumber}
        setApplicationNumber={setApplicationNumber}
        setConfirmationNumber={setConfirmationNumber}
        ConfirmationNumber={ConfirmationNumber}
        AllError={AllError}
        showPassportNumberResults={showPassportNumberResults}
        showConfirmationNumberDataResults={showConfirmationNumberDataResults}
        handleDisplay={handleDisplay}
        handleEdit={handleEdit}
        handleReschedule={handleReschedule}
      />
    );
  } else if (displayRequestId && isEdit && !isGroup) {
    return (
      <HorizontalLabelPositionBelowStepper
        displayRequestId={displayRequestId}
      />
    );
  } else if (displayRequestId && isEdit && isGroup) {
    return (
      <GroupRequestStepper
        displayRequestId={displayRequestId}
        numOfApplicants={numOfApplicants}
      />
    );
  }
  return <ViewAppointment displayRequestId={displayRequestId} />;
};

export default MainStatus;
