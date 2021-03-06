import React, { useEffect, useState } from 'react';
import axiosInstance from '../Utils/axios';

import addApplicationList from '../../redux/actions/addApplicationLIst';
import { useDispatch } from 'react-redux';
import ListOfApplications from './listOfApplications';
import ViewAppointment from './viewAppointment';
import HorizontalLabelPositionBelowStepper from './EditApplicationList/PersonslInfoStepper';
import GroupRequestStepper from './EditApplicationList/Group/GroupNavigation';
import RescheduleAppointment from './Rescheduleappointment/appointmentDate';
import { useHistory } from 'react-router-dom';
import GetContent from '../UrgentAppointment/Payment/PaymentSelection';

function ApplicationList() {

  const dispatch = useDispatch();


  const [users, setusers] = useState([]);
  const [open, setOpen] = useState(false);
  const [displayRequestId, setDisplayRequestId] = useState('');
  const [cancelRequestId, setCancelRequestId] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [relodList, setRelodList] = useState(false);

  const [numOfApplicants, setNumOfApplicants] = useState(0);
  const [handleDisplayId, sethandleDisplayId] = useState('');
  const [loading, setloading] = useState(true);
  const [Message, setMessage] = useState(false);
  const [isCancelSchedule, setisCancelSchedule] = useState(false);
  const [handlePaymentId, setHandlePaymentId] = useState('');
  const [goToPayment, setGoToPayment] = useState(false);
  let history = useHistory();

  const handleDisplay = (id) => {
    setDisplayRequestId(id);
  };
  const handleEdit = (id) => {
    setDisplayRequestId(id);
    setIsEdit(true);
  };
  const handleReschedule = (id) => {
    sethandleDisplayId(id);
  };

  function openModal(id) {
    setCancelRequestId(id);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  useEffect(() => {
    axiosInstance.get('/Request/api/V1.0/Request/GetMyApplications')
      .then((Response) => {
        setloading(false);
        setusers(Response.data.serviceResponseList);
        dispatch(addApplicationList(Response.data.serviceResponseList));
        let status = Response.data.status;
        let errorname = Response.data.message;
        if (status == 0) {
          setMessage(true);
          setMessage(errorname);
        }
      })
      .catch((err) => {
        setloading(false);
      });
  }, [relodList]);
  //back to appointment list
  const backToList = () => {
    setDisplayRequestId('');
    setIsEdit(false);
    setRelodList(!relodList);
    sethandleDisplayId('');
    setGoToPayment(false);
  };
  //payment for urgent
  const handlePayment = (id) => {
    setHandlePaymentId(id);
    setGoToPayment(true);
  };
  //cancel a single schedule
  function cancelSchedule(requestId) {
    axiosInstance.post(`/Schedule/api/V1.0/Schedule/CancelAppointment/?requestId= ${requestId}` )
      .then((Response) => {
        setOpen(false);
        history.push('/Application-List');
        setisCancelSchedule(!isCancelSchedule);
      })
      .catch((err) => {
        setOpen(false);
        history.push('/Application-List');
      });
  }
  if (goToPayment) {
    return <GetContent handlePaymentId={handlePaymentId} status={false} backToList={backToList} />;
  }
  if (handleDisplayId) {
    return (
      <RescheduleAppointment
        handleDisplayId={handleDisplayId}
        
        handleReschedule={handleReschedule}
        backToList={backToList}
      />
    );
  } else if (!displayRequestId && !isEdit) {
    return (
      <ListOfApplications
        users={users}
        openModal={openModal}
        handleClose={handleClose}
        cancelSchedule={cancelSchedule}
        open={open}
        handleDisplay={handleDisplay}
        handleEdit={handleEdit}
        handleReschedule={handleReschedule}
        loading={loading}
        Message={Message}
        cancelRequestId={cancelRequestId}
        handlePayment={handlePayment}
      />
    );
  } else if (displayRequestId && isEdit) {
    return (
      <HorizontalLabelPositionBelowStepper
        displayRequestId={displayRequestId}
        backToList={backToList}
        status={false}
      />
    );
  } else if (displayRequestId) {
    return (
      <ViewAppointment
        displayRequestId={displayRequestId}
        backToList={backToList}
        status={false}
      />
    );
  }
}

export default ApplicationList;
