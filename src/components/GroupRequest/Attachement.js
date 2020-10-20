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
import addAttachement from '../../redux/actions/AddAttachementAction';

const Fileupload = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const accesstoken = localStorage.systemToken;
  ;
  const formData = new FormData();
  let requestPersonId = useSelector(
    (state) => state.commonData[0].requestPersonId
  );
  const [files, setfiles] = useState({});
  const [requiredFile, setrequiredFile] = useState('');
  const [attachmentNames, setattachmentNames] = useState([]);
  const [requiredFileType, setrequiredFileType] = useState([]);
  const [invalidImage, setinvalidImage] = useState('')
  const inputs = [];
  const [errorMessage, seterrorMessage] = useState([]);
  const [successMessage, setsuccessMessage] = useState('');
  let fileError = [];
  const [loading, setloading] = useState(true);
  const [hideButton, sethideButton] = useState(false);
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

  const counter = useSelector((state) => state);
  const numberOfApplicants = parseInt(counter.service[counter.service.length - 1].numberOfApplicants, 10);
  useEffect(() => {
    axios({
      headers: { Authorization: 'Bearer ' + accesstoken },
      method: 'get',
      url:
        'https://epassportservices.azurewebsites.net/Master/api/V1.0/Attachement/GetRequiredAttachementsByPersonRequest',
      params: {
        requestPersonId: requestPersonId,
      },
    })
      .then((response) => {
        console.log(response)
          ;
        let requiredAttachements = response.data.requiredAttachements.length;
        setrequiredFile(requiredAttachements);
        let requiredAttachementType = [];
        let attachmentTypeName = [];
        for (let i = 0; i < response.data.requiredAttachements.length; i++) {
          requiredAttachementType.push(
            response.data.requiredAttachements[i].attachmentTypeId
          );
          attachmentTypeName.push(
            response.data.requiredAttachements[i].attachmentType
          );
        }
        setattachmentNames(attachmentTypeName);
        setrequiredFileType(requiredAttachementType);
        setloading(false);
      })
      .catch((error) => {
        console.log('error' + error.message);
        setloading(false);
      });
  }, []);

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
    var fileCount = 0;
    var i;

    for (i in files) {
      if (files.hasOwnProperty(i)) {
        fileCount++;
      }
    }
    if (fileCount < requiredFile) {
      fileError.push(`You Should have to Choose All`);
    }

    else {

      for (var key in files) {
        if (!files[key].name.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
          fileError.push(`  
            ${files[key].name ? (
              files[key].name + " is Invalid format, Please upload correct file type!"
            ) : (
                <div class="smallFont">Invalid format, Please upload correct file type!</div>
              )}`);
        }

        if (files[key].size > 4000000) {
          fileError.push(`  
        ${files[key].name ? (
              files[key].name + " is Invalid size, Please upload correct file size!"
            ) : (
                <div class="smallFont">Invalid size, Please upload correct file size!</div>
              )}`);

        }
      }


    }



    seterrorMessage(fileError);

    if (fileError.length > 0) {
      return false;
    }

    return true;
  };

  const submit = async (e) => {
    debugger
    e.preventDefault();
    fileError = [];

    const isValid = validate(files);
    if (isValid) {
      setloading(true);

      for (var key in files) {
        formData.append('personRequestId', requestPersonId);
        formData.append(key, files[key]);
        console.log(key);
        console.log(files[key]);
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
        setloading(false);
        setsuccessMessage(response.data.message)
        sethideButton(true)
        dispatch(addAttachement(response.data.attachments));
        if (numberOfApplicants === props.applicantNumber)
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
    const { id, value } = e.target;

    setfilename((prevState) => ({
      ...prevState,
      [id]: value.replace(/^.*[\\\/]/, ''),
    }));
    const fileValue = e.target.files[0]

    setfiles((prevState) => ({
      ...prevState,
      [id]: fileValue,
    }));
  };

  for (let i = 0; i < requiredFile; i++) {
    inputs.push(
      <div class="row my-5" id="attachmentmargin">
        <div class="col-lg-5 passport-text-right">
          <MDBBadge color="primary smallPadding ">
            {' '}
            {attachmentNames[i]}{' '}
          </MDBBadge>
        </div>
        <div class="col-lg-5">
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
                id={requiredFileType[i]}
                className="custom-file-input"
                aria-describedby="inputGroupFileAddon01"
                accept="image/png,image/gif,image/jpeg,image/jpg"//application/pdf
                onChange={(e) => onChange(e)}
              />

              <label className="custom-file-label" htmlFor="inputGroupFile01">
                {filename[requiredFileType[i]] ? (
                  filename[requiredFileType[i]]
                ) : (
                    <div class="smallFont">Choose file</div>
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
          <div class="container">
            <form onSubmit={(e) => submit(e)}>
              <div class="row ">
                <div class="col-md-10 " id="attachmentmargin">
                <MDBBadge color="primary smallPadding ">
                Size of the image should be less than 4MB and in JPEG, JPG, PNG, GIF format
                </MDBBadge>

                  {
                    successMessage ? 
                    <div class="alert alert-success text-center mb-2" role="alert">
                      {successMessage}
                  </div> : null
                  }

                  {errorMessage.length
                    ? errorMessage.map((error) => (
                      <div class="alert alert-danger text-center" role="alert">
                        {error}
                      </div>
                    ))
                    : null}
                </div>
              </div>

              {inputs}
              <MDBRow>
                <MDBCol md="9"></MDBCol>
                {
                  hideButton?
                  <MDBCol>
                  <button className="btn btn-primary text-right" type="submit">
                    Upload
                </button>
                </MDBCol> : null
                }

              </MDBRow>
            </form>
          </div>
        )}
    </div>
  );
});
export default Fileupload;
