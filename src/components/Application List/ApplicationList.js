import React, { useEffect, useState } from 'react';
import axios from 'axios';

import addApplicationList from '../../redux/actions/addApplicationLIst';
import { useDispatch, useSelector } from 'react-redux';
import ListOfApplications from './listOfApplications';
function ApplicationList() {
  const dispatch = useDispatch();
  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiQWRtaW4iLCJuYmYiOjE1OTg1MTU5NTYsImV4cCI6MTU5ODUzMDM1NiwiaWF0IjoxNTk4NTE1OTU2fQ.Aa1ACKbDbkpHcPbg_q6R2Oh4ztIBiISnI6JmyfUi420`,
    },
  };

  const [users, setusers] = useState([]);
  const [open, setOpen] = useState(false);

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
        console.log(Response.data);
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
  return (
    <ListOfApplications
      users={users}
      openModal={openModal}
      handleClose={handleClose}
      cancelSchedule={cancelSchedule}
      open={open}
    />
  );
}

export default ApplicationList;
