import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import Spinner from '../../common/Spinner';
import { MDBBadge } from 'mdbreact';
const Fileupload = forwardRef((props, ref) => {
  debugger;
  const { displayedApplication,personalInformation} = props;
  let [successMessage, setsuccessMessage] = useState(false);
  let [errorMessage, seterrorMessage] = useState(false);
  const accesstoken = localStorage.systemToken;
  const formData = new FormData();

  const [files, setfiles] = useState([]);
  const [fileType, setfileType] = useState([]);
  const inputs = [];
  let requestPersonId = personalInformation.requestPersonId;
  let attachmentlength = localStorage.getItem("attachmentlength");
  let attachmentPath = JSON.parse(localStorage.getItem("attachmentPath"));
  let attachmentType = JSON.parse(localStorage.getItem("attachmentType"));
  let attachmentId = JSON.parse(localStorage.getItem("attachmentId"));

  
  const [loading, setloading] = useState(false);
  const [filename, setfilename] = useState({
    1:'',
    2:'',
    3:'',
    4:'',
    5:'',
    6:'',
    7:'',
    8:'',
    9:'',
    10:'',
    11:'',
    12:''

  });



  useImperativeHandle(ref, () => ({
    saveData() {
      setfiles((prevState) => ({
        ...prevState,
        dataSaved: true,
      }));
    },
    Validate() {
      return true
    }
  }));


  const submit = async (e) => {
    debugger;
    e.preventDefault();
    setloading(true);
    setsuccessMessage(false);
    seterrorMessage(false);
    console.log(files)
    console.log(fileType)
    // for (let i = 0; i < requiredAttachements; i++) {
    //   files = e.target[i].files[0];
    //   let fileType = e.target[i].id;
    //   console.log(files)
    //   console.log(fileType)
    //   formData.append('personRequestId', requestPersonId);
    //   formData.append(fileType, files);

    // }
    for (let i = 0; i < files.length; i++) {
      
      formData.append('personRequestId', requestPersonId);
      formData.append(attachmentId[i], files[i]);
      console.log(files[i])
      console.log(attachmentId[i])
    }
      
    const url = 'https://epassportservices.azurewebsites.net/Request/api/V1.0/RequestAttachments/UploadChangeAttachment';

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
  const onChange = (e) => {
    debugger;
    setfiles([...files, e.target.files[0]]);
    setfileType([...fileType, e.target.id]);
      //files = e.target.files[0];
      //fileType = e.target.id;
      


    const { id, value } = e.target;
  
    setfilename((prevState) => ({
      ...prevState,[id]:value.replace(/^.*[\\\/]/, '')}))
    }

  for (let i = 0; i < attachmentlength; i++) {
    debugger;
    inputs.push(
      <div class="row p-3" id='attachmentmargin'>
         <div class="col-lg-4 passport-text-right">
         <MDBBadge color="primary smallPadding "> {attachmentType[i]}</MDBBadge>
         </div>
 
         
    
        <div class="col-lg-6 mb-2 pr-5">
        <div class="row">
          <div class="col-lg-2">
          <a href={attachmentPath[i]} >View File</a>
          </div>
          <div class="col-lg-10">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupFileAddon01">
                Change
                    </span>
            </div>
            <div className="custom-file">
              <input
                name={`input-${i}`}
                type="file"
                id={attachmentPath[i]}
                className="custom-file-input"
                aria-describedby="inputGroupFileAddon01"
                onChange={e => onChange(e)}
              />

              <label className="custom-file-label" htmlFor="inputGroupFile01">
               {filename[attachmentPath[i]] ? filename[attachmentPath[i]]
               : <div>Choose File</div> 
  }
              </label>
            </div>
          </div>

          </div>

        </div>

    
        </div>
      </div>
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
                Oops! Something went wrong.
        </div>
            }
            {inputs}
            <button className="btn btn-primary float-right mr-3" type="submit">Upload</button>

          </form>



        )}
    </div>

  )
});
export default Fileupload