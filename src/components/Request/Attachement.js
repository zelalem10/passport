import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../common/Spinner';
import { MDBCol, MDBRow, MDBBadge } from 'mdbreact';

const Fileupload = forwardRef((props, ref) => {

  const accesstoken = localStorage.systemToken;
  const formData = new FormData();
  let requestTypeId;
  const [files, setfiles] = useState([]);
  const [fileType, setfileType] = useState([]);
  let requiredAttachementType = JSON.parse(
    localStorage.getItem('requiredAttachementType')
  );
  let attachmentTypeName = JSON.parse(
    localStorage.getItem('attachmentTypeName')
  );
  const inputs = [];
  let requiredAttachements = localStorage.requiredAttachements;
  let requestTypefromRedux = useSelector((state) => state.service);
  requestTypeId =
    requestTypefromRedux[requestTypefromRedux.length - 1].appointemntType;
  let requestPersonId = useSelector(
    (state) => state.commonData[0].requestPersonId
  );
  const [errorMessage, seterrorMessage] = useState([]);
  let fileError = [];
  const [loading, setloading] = useState(false);
  const [filename, setfilename] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: '',
    10: '',
    11: '',
    12: '',
  });
  

  useImperativeHandle(ref, () => ({
    saveData() {
      setfiles((prevState) => ({
        ...prevState,
        dataSaved: true,
      }));
    },
    Validate() {
      return true;
    },
  }));
  
  const validate = (files) => {
    debugger;
  
    if (files.length < attachmentTypeName.length){
      fileError.push(
        `You Should have to Choose all files`
      );
     
    }
    // else  if (files.length > 0) { 
    //     for (const i = 0; i <= files.length - 1; i++) { 

    //         // The size of the file. 
    //         if (files[i].size >= 4096) { 
    //           fileError.push(
    //             "File too Big, please select a file less than 4mb"
    //           );
                  
    //         } 
    //     } 
    // } 
  

  seterrorMessage(fileError)
  
      if(fileError.length > 0){
        return false;
      }
  
  
      return true;
    }

  const submit = async (e) => {
    //props.hideBack();
    debugger;
    e.preventDefault();
    fileError = [];
    const isValid = validate(files);
    if (isValid){
      setloading(true);

      for (let i = 0; i < files.length; i++) {
        formData.append('personRequestId', requestPersonId);
        formData.append(fileType[i], files[i]);
        console.log(files[i]);
        console.log(fileType[i]);
      }
  
      const url = 'https://epassportservices.azurewebsites.net/Request/api/V1.0/RequestAttachments/UploadAttachment';
  
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: 'Bearer ' + accesstoken,
        },
      };

    //return post(url, formData, config);
    try {
      const response = await axios.post(url, formData, config);
      console.log(response.data);
      setloading(false);
      props.showBack();
      props.VerticalNext();
    } catch (error) {
      console.log('error' + error.message);
      setloading(false);
      //props.showBack();
    }
  }
  };
  const onChange = (e) => {
    debugger;
    setfiles([...files, e.target.files[0]]);
    setfileType([...fileType, e.target.id]);
    //files = e.target.files[0];
    //fileType = e.target.id;

    const { id, value } = e.target;

    setfilename((prevState) => ({
      ...prevState,
      [id]: value.replace(/^.*[\\\/]/, ''),
    }));
  };

  for (let i = 0; i < requiredAttachements; i++) {
    debugger;
    inputs.push(

      <div class="row my-5" id='attachmentmargin'>
        <div class="col-md-5 text-right">
        <MDBBadge color="primary p-3"> {attachmentTypeName[i]} </MDBBadge>
        </div>
        <div class="col-md-5">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupFileAddon01">
                Upload
              </span>
            </div>
            <div className="custom-file">
              <input
                name={`input-${i}`}
                type="file"
                id={requiredAttachementType[i]}
                className="custom-file-input"
                aria-describedby="inputGroupFileAddon01"
                accept="image/png,image/gif,image/jpeg,image/jpg,application/pdf"
                onChange={(e) => onChange(e)}
              />

              <label className="custom-file-label" htmlFor="inputGroupFile01">
                {filename[requiredAttachementType[i]] ? (
                  filename[requiredAttachementType[i]]
                ) : (
                  <div>Choose file</div>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>

    );
  }

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div class='container'>
        <form onSubmit={(e) => submit(e)}>
    
        <div class="row " >
        <div class="col-md-10 ">
        {
           errorMessage.length ? 
           errorMessage.map((error) => (
            <div class="alert alert-danger text-center" role="alert">
                {error}
           </div>
              ))
              : null
    
            }
          </div>
          </div>
        
        
          {inputs}
          <MDBRow>
            <MDBCol md="9"></MDBCol>
            <MDBCol>
              <button className="btn btn-primary text-right" type="submit">
                Upload
              </button>
            </MDBCol>
          </MDBRow>
        </form>
      </div>
      )}
    </div>
  );
});
export default Fileupload;
