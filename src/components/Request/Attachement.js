import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import * as attachimentAction from '../../redux/actions/attachimentAction';
import { MDBDropdown, MDBDropdownToggle, MDBBtn, MDBBtnGroup, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { MDBSelect } from "mdbreact";
const Errorstyle = {
    marginLeft: "4.5rem",
    marginBottom: "1rem"
  };
  
export default function FileUpload() {

    const accesstoken = localStorage.systemToken;


    const [files, setFiles] = useState([]);
    const [filesnameOne, setFilesnameOne] = useState([]);
    const [filesnameTwo, setFilesnameTwo] = useState([]);
    let [emptyError, setemptyError] = useState('');
    let [sizeError, setsizeError] = useState('');

    const dispatch = useDispatch();
    

    //validate the form
    function validate() {
        debugger;

        if (files.length === 0) {
            emptyError = "Um, Couldn't find the file please choose the file.";
        }
        else
        emptyError = "";

        if (files) {
            if (files.size > 5000) {
                sizeError = "File too Big, please select a file less than 2mb";
                }
            else
            sizeError = "";
        }

        if (emptyError || sizeError) {
            setemptyError(emptyError)
            setsizeError(sizeError)
            return false;
        }
        else{
            setemptyError("")
            setsizeError("")
        }

        return true;

    };

    // onChange function that reads first files on uploading them
    function onFileUploadOne(event) {
        event.preventDefault();

            let id = event.target.id;

            let file_reader = new FileReader();
    
            let file = event.target.files[0];
            
            file_reader.onload = () => {
         
                setFiles([...files, { file_id: id, uploaded_file: file_reader.result }]);
               
            };
         
       
            for (let i = 0; i < event.target.files.length; i++) {
                setFilesnameOne([...filesnameOne, { file_name:event.target.files[i].name}]);
       
            }
            file_reader.readAsDataURL(file);
        
 
    }

  // onChange function that reads second files on uploading them
    function onFileUploadTwo(event) {
        event.preventDefault();
      
            let id = event.target.id;

            let file_reader = new FileReader();
    
            let file = event.target.files[0];
            
            file_reader.onload = () => {
         
                setFiles([...files, { file_id: id, uploaded_file: file_reader.result }]);
               
            };
         
     
            for (let i = 0; i < event.target.files.length; i++) {
                setFilesnameTwo([...filesnameTwo, { file_name:event.target.files[i].name}]);
       
            }
    
            file_reader.readAsDataURL(file);
        
  
    }


    // handle submit button for form
    function handleSubmit(e) {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {

            console.log(files);
            console.log(filesnameOne);
            console.log(filesnameTwo);
            dispatch(attachimentAction.attachimentAction(files));
            
            axios({
                headers: { 
                    "Authorization": `Bearer ` + accesstoken,
                    "Content-Type": "multipart/form-data"
                    },
                method: 'post',
                url: 'https://epassportservices.azurewebsites.net/Person/api/V1.0/Person/UploadAttachment',
                data: {
                    "key": files.file_id,  
                    "value": files.uploaded_file,
                },
          
              })
              .then((response) => {
                alert('success');
                console.log("success" + response)
              }).catch((error) => {
                console.log("error" + error)
                alert('Error');
              })
        }
      
    }

    // button state whether it's disabled or enabled
    // const [enabled, setEnabled] = useState(false);

    // useEffect(() => {
    //     if (filesnameOne.length === 0 || filesnameTwo.length === 0) {
    //         setEnabled(false);
    //     } else {
    //         setEnabled(true);
    //     }
    // }, [files]);

    return (
        <div class="container">
        {emptyError ?
          <div className='red-text' style={Errorstyle}>{emptyError}</div> 
          : sizeError &&
            <div className='red-text' style={Errorstyle}>{sizeError}</div>
        }
                      <form className='mx-5' onSubmit={handleSubmit}>
                          
                    <div className='row my-3'>
        

                    <div class="col-lg-4">
                 
                    <div>
                    <select className="browser-default custom-select">
                    <option>Choose your option</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                    </select>
                </div>

        </div>

                    <div class="col-lg-8">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroupFileAddon01">
                                    Upload File
                            </span>
                            </div>
                            <div className="custom-file">
                                <input
                                    id={1}
                                    multiple
                                    type="file"
                                    className="custom-file-input"
                                    aria-describedby="birthCertificate1"
                                    accept="image/*"
                                    onChange={onFileUploadOne}
                                />
                                <div>
                                {
                                     filesnameOne.length ?
                                     filesnameOne.map(name => 
                                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                                    { name.file_name }
                                    </label>
                                     ):
                                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                                        Choose file
                                    </label>

                                }
                                       
                                </div>

                            </div>
                        </div>


                    </div>

        
                    </div>
               
                    <div className='row my3'>
                    <div class="col-lg-4">

                    <div>
                    <select className="browser-default custom-select">
                    <option>Choose your option</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                    </select>
                </div>

                    </div>
                    <div class="col-lg-8">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroupFileAddon01">
                                    Upload File
                            </span>
                            </div>
                            <div className="custom-file">
                                <input
                                    id={2}
                                    multiple
                                    type="file"
                                    className="custom-file-input"
                                    aria-describedby="birthCertificate2"
                                    accept="image/*"
                                    onChange={onFileUploadTwo}
                                />
                                <div>
                                {
                                     filesnameTwo.length ?
                                     filesnameTwo.map(name => 
                                    <label className="custom-file-label" htmlFor="inputGroupFile02">
                                    { name.file_name }
                                    </label>
                                     ):
                                    <label className="custom-file-label" htmlFor="inputGroupFile02">
                                        Choose file
                                    </label>

                                }
                                </div>

                            </div>
                        </div>


                    </div>
       
                    </div>
               

                    <div className="text-center signUpbutton mt-2">
                            <MDBBtn
                                id='btnLoad'
                                type="submit"
                                className="btn btn-info float-right mr-4">
                                Upload
                            </MDBBtn>
                        </div>
          
                         
                </form>
    
        </div>
  );
}
