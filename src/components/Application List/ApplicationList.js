import React, { useEffect, useState } from 'react';
import axios from 'axios';

import addApplicationList from '../../redux/actions/addApplicationLIst';
import { useDispatch, useSelector } from 'react-redux';
import ListOfApplications from './listOfApplications';
import ViewAppointment from './viewAppointment';
import HorizontalLabelPositionBelowStepper from './EditApplicationList/PersonslInfoStepper';
import GroupRequestStepper from './EditApplicationList/Group/GroupNavigation';
import RescheduleAppointment from './Rescheduleappointment/appointmentDate';
import { useHistory } from 'react-router-dom';

function ApplicationList() {
  const tokenValue = () => {
    const UserToken = localStorage.userToken;

    if (UserToken) {
      return UserToken;
    } else {
      const SystemToken = localStorage.systemToken;
      return SystemToken;
    }
  };
  const accesstoken = tokenValue();
  const dispatch = useDispatch();
  const config = {
    headers: {
      Authorization: 'Bearer ' + accesstoken,
    },
  };

  const [users, setusers] = useState([]);
  const [open, setOpen] = useState(false);
  const [displayRequestId, setDisplayRequestId] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [numOfApplicants, setNumOfApplicants] = useState(0);
  const [handleDisplayId, sethandleDisplayId] = useState('');
  const [loading, setloading] = useState(true);
  const [Message, setMessage] = useState(false);
  let history = useHistory();

  const handleDisplay = (id) => {
    debugger;
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

  function openModal() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  useEffect(() => {
    axios({    
      headers: { 'Authorization': 'Bearer ' + accesstoken },
      method: 'get',
      url: 'https://epassportservices.azurewebsites.net/Request/api/V1.0/Request/GetAllRequests',
    })
      .then((Response) => {
  debugger;
        setloading(false);
        setusers(Response.data.serviceResponseList);
        dispatch(addApplicationList(Response.data.serviceResponseList));
        let errorname = Response.data.message
        console.log(errorname);
        if(Response.data.message){
          setMessage(true)
        }
        
       
      })
      .catch(err => {
        setloading(false);

    }) ;
  },[]);

      //cancel a single schedule
      function cancelSchedule(requestId) {
        debugger;
         axios({
          headers: { 'Authorization': 'Bearer ' + accesstoken },
          method: 'post',
          url: 'https://epassportservices.azurewebsites.net//Schedule/api/V1.0/Schedule/CancelAppointment',
          params: {"requestId":requestId},
    
        })
         .then(Response => {
          console.log(Response)
          setOpen(false);
          history.push('/Application-List')
      })
      .catch((err) => {
        console.log(err);
        setOpen(false);
        history.push('/Application-List');
      });
  }
  if (handleDisplayId) {
    return <RescheduleAppointment handleDisplayId={handleDisplayId} />;
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
}

export default ApplicationList;
