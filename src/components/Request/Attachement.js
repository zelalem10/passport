import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const Fileupload = () => {
  debugger;
  const accesstoken = localStorage.systemToken;
  const formData = new FormData();
  let requestTypeId;
  
  let files = [];
  let requiredAttachementType = [];
  const inputs = [];
  let requiredAttachements = localStorage.requiredAttachements;
  let requestTypefromRedux = useSelector((state) => state.service);
  requestTypeId = requestTypefromRedux[requestTypefromRedux.length - 1].appointemntType

  useEffect(() => {
    axios({
      headers: { 'Authorization': 'Bearer ' + accesstoken },
      method: 'get',
      url: 'https://epassportservices.azurewebsites.net/Master/api/V1.0/OfficeRequestType/GetRequiredAttachementsByRequestTypeId',
      params: { "requestTypeId": requestTypeId },
    })
      .then((response) => {
        for (let i = 0; i < response.data.requiredAttachements.length; i++) {
          requiredAttachementType += response.data.requiredAttachements[i].attachmentTypeId;
          console.log(requiredAttachementType);
        }

      })
      .catch((error) => {
        console.log("error" + error.message)
      })
  }, []);


  const submit = async (e) => {
    debugger;
    e.preventDefault();
    for (let i = 0; i < requiredAttachements; i++) {
      files = e.target[i].files[0];
      let fileType = requiredAttachementType;
      console.log(files)
      console.log(fileType)
      formData.append('personRequestId', 3);
      formData.append('1', files);
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
      alert('success');
    } catch (error) {
      console.log("error" + error.message);
      alert('Error');
    }

  }

  for (let i = 0; i < requiredAttachements; i++) {
    inputs.push(

      <input
        name={`input-${i}`}
        type="file"
      />

    )
  }

  return (
    <form onSubmit={e => submit(e)}>

      {inputs}

      <button className="btn btn-primary" type="submit">Upload</button>
    </form>
  )

}
export default Fileupload