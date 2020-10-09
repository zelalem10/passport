import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { MDBCol, MDBFormInline, MDBBtn,MDBContainer,MDBListGroup,MDBListGroupItem } from "mdbreact";


function Form() {
    let [id,setId]=useState('');
    let [responseData,setResponseData]=useState({});
    const [idFromButtonClick,setIdFromButtonClick]=useState('');
	const handleSubmit =(e) => {
         ;
   // e.preventDefault();
    setIdFromButtonClick(id)
  
  }
  useEffect(()=>{
  axios.get(`https://api.github.com/users/${idFromButtonClick}`
    // configuration
).then((response) => {
     setResponseData(response.data);
     console.log(response.data);
   }).catch((error) => {
    console.log("error"+error)
  })
},[idFromButtonClick])
  
  	return (
          <>
      <MDBCol md="12">
      <MDBFormInline className="md-form mr-auto mb-4" onSubmit={handleSubmit}>
        <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"  value={id}
          onChange={e => setId(e.target.value)} />
        <MDBBtn gradient="aqua" rounded size="sm" type="submit" className="mr-auto">
          Search
          </MDBBtn>
          </MDBFormInline>
    </MDBCol>
      <MDBContainer>
  <MDBListGroup style={{ width: "22rem" }}>
    <MDBListGroupItem active href="#">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{responseData.login}</h5>
        <small>{responseData.created_at}</small>
      </div>
    <p className="mb-1">{responseData.url}</p>
      <small>{responseData.followers_url}</small>
    </MDBListGroupItem>
    </MDBListGroup>
</MDBContainer>
        </>
    );
  }
  export default Form;