import React, { useState, useEffect } from 'react';

import axiosInstance from '../Utils/axios';

import { useDispatch, useSelector } from 'react-redux';
import addApplicationList from '../../redux/actions/addApplicationLIst';
import Status from './Status';
import ViewAppointment from './viewAppointment';
import HorizontalLabelPositionBelowStepper from './EditApplicationList/PersonslInfoStepper';
import RescheduleAppointment from './Rescheduleappointment/appointmentDate';
import GetContent from '../UrgentAppointment/Payment/PaymentSelection';
import Spinner from '../common/Spinner';
const Errorstyle = {
  fontSize: '1.2rem',
};

const MainStatus = () => {
  const dispatch = useDispatch();

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

  const [handlePaymentId, setHandlePaymentId] = useState('');
  const [goToPayment, setGoToPayment] = useState(false);
  const [internalServerError, setinternalServerError] = useState('');


  const handleDisplay = (id) => {
    setDisplayRequestId(id);
  };
  const handleEdit = (id, numberOfApplicants) => {
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
    
    if (!ApplicationNumber && !ConfirmationNumber) {
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
  const handlePayment = (id) => {
    setHandlePaymentId(id);
    setGoToPayment(true);
  };

  const handleSubmit = (e) => {
    debugger;
    e.preventDefault();
    setloading(true);
    const isValid = validate();
    if (isValid) {
      AllError = '';
      setApplicationNumber(ApplicationNumber);
      setConfirmationNumber(ConfirmationNumber);
      if (ApplicationNumber) {
        axiosInstance.get(`/Request/api/V1.0/Request/GetRequestsByApplicationNumber?applicationNumber=${ApplicationNumber}`)
          .then((response) => {
            setApplicationNumberData(response.data.serviceRequest);
            setAllError('');
            if (response.data.status !== 0) {
              setShowForm(false);
              setShowApplicationNumberResults(true);
              setclearbutton(true);
              setloading(false);
              dispatch(addApplicationList(response.data.serviceRequest));
            }
          })
          .catch((error) => {
            console.log('error' + error);
            const errorMessage = error.response.data.message;
            setinternalServerError(errorMessage);
            setloading(false);
          });
      } else if (ConfirmationNumber) {
        axiosInstance.get(`/Request/api/V1.0/Request/GetRequestsByConfirmationNumber?confirmationNumber=${ConfirmationNumber}`)
          .then((response) => {
            setConfirmationNumberData(response.data.serviceResponseList);
            setAllError('');
            if (response.data.status !== 0) {
              setShowForm(false);
              setShowConfirmationNumberDataResults(true);
              setclearbutton(true);
              setloading(false);
              dispatch(addApplicationList(Response.data.serviceResponseList));
            }
          })
          .catch((error) => {
            console.log('error' + error);
            const errorMessage = error.response.data.message;
            setinternalServerError(errorMessage);
            setloading(false);
          });
      }
    }
  };
  const backToList = () => {
    setGoToPayment(false);
    sethandleDisplayId('');
    setDisplayRequestId('');
    setIsEdit('');
  };

  // clear Serch Items
  const clearSerchItems = () => {
    setclearbutton(false);
    setShowPassportNumberResults(false);
    setShowApplicationNumberResults(false);
    setShowConfirmationNumberDataResults(false);
    setShowForm(true);
  };
  debugger;
  if (goToPayment) {
    return <GetContent handlePaymentId={handlePaymentId} status={true} backToList={backToList} />;
  } else if (handleDisplayId) {
    return <RescheduleAppointment handleDisplayId={handleDisplayId} />;
  } else if (displayRequestId && isEdit) {
    return (
      <HorizontalLabelPositionBelowStepper
        displayRequestId={displayRequestId}
        backToList={backToList}
      />
    );
  } else if (displayRequestId) {
    return (
      <ViewAppointment
        displayRequestId={displayRequestId}
        backToList={backToList}
      />
    );
  } else {
    
    return (
      <div>
    {loading ? (
      <Spinner />
    ) : (
      <Status
        ApplicationNumberData={ApplicationNumberData}
        ShowForm={ShowForm}
        handleSubmit={handleSubmit}
        ConfirmationNumberData={ConfirmationNumberData}
        clearbutton={clearbutton}
        showApplicationNumberResults={showApplicationNumberResults}
        PassportNumberData={PassportNumberData}
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
        handlePayment={handlePayment}
        internalServerError={internalServerError}
      />
   
    )
  }
    </div>
    );
  }
};

export default MainStatus;
