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

  const config = {
    headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiYXRhbGF5IiwibmJmIjoxNTk4MDA5MzY3LCJleHAiOjE1OTgwMjM3NjcsImlhdCI6MTU5ODAwOTM2N30.VjdrCbqxYgY1OdiXvF5B__YdRQ0m8Ton7scWTxARQ4E` }
  };

  const [users, setusers] = useState([]);
  const [open, setOpen] = useState(false);

  function openModal () {
    setOpen(true);
  };

  function handleClose() {
   
    setOpen(false);
  };
    useEffect(() => {
      axios.get('http://svdrbas03:2222/Request/api/V1.0/Request/GetAllRequests', config)
      .then(Response => {
        console.log(Response.data)
        setusers(Response.data.serviceResponseList)
    })
    }, []);

      //cancel a single schedule
      function cancelSchedule(requestId) {
        //alert(requestId);
         axios.delete('https://api.github.com/delete'+requestId)
         .then(Response => {
          console.log(Response)
          setOpen(false);
      })
      .catch(err => {
       console.log(err);
       setOpen(false);
   }) 
    }
        return (
            <div className='my-5'>
              <div className='container'>
              <div className="header py-3 blue-gradient mx-5">
                <MDBRow className="d-flex justify-content-center">
                  <h2 className="white-text mb-3 pt-3 font-weight-bold text-center">
                  List Of Your Applications
                </h2>
                </MDBRow>
              </div>
              </div>
            {    
               users.length ?
               users.map(user => 

<MDBContainer
className="passport-container pt-3"
id="request-an-appointment"
>
  


<MDBRow>
  <MDBCol className="medium-12">
    <div className="multistep-form__step">
        
        <div className="small-12 column request-type">
          <div class="request-card card card--small-gutters card--shadow row ">
          <a class="small-12 column row card--link vertical-margin-1 ">
              <div class="small-12 medium-4 column card card--small-gutters card--teal flex flex--column align-center text-center">
              <h5><strong>Request Type :  {user.type} </strong></h5>
                <div class="text-center vertical-margin-half">
                </div>
              </div>
              <div class="small-12 medium-8 column card card--small-gutters card--gray rtf rtf--small bold">

                <div>
                <div><strong className='d-inline'>Request Date : </strong>{user.requestDate}</div>
                <div><strong className='d-inline'>Request mode : </strong>
                {user.requestMode === 0 && <div className='d-inline'>Normal</div>}
                {user.requestMode === 1 && <div className='d-inline'>Urgent</div>}
                {user.requestMode === 2 && <div className='d-inline'>Emergency</div>}
                {user.requestMode === 3 && <div className='d-inline'>VIP</div>}
                </div>
                <div><strong className='d-inline'>Request Status : </strong>
                {user.requestStatus === 0 && <div className='d-inline'>Request</div>}
                {user.requestStatus === 1 && <div className='d-inline'>Urgent</div>}
                {user.requestStatus === 2 && <div className='d-inline'>Emergency</div>}
                {user.requestStatus === 3 && <div className='d-inline'>VIP</div>}
                </div>
                </div>

                 {/* <p>
                    {person.html_url}
                </p> */}
        
           
                <a href="#" onClick={()=>openModal(user.requestId)} > <div class="float-right mr-4"><i class="far fa-trash-alt fa-lg" ></i></div></a>
                <a href="#"> <div class="float-right mr-4"><i class="fas fa-edit fa-lg"></i></div></a>
                <a href="#"> <div class="float-right mr-4"><i class="fas fa-eye fa-lg"></i></div></a>
          
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
        <Button onClick={()=>cancelSchedule(user.requestId)} color="secondary" autoFocus>
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
