import React, { useEffect, useState } from 'react';
import axios from 'axios';

import addApplicationList from '../../redux/actions/addApplicationLIst';
import { useDispatch, useSelector } from 'react-redux';
import ListOfApplications from './listOfApplications';
import ViewAppointment from './viewAppointment';
import HorizontalLabelPositionBelowStepper from './EditApplicationList.js/PersonslInfoStepper';

function ApplicationList() {
  const dispatch = useDispatch();
  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiQWRtaW4iLCJuYmYiOjE1OTkxMTY1NjAsImV4cCI6MTU5OTEzMDk2MCwiaWF0IjoxNTk5MTE2NTYwfQ.6DRok4IPLKMYZcKvYQTrPU6F1Iq61fKoRqaprRpeYC4`,
    },
  };

  const [users, setusers] = useState([]);
  const [open, setOpen] = useState(false);
  const [displayRequestId, setDisplayRequestId] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const handleDisplay = (id) => {
    setDisplayRequestId(id);
  };
  const handleEdit = (id) => {
    setDisplayRequestId(id);
    setIsEdit(true);
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
  if (!displayRequestId && !isEdit) {
    return (
      <ListOfApplications
        users={users}
        openModal={openModal}
        handleClose={handleClose}
        cancelSchedule={cancelSchedule}
        open={open}
        handleDisplay={handleDisplay}
        handleEdit={handleEdit}
      />
    );
  } else if (displayRequestId && isEdit) {
    return (
      <HorizontalLabelPositionBelowStepper
        displayRequestId={displayRequestId}
      />
    );
  }
  return <ViewAppointment displayRequestId={displayRequestId} />;
}

export default ApplicationList;
