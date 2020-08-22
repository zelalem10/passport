import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBListGroup, MDBListGroupItem } from 'mdbreact';
import axios from 'axios';

const Status = () => {

  const [showResults, setShowResults] = React.useState(false)
  const onClickResult = () => setShowResults(true)

  let [PassportNumber, setPassportNumber] = useState('');
  let [ReferenceNumber, setReferenceNumber] = useState('');

  let [responseData, setResponseData] = useState([]);

  const [PassportNumberFromButton, setPassportNumberFromButton] = useState('');
  const [ReferenceNumberFromButton, setReferenceNumberFromButton] = useState('');

  let githubClientId = process.env.GITHUB_CLIENT_ID;
  let githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

  const handleSubmit = (e) => {
    e.preventDefault();

    setPassportNumberFromButton(PassportNumber)
    setReferenceNumberFromButton(ReferenceNumber)
  }


  useEffect(() => {
    axios.get(`https://api.github.com/search/users?q=${PassportNumberFromButton}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
      // configuration
    ).then((response) => {
      setResponseData(response.data.items);
      console.log(response.data);
    }).catch((error) => {
      console.log("error" + error)
    })
  })
  
  //clear button
  const clearbutton = responseData.length > 0 ? true : false;

  // clear Serch Items
  const clearSerchItems = () => {
    setResponseData({ users: [] });
  };
  return (
    <>

      <MDBContainer>
        <MDBRow>
          <MDBCol md="3">

          </MDBCol>
          <MDBCol md="6">
            <form onSubmit={handleSubmit}>
              <div className="header pt-3 blue-gradient my-5">
                <MDBRow className="d-flex justify-content-center">
                  <h4 className="white-text mb-3 pt-3 font-weight-bold">
                    Check e-Passport status
                </h4>
                </MDBRow>
              </div>
              <input type="text"
                className="form-control"
                placeholder='Passport Number'
                value={PassportNumber}
                onChange={e => setPassportNumber(e.target.value)} />
              <br />
              <input type="text"
                className="form-control"
                placeholder='Reference Number'
                value={ReferenceNumber}
                onChange={e => setReferenceNumber(e.target.value)} />
              <div className="text-center py-4 mt-3">
                <div className="text-center mb-3">
                  <MDBBtn
                    type="submit"
                    gradient="blue"
                    className="btn-block"
                    onClick={onClickResult}>
                    Search
            </MDBBtn>
                </div>
              </div>


            </form>
            {clearbutton ?
              <div className="text-center mb-3">
                <MDBBtn
                  type="submit"
                  gradient="peach"
                  className="btn-block"
                  onClick={clearSerchItems}>
                  Clear
            </MDBBtn>
              </div> : null
            }
          </MDBCol>

        </MDBRow>
      </MDBContainer>
      {
        responseData.length &&
        responseData.map(responseData =>
          <div>
            {showResults &&
              <MDBContainer
                className="passport-container pt-3"
                id="request-an-appointment"
              >
                <MDBRow>
                  <MDBCol className="medium-12">

                    <div className="multistep-form__step">

                      <div className="small-12 column request-type">
                        <div class="request-card card card--small-gutters card--shadow row ">
                          <a class="small-12 column row card--link vertical-margin-1 ">
                            <div class="small-12 medium-4 column card card--small-gutters card--teal flex flex--column align-center text-center">
                              <strong>{responseData.login}</strong>
                              <div class="text-center vertical-margin-half">
                              </div>
                            </div>
                            <div class="small-12 medium-8 column card card--small-gutters card--gray rtf rtf--small bold">

                              <img
                                src={responseData.avatar_url}
                                alt='user Image'
                                className='round-img'
                                style={{ width: '60px' }}
                              />
                              <p>
                                {responseData.html_url}
                              </p>


                            </div>
                          </a>
                        </div>
                      </div>

                    </div>
                    <div className="text-center mb-3">
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            }
          </div>

        )
      }
    </>
  );
};

export default Status;