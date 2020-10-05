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
  let requestPersonId = useSelector((state) => state.commonData[0].requestPersonId);
  const [files, setfiles] = useState([]);
  const [fileType, setfileType] = useState([]);
  const [requiredFile, setrequiredFile] = useState('');
  const [attachmentNames, setattachmentNames] = useState([]);
  const [requiredFileType, setrequiredFileType] = useState([]);
  const inputs = [];
  const [errorMessage, seterrorMessage] = useState([]);
  let fileError = [];
  const [loading, setloading] = useState(true);
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
        
        let requiredAttachements = response.data.requiredAttachements.length;
        setrequiredFile(requiredAttachements)
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
        setattachmentNames(attachmentTypeName)
        setrequiredFileType(requiredAttachementType)
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

    if (files.length < requiredFile) {
      fileError.push(
        'You Should have to Choose all files'
      );

    }

    seterrorMessage(fileError)

    if (fileError.length > 0) {
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
    if (isValid) {
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

  for (let i = 0; i < requiredFile; i++) {
    inputs.push(

      <div class="row my-5" id='attachmentmargin'>
        <div class="col-md-5 passport-text-right">
          <MDBBadge color="primary smallPadding "> {attachmentNames[i]} </MDBBadge>
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
                id={requiredFileType[i]}
                className="custom-file-input"
                aria-describedby="inputGroupFileAddon01"
                accept="image/png,image/gif,image/jpeg,image/jpg,application/pdf"
                onChange={(e) => onChange(e)}
              />

              <label className="custom-file-label" htmlFor="inputGroupFile01">
                {filename[requiredFileType[i]] ? (
                  filename[requiredFileType[i]]
                ) : (
                    <div class='smallFont'>Choose file</div>
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
