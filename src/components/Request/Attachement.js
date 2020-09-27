import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../common/Spinner';
import { MDBCol, MDBRow } from 'mdbreact';
import { useHistory } from 'react-router-dom';

const Fileupload = forwardRef((props, ref) => {
  const history = useHistory();

  let [successMessage, setsuccessMessage] = useState(false);
  let [errorMessage, seterrorMessage] = useState(false);
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

  const submit = async (e) => {
    debugger;
    e.preventDefault();
    setloading(true);
    setsuccessMessage(false);
    seterrorMessage(false);
    console.log(files);
    console.log(fileType);
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
      formData.append(fileType[i], files[i]);
      console.log(files[i]);
      console.log(fileType[i]);
    }

    const url =
      'https://epassportservices.azurewebsites.net/Request/api/V1.0/RequestAttachments/UploadAttachment';

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
      setsuccessMessage(true);
      setloading(false);

      props.VerticalNext();
    } catch (error) {
      console.log('error' + error.message);
      seterrorMessage(true);
      setloading(false);
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
      <div class="row">
        <div class="col-lg-4">
          <label for="exampleInputEmail1" class="mr-1">
            {attachmentTypeName[i]} :
          </label>
        </div>
        <div class="col-lg-8 my-3">
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
                onChange={(e) => onChange(e)}
              />

              <label className="custom-file-label" htmlFor="inputGroupFile01">
                {filename[requiredAttachementType[i]] ? (
                  filename[requiredAttachementType[i]]
                ) : (
                  <div>Choose {attachmentTypeName[i]}</div>
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
        <form onSubmit={(e) => submit(e)}>
          {successMessage && (
            <div class="alert alert-success" role="alert">
              Operation sucessfully completed
            </div>
          )}
          {errorMessage && (
            <div class="alert alert-danger" role="alert">
              Oops! Something went wrong.
            </div>
          )}
          {inputs}
          <MDBRow>
            <MDBCol md="9"></MDBCol>
            <MDBCol>
              <button className="btn btn-primary ml-auto" type="submit">
                Upload
              </button>
            </MDBCol>
          </MDBRow>
        </form>
      )}
    </div>
  );
});
export default Fileupload;
