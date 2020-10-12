import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';

import axios from 'axios';

import Spinner from '../../common/Spinner';

import { MDBCol, MDBRow, MDBBadge } from 'mdbreact';

import { useSelector } from 'react-redux';



const Fileupload = forwardRef((props, ref) => {

  const { personalInformation } = props;

  const accesstoken = localStorage.systemToken;

  debugger;

  const formData = new FormData();

  let requestPersonId = personalInformation.requestPersonId;

  const [files, setfiles] = useState([]);

  const [fileType, setfileType] = useState([]);

  const inputs = [];

  let [successMessage, setsuccessMessage] = useState(false);

  let [errorMessage, seterrorMessage] = useState(false);

  let [validationMessage, setvalidationMessage] = useState(false);

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

  debugger;

  let attachmentList = personalInformation.attachmentList;

  console.log(attachmentList)

  let requiredFile = attachmentList? attachmentList.length : 0;

  let attachmentPath = [];

  let attachmentNames = [];

  let requiredFileType = [];



  for (let i = 0; i < requiredFile; i++) {

    attachmentPath.push(attachmentList[i].attachmentPath);

    attachmentNames.push(attachmentList[i].attachmentType);

    requiredFileType.push(attachmentList[i].attachmentId);

  }







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

  // const validate = (files) => {
  //   debugger;

  //   if (files.length < requiredFile) {
  //     fileError.push('You Should have to Choose all files');
  //   }

  //   setvalidationMessage(fileError);

  //   if (fileError.length > 0) {
  //     return false;
  //   }

  //   return true;
  // };



  const submit = async (e) => {

    //props.hideBack();

    debugger;

    e.preventDefault();

    setsuccessMessage(false);

    seterrorMessage(false);

    fileError = [];
    // const isValid = validate(files);
    // if (isValid) {
      setloading(true);



      for (let i = 0; i < files.length; i++) {

        formData.append('personRequestId', requestPersonId);

        formData.append(fileType[i], files[i]);

        console.log(files[i]);

        console.log(fileType[i]);

      }



      const url = 'https://epassportservices.azurewebsites.net/Request/api/V1.0/RequestAttachments/UploadChangeAttachment';



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

        setsuccessMessage(true);



      } catch (error) {

        console.log('error' + error.message);

        setloading(false);

        seterrorMessage(true);

      }
    //}
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

      <div class="row my-5" id="attachmentmargin">

        <div class="col-lg-5 passport-text-right">

          <MDBBadge color="primary smallPadding ">

            {' '}

            {attachmentNames[i]}{' '}

          </MDBBadge>

        </div>

        <div class="col-lg-6 mb-2 pr-3">

          <div class="row">

            <div class="col-lg-3">

            <a href={attachmentPath[i]} >View File</a>

            </div>

            <div class="col-lg-9">

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

                  <div class="smallFont">Choose file</div>

                )}

              </label>

            </div>

          </div>

       

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

            <div class="row ">

              <div class="col-md-10 ">

                {validationMessage.length

                  ? validationMessage.map((error) => (

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