import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { MDBRow, MDBCol, MDBInput, MDBCardBody, MDBCard } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import addTravelPlan from '../../../redux/actions/addTravelPlanAction';
import { Card } from 'react-bootstrap';

import axios from 'axios';

const TravelPlan = forwardRef((props, ref) => {
  const [validated, setValidated] = useState(false);
  const {
    filledBy,
    pageQuantity,
    displayedApplication,
    personalInformation,
  } = props;
  debugger;
  const [travelPlan, setTravelPlan] = useState({
    filledBy: filledBy,
    pageQuantity: pageQuantity,
    dataSaved: false,
  });
  debugger;
  const accesstoken = localStorage.systemToken;

  let requestPersonId = personalInformation.requestPersonId;
  let requestTypeId = displayedApplication.requestTypeId;
  let attachmentlength;
  let attachmentPath = [];
  let attachmentType = [];
  let attachmentId = [];

  console.log(displayedApplication);

  useEffect(() => {
    axios({
      headers: { Authorization: 'Bearer ' + accesstoken },
      method: 'get',
      url:
        'https://epassportservices.azurewebsites.net/Request/api/V1.0/RequestAttachments/GetAttachment',
      params: { personRequestId: requestPersonId },
    })
      .then((Response) => {
        debugger;
        attachmentlength = Response.data.attachments.length;
        localStorage.setItem('attachmentlength', attachmentlength);
        for (let i = 0; i < attachmentlength; i++) {
          attachmentPath.push(Response.data.attachments[i].attachmentPath);
          attachmentType.push(Response.data.attachments[i].attachmentType);
          attachmentId.push(Response.data.attachments[i].attachmentId);
        }
        if (localStorage.attachmentPath) {
          localStorage.removeItem('attachmentPath');
        }
        if (localStorage.attachmentType) {
          localStorage.removeItem('attachmentType');
        }
        if (localStorage.attachmentId) {
          localStorage.removeItem('attachmentId');
        }
        localStorage.setItem('attachmentPath', JSON.stringify(attachmentPath));
        localStorage.setItem('attachmentType', JSON.stringify(attachmentType));
        localStorage.setItem('attachmentId', JSON.stringify(attachmentId));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  const personRef = React.useRef();
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
      return true;
    },
  }));
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTravelPlan((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  var prevInfo = counter.travelPlan[counter.travelPlan.length - 1];
  useEffect(() => {
    setTravelPlan((prevState) => ({
      ...prevState,
      filledBy: prevInfo ? prevInfo.filledBy : null,
      pageQuantity: prevInfo ? prevInfo.pageQuantity : '0',
    }));
  }, []);

  const handleCheck = (name, checked) => {
    setTravelPlan((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };
  return (
    <Card.Body>
      <blockquote className=" mb-0">
        <form>
          <div className="grey-text">
            <MDBRow>
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
              <MDBCol>
                <label>Page Quantity</label>
                <select className="browser-default custom-select">
                  <option value="0">32</option>
                  <option value="1">64</option>
                </select>
              </MDBCol>
            </MDBRow>
          </div>
        </form>
      </blockquote>
    </Card.Body>
  );
});

export default TravelPlan;
