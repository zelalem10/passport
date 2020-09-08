import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MDBRow, MDBContainer, MDBCol } from 'mdbreact';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function ApplicationList () {

  const accesstoken = localStorage.userToken;
  const config = {
    headers: { Authorization: `Bearer ` +  accesstoken}
  };




  const [users, setusers] = useState([]);
  const [open, setOpen] = useState(false);
  const [requestId, setrequestId] = useState('');

  function openModal (requestId) {
    setrequestId(requestId)
    setOpen(true);
  };

  function handleClose() {
   
    setOpen(false);
  };
    useEffect(() => {
      axios({
           
        headers: { 'Authorization': 'Bearer ' + accesstoken },
        method: 'get',
        url: 'https://epassportservices.azurewebsites.net/Request/api/V1.0/Request/GetAllRequests'
  
      })
      .then((response) => {

        setusers(response.data.serviceResponseList)
        console.log(response.data.serviceResponseList);
      })
    },[]);

      //cancel a single schedule
      function cancelSchedule(requestId) {
        alert(requestId);
        debugger;

         axios({
          
          headers: { 'Authorization': 'Bearer ' + accesstoken },
          method: 'post',
          url: 'https://epassportservices.azurewebsites.net//Schedule/api/V1.0/Schedule/CancelAppointment',
          params: {"requestId":requestId},
    
        })
         .then(Response => {
           alert('success')
          console.log(Response)
          setOpen(false);
      })
      .catch(err => {
        alert('error')
       console.log(err);
       setOpen(false);
   }) 
    }
        return (
            <div className='my-5'>
              <MDBContainer>
              <div className="header py-3 textBackground m-4">
                <MDBRow className="d-flex justify-content-center">
                  <h2 className="white-text mb-3 pt-3 font-weight-bold text-center">
                  List Of Your Applications
                </h2>
                </MDBRow>
              </div>
              </MDBContainer>
            {    
               users.length ?
               users.map(user => 

<MDBContainer
className="passport-container pt-3 applist"
id="request-an-appointment"
>
  


<MDBRow>
  <MDBCol className="medium-12">
    <div className="multistep-form__step">
        
        <div className="small-12 column request-type">
          <div class="request-card card card--small-gutters card--shadow row ">
          <a class="small-12 column row card--link ">
              <div class="small-12 medium-4 column card card--small-gutters card--teal flex flex--column align-middle">
              <h5 class='epassportcenter'><strong>Request Type :  {user.type} </strong></h5>
  
              </div>
              <div class="small-12 medium-8 column card card--small-gutters card--gray rtf rtf--small bold">

                <div>
                <div><strong className='d-inline'>Request Date : </strong>{user.requestDate}</div>
                <div>
                  <strong className='d-inline'>Request mode : </strong> {user.requestMode}
                </div>
                <div>
                  <strong className='d-inline'>Request Status : </strong> {user.requestStatus}
                </div>
                </div>
        
           
                <div className='hoverWhite' onClick={()=>openModal(user.requestId)} > <div class="float-right mr-4"><i class="far fa-trash-alt fa-lg" ></i></div></div>
                <div className='hoverWhite'> <div class="float-right mr-4"><i class="fas fa-edit fa-lg"></i></div></div>
                <div className='hoverWhite'> <div class="float-right mr-4"><i class="fas fa-eye fa-lg"></i></div></div>
          
            <Dialog open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description" >
        <DialogTitle>{"Are you sure you want to cancel this Schedule?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
         
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={()=>cancelSchedule(requestId)} color="secondary" autoFocus>
            Yes
        </Button>
          <Button onClick={handleClose} color="primary">
          Cancel
          </Button>
        </DialogActions>
      </Dialog>
      
              </div>
            </a>
          </div>
        </div>
 
    </div>
  </MDBCol>
</MDBRow>
</MDBContainer>

                ) : null
            }   
            </div>
        )
    
}

export default ApplicationList