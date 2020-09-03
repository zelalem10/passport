import React, { useEffect, useState } from 'react';
import axios from 'axios';

import addApplicationList from '../../redux/actions/addApplicationLIst';
import { useDispatch, useSelector } from 'react-redux';
import ListOfApplications from './listOfApplications';
import ViewAppointment from './viewAppointment';

function ApplicationList() {
  const dispatch = useDispatch();
  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiYXRhbGF5IiwibmJmIjoxNTk4ODU5OTI4LCJleHAiOjE1OTg4NzQzMjgsImlhdCI6MTU5ODg1OTkyOH0.8k2CtoSGMBp2eQQC-f9Ivwlvw31GixsADDUwttviQns`,
    },
  };

  const [users, setusers] = useState([]);
  const [open, setOpen] = useState(false);
  const [displayRequestId, setDisplayRequestId] = useState('');

  const handleDisplay = (id) => {
    setDisplayRequestId(id);
  };

  function openModal() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  useEffect(() => {
    axios
      .get(
        'https://epassportservices.azurewebsites.net/Request/api/V1.0/Request/GetAllRequests',
        config
      )
      .then((Response) => {
        setusers(Response.data.serviceResponseList);
        dispatch(addApplicationList(Response.data.serviceResponseList));
      });
  }, []);

  //cancel a single schedule
  function cancelSchedule(requestId) {
    //alert(requestId);
    axios
      .delete('https://api.github.com/delete' + requestId)
      .then((Response) => {
        console.log(Response);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setOpen(false);
      });
  }
  if (!displayRequestId) {
    return (
      <ListOfApplications
        users={users}
        openModal={openModal}
        handleClose={handleClose}
        cancelSchedule={cancelSchedule}
        open={open}
        handleDisplay={handleDisplay}
      />
    );
  }
  return <ViewAppointment displayRequestId={displayRequestId} />;
}

export default ApplicationList;
