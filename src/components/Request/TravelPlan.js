
import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import addTravelPlan from '../../redux/actions/addTravelPlanAction';
import axios from 'axios';

function requestTypeGetter(requetTypeId){
  switch(requetTypeId){
    case 2:
      return "New"
    case 3:
      return "Renew/Replacement"
    case 4:
      return "Lost"
    case 8:
      return "Correction"
    default:
      return "Unkown"
  }
}
const TravelPlan = forwardRef((props, ref) => {
  const [travelPlan, setTravelPlan] = useState({
    travelDate: "",
    ticketNumber: "",
    filledBy: "",
    pageQuantity: "0",
    passportType:"",
    passportNumber:"",
    expirationDate:"",
    issueDate:"",
    isDatacorrected: false,
    dataSaved: false
  });
  const dispatch = useDispatch();
  const counter = useSelector((state) => state);

  const accesstoken = localStorage.systemToken;
  let requestTypefromRedux = useSelector((state) => state.service);
  let requestTypeId = requestTypefromRedux[requestTypefromRedux.length - 1].appointemntType

  useEffect(() => {
      axios({
        headers: { 'Authorization': 'Bearer ' + accesstoken },
        method: 'get',
        url: 'https://epassportservices.azurewebsites.net/Master/api/V1.0/OfficeRequestType/GetRequiredAttachementsByRequestTypeId',
        params: { "requestTypeId": requestTypeId },
      })
        .then((response) => {
          let requiredAttachements = response.data.requiredAttachements.length;
          let requiredAttachementType = [];
          let attachmentTypeName = [];
          for (let i = 0; i < response.data.requiredAttachements.length; i++) {
            requiredAttachementType.push(response.data.requiredAttachements[i].attachmentTypeId);
            attachmentTypeName.push(response.data.requiredAttachements[i].attachmentType);
            
            console.log(response.data.requiredAttachements);
          }
          console.log(requiredAttachementType);
          
          if (localStorage.requiredAttachements){
              localStorage.removeItem('requiredAttachements');
          }
          localStorage.setItem('requiredAttachements', requiredAttachements);
          localStorage.setItem('requiredAttachementType', JSON.stringify(requiredAttachementType));
          localStorage.setItem('attachmentTypeName', JSON.stringify(attachmentTypeName));
        })
        .catch((error) => {
          console.log("error" + error.message)
        })
    }, []);

  if (counter.travelPlan.length === 0) {
    dispatch(addTravelPlan(travelPlan));
  }
  useImperativeHandle(ref, () => ({
    saveData() {
      setTravelPlan((prevState) => ({
        ...prevState,
        dataSaved: true,
      }));
      dispatch(addTravelPlan(travelPlan));
    },
    Validate() {
      return true
    }
  }));
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTravelPlan((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    dispatch(addTravelPlan(travelPlan));
  }
  const handleCheck = (name,checked) => {
    setTravelPlan((prevState) => ({
        ...prevState,
        [name]: checked,
    }))
    // if (!event.target.checked) {
    //     setNotCompleted((prevState) => ({
    //         ...prevState,
    //         [name]: false,
    //     }))
    // }
}
  var prevInfo = counter.travelPlan[counter.travelPlan.length - 1];
    const serviceSelcetion = counter.service[counter.service.length - 1];
    const requestType= serviceSelcetion.appointemntType;
    const requestTypeStr=requestTypeGetter(requestType);
  useEffect(() => {
    if (counter.travelPlan.length === 0) {
      dispatch(addTravelPlan(travelPlan));
    }
    setTravelPlan((prevState) => ({
      ...prevState,
      travelDate: prevInfo ? prevInfo.travelDate : null,
      ticketNumber: prevInfo ? prevInfo.ticketNumber : null,
      filledBy: prevInfo ? prevInfo.filledBy : null,
      pageQuantity: prevInfo ? prevInfo.pageQuantity : "0",
      passportType: prevInfo ? prevInfo.passportType : null,
      passportNumber: prevInfo ? prevInfo.passportNumber : null,
      expirationDate: prevInfo ? prevInfo.expirationDate : null,
      issueDate: prevInfo ? prevInfo.issueDate : null,
      isDatacorrected:prevInfo? prevInfo.isDatacorrected:false,
      dataSaved: prevInfo ? prevInfo.dataSaved : null,
    }))
  }, []);

  return (
    <MDBCard>
      <MDBCardBody>
        <form>
          <div className="grey-text">
            <MDBRow>
              <MDBCol>
                <MDBInput
                  valueDefault={prevInfo ? prevInfo.travelDate : null}
                  name="travelDate"
                  className="form-control"
                  onBlur={handleChange}
                  type="date"
                  label="Travel Date"
                />
              </MDBCol>
              <MDBCol>
                <MDBInput
                  valueDefault={prevInfo ? prevInfo.ticketNumber : null}
                  name="ticketNumber"
                  className="form-control"
                  onBlur={handleChange}
                  type="text"
                  label="Ticket Number"
                />
              </MDBCol>
              <MDBCol>
                <MDBInput
                  valueDefault={prevInfo ? prevInfo.filledBy : null}
                  name="filledBy"
                  className="form-control"
                  onBlur={handleChange}
                  type="text"
                  label="Application filled by"
                />
              </MDBCol>
              <MDBCol><label>Page Quantity</label>
                <select className="browser-default custom-select">
                  <option value="0">32</option>
                  <option value="1">64</option>
                </select>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol>
              <MDBInput
                  valueDefault={prevInfo ? prevInfo.passportType : null}
                  name="passportType"
                  className="form-control"
                  onBlur={handleChange}
                  type="text"
                  label="Passport Type"
                />
              </MDBCol>
              <MDBCol>
              <MDBInput
                  valueDefault={prevInfo ? prevInfo.passportNumber : null}
                  name="passportNumber"
                  className="form-control"
                  onBlur={handleChange}
                  type="text"
                  label="Passport Number"
                />
              </MDBCol>
              <MDBCol>
              <MDBInput
                  valueDefault={prevInfo ? prevInfo.expirationDate : null}
                  name="expirationDate"
                  className="form-control"
                  onBlur={handleChange}
                  type="date"
                  label="Expiration Date"
                />
              </MDBCol>
              <MDBCol>
              <MDBInput
                  valueDefault={prevInfo ? prevInfo.issueDate : null}
                  name="issueDate"
                  className="form-control"
                  onBlur={handleChange}
                  type="date"
                  label="Issue Date"
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              {(requestTypeStr==="Renew/Replacement"||requestTypeStr==="Lost")?
              (<MDBCol>
                <label></label>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="isCorrection"onChange={(e)=>handleCheck("isDatacorrected",e.target.checked)} />
                  <label class="custom-control-label" for="isCorrection">Is Data corrected</label>
                </div>
              </MDBCol>
              ):null}
            </MDBRow>
          </div>
        </form>
      </MDBCardBody>
    </MDBCard>
  );
});

export default TravelPlan