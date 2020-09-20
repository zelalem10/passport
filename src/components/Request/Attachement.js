import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../common/Spinner';

const Fileupload = () => {
  debugger;
  let [successMessage, setsuccessMessage] = useState(false);
  let [errorMessage, seterrorMessage] = useState(false);
  const accesstoken = localStorage.systemToken;
  const formData = new FormData();
  let requestTypeId;
  let files = [];
  let requiredAttachementType = JSON.parse(localStorage.getItem("requiredAttachementType"));
  const inputs = [];
  let requiredAttachements = localStorage.requiredAttachements;
  let requestTypefromRedux = useSelector((state) => state.service);
  requestTypeId = requestTypefromRedux[requestTypefromRedux.length - 1].appointemntType
  let requestPersonId = useSelector((state) => state.commonData[0].requestPersonId);

  console.log(requestPersonId)
  const [loading, setloading] = useState(false);

  const submit = async (e) => {
    debugger;
    e.preventDefault();
    setloading(true);
    setsuccessMessage(false);
    seterrorMessage(false);
    for (let i = 0; i < requiredAttachements; i++) {
      files = e.target[i].files[0];
      let fileType = e.target[i].id;
      console.log(files)
      console.log(fileType)
      formData.append('personRequestId', requestPersonId);
      formData.append(fileType, files);
     
    }
    const url = 'https://epassportservices.azurewebsites.net/Request/api/V1.0/RequestAttachments/UploadAttachment';

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': 'Bearer ' + accesstoken
      },
    };

    //return post(url, formData, config);
    try {
      const response = await axios.post(url, formData, config);
      console.log(response.data);
      setsuccessMessage(true);
      setloading(false);
    } catch (error) {
      console.log("error" + error.message);
      seterrorMessage(true);
      setloading(false);
    }

  }

  for (let i = 0; i < requiredAttachements; i++) {
    inputs.push(

      <input
        name={`input-${i}`}
        type="file"
        id={requiredAttachementType[i]}
    
      />

    ) 

}

  return (
    <div>
    {loading ? (
      <Spinner />
    ) : (
      <form onSubmit={e => submit(e)}>
     
        
      {successMessage &&
         <div class="alert alert-success" role="alert">
       Operation sucessfully completed
       </div>
      }
       {errorMessage &&
          <div class="alert alert-danger" role="alert">
          Oops Something went wrong!
        </div>
       }
   
        {inputs}
  
        <button className="btn btn-primary" type="submit">Upload</button>
      </form>
  )}
  </div>

  )

}
export default Fileupload