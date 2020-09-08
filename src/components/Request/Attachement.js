import React from 'react';
import axios from 'axios';
const accesstoken = localStorage.systemToken;
class Fileupload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fileOne: '',
      fileOneName: '',
      fileTwo: '',
      fileTwoName: '',
      messageSuccess: false,
      messageError: false,
    };
  }

  async submit(e) {
    e.preventDefault();
    const url = 'https://epassportservices.azurewebsites.net/api/Request/V1.0/RequestAttachments/UploadAttachment';
    const formData = new FormData();
    formData.append('personRequestId', 10);
    formData.append('1', this.state.fileOne);
    formData.append('2', this.state.fileTwo);
    console.log(this.state.fileOne);
    console.log(this.state.fileTwo);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': 'Bearer ' + accesstoken
      },
    };



    debugger;
    //return post(url, formData, config);
    return axios.post(url, formData, config)
      .then((response) => {
        console.log(response.data);
        alert('success')
        this.state.messageSuccess = true;
      })
      .catch((error) => {
        console.log("error" + error.message)
        alert('Error');
        this.state.messageError = true;
      })
  }
  setFileOne(e) {
    if (e.target.files.length > 0) {
      this.setState({ fileOne: e.target.files[0], fileOneName: e.target.files[0].name });

    }
  }
  setFileTwo(e) {
    if (e.target.files.length > 0) {
      this.setState({ fileTwo: e.target.files[0], fileTwoName: e.target.files[0].name });
    }
  }

  render() {
    return (
      <div className="container-fluid">

        <form onSubmit={e => this.submit(e)}>
          {
            this.state.messageSuccess &&
            <div class="alert alert-success" role="alert">
              This is a success alert—check it out!
            </div>
          }
          {
            this.state.messageError &&
            <div class="alert alert-danger" role="alert">
              This is a danger alert—check it out!
          </div>
          }


          <div class="row">
            <div class="col-lg-6">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupFileAddon01">
                    Upload
                      </span>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={e => this.setFileOne(e)}
                  />
                  <label className="custom-file-label" htmlFor="inputGroupFile01">
                    {this.state.fileOneName ? this.state.fileOneName : <div>Choose file</div>}
                  </label>
                </div>
              </div>

            </div>
            <div class="col-lg-6">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupFileAddon01">
                    Upload
                      </span>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={e => this.setFileTwo(e)}
                  />
                  <label className="custom-file-label" htmlFor="inputGroupFile01">
                    {this.state.fileTwoName ? this.state.fileTwoName : <div>Choose file</div>}
                  </label>
                </div>
              </div>

            </div>
          </div>

          <button className="btn btn-primary" type="submit">Upload</button>
        </form>
      </div>
    )
  }
}
export default Fileupload