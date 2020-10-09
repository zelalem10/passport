import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { MDBCol, MDBInput, MDBRow } from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Container from '@material-ui/core/Container';
import { Form, Card, Row, Col, InputGroup, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import addAddressInfo from '../../../../redux/actions/addAddressInfoAction';

const Address = forwardRef((props, ref) => {
  const { applicants } = props;
  let addressInformation = [];
  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  const personRef = React.useRef();
  const [addressInfo, setAddressInfo] = useState([]);
  if (counter.address.length === 0) {
    for (let i = 0; i < applicants.length; i++) {
      let address = applicants[i].address;
      addressInformation.push({
        id: address ? address.id : 0,
        applicantNumber: applicants[i].id,
        country: address ? address.country : null,
        city: address ? address.city : null,
        state: address ? address.state : null,
        zone: address ? address.zone : null,
        woreda: address ? address.wereda : null,
        street: address ? address.street : null,
        houseNo: address ? address.houseNo : null,
        poBox: address ? address.poBox : null,
        phoneNumber: address ? address.phoneNumber : null,
        email: address ? address.email : null,
        requestPlace: address ? address.requestPlace : null,
        dataSaved: false,
      });
    }
    setAddressInfo(addressInformation);
    dispatch(addAddressInfo(addressInformation));
  }
  const [notCompleted, setNotCompleted] = useState({
    country: true,
    city: true,
    state: true,
    zone: true,
    woreda: true,
    street: true,
    houseNo: true,
    poBox: true,
    phoneNumber: true,
    email: true,
    requestPlace: true,
  });
  useImperativeHandle(ref, () => ({
    saveData() {
      setAddressInfo((prevState) => ({
        ...prevState,
        dataSaved: true,
      }));
      dispatch(addAddressInfo(addressInfo));
    },
    Validate() {
      setNotCompleted({
        country: addressInfo.country === '' ? true : false,
        city: addressInfo.city === '' ? true : false,
        state: addressInfo.state === '' ? true : false,
        zone: addressInfo.zone === '' ? true : false,
        woreda: addressInfo.woreda === '' ? true : false,
        street: addressInfo.street === '' ? true : false,
        houseNo: addressInfo.houseNo === '' ? true : false,
        poBox: addressInfo.poBox === '' ? true : false,
        phoneNumber: addressInfo.phoneNumber === '' ? true : false,
        email: addressInfo.email === '' ? true : false,
        requestPlace: addressInfo.requestPlace === '' ? true : false,
      });
      if (
        notCompleted.country == true ||
        notCompleted.city == true ||
        notCompleted.state == true ||
        notCompleted.zone == true ||
        notCompleted.woreda == true ||
        notCompleted.street == true ||
        notCompleted.houseNo == true ||
        notCompleted.poBox == true ||
        notCompleted.phoneNumber == true ||
        notCompleted.email == true ||
        notCompleted.requestPlace == true
      )
        return false;
      else return true;
    },
  }));
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddressInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (value != '') {
      setNotCompleted((prevState) => ({
        ...prevState,
        [name]: false,
      }));
    }
  };
  let prevInfo;
  if (counter.address.length !== 0) {
     ;
    const resultLength = counter.address.filter(
      (item) => item.applicantNumber == props.applicantNumber
    ).length;
    const applicantInformation = counter.address[counter.address.length - 1];
    if (applicantInformation) {
      const size = applicantInformation.hasOwnProperty('country');
      if (size && resultLength !== 0) {
        prevInfo = counter.address.filter(
          (item) => item.applicantNumber == props.applicantNumber
        )[resultLength - 1];
      } else {
        const applicantsInformation = counter.address[0];
        for (let applicant in applicantsInformation) {
          if (
            applicantsInformation[applicant].applicantNumber ==
            props.applicantNumber
          ) {
            prevInfo = applicantsInformation[applicant];
          }
        }
      }
    }
  }
  const isRequired = 'is required!';
  useEffect(() => {
    setAddressInfo((prevState) => ({
      ...prevState,
      id: prevInfo ? prevInfo.id : 0,
      applicantNumber: prevInfo ? prevInfo.applicantNumber : null,
      country: prevInfo ? prevInfo.country : null,
      city: prevInfo ? prevInfo.city : null,
      state: prevInfo ? prevInfo.state : null,
      zone: prevInfo ? prevInfo.zone : null,
      woreda: prevInfo ? prevInfo.woreda : null,
      street: prevInfo ? prevInfo.street : null,
      houseNo: prevInfo ? prevInfo.houseNo : null,
      poBox: prevInfo ? prevInfo.poBox : null,
      phoneNumber: prevInfo ? prevInfo.phoneNumber : null,
      email: prevInfo ? prevInfo.email : null,
      requestPlace: prevInfo ? prevInfo.requestPlace : null,
      dataSaved: prevInfo ? prevInfo.dataSaved : null,
    }));
  }, []);
  return (
    <blockquote className=" mb-0">
      <form>
        <MDBRow>
          <MDBCol md="4">
            <MDBCol>
              <MDBInput
                label="Country"
                group
                type="text"
                name="country"
                validate
                error="wrong"
                success="right"
                valueDefault={prevInfo ? prevInfo.country : null}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol>
              <MDBInput
                label="City"
                group
                type="text"
                name="city"
                validate
                error="wrong"
                success="right"
                valueDefault={prevInfo ? prevInfo.city : null}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol>
              <MDBInput
                label="State"
                group
                type="text"
                name="state"
                validate
                error="wrong"
                success="right"
                valueDefault={prevInfo ? prevInfo.state : null}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol>
              <MDBInput
                label="Email"
                group
                type="email"
                name="email"
                validate
                error="wrong"
                success="right"
                valueDefault={prevInfo ? prevInfo.email : null}
                onChange={handleChange}
              />
            </MDBCol>
          </MDBCol>
          <MDBCol md="4">
            <MDBCol>
              <MDBInput
                label="Zone"
                group
                type="text"
                name="zone"
                validate
                error="wrong"
                success="right"
                valueDefault={prevInfo ? prevInfo.zone : null}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol>
              <MDBInput
                label="Wereda"
                group
                type="text"
                name="woreda"
                validate
                error="wrong"
                success="right"
                valueDefault={prevInfo ? prevInfo.woreda : null}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol>
              <MDBInput
                label="Street"
                group
                type="text"
                name="street"
                validate
                error="wrong"
                success="right"
                valueDefault={prevInfo ? prevInfo.street : null}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol>
              <MDBInput
                label="Request Place"
                group
                type="text"
                name="requestPlace"
                validate
                error="wrong"
                success="right"
                valueDefault={prevInfo ? prevInfo.requestPlace : null}
                onChange={handleChange}
              />
            </MDBCol>
          </MDBCol>
          <MDBCol md="4">
            <MDBCol>
              <MDBInput
                label="HouseNo"
                group
                type="text"
                name="houseNo"
                validate
                error="wrong"
                success="right"
                valueDefault={prevInfo ? prevInfo.houseNo : null}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol>
              <MDBInput
                label="PoBox"
                group
                type="text"
                name="poBox"
                validate
                error="wrong"
                success="right"
                valueDefault={prevInfo ? prevInfo.poBox : null}
                onChange={handleChange}
              />
            </MDBCol>

            <MDBCol>
              <MDBInput
                label="Phone Number"
                group
                type="text"
                name="phoneNumber"
                validate
                error="wrong"
                success="right"
                valueDefault={prevInfo ? prevInfo.phoneNumber : null}
                onChange={handleChange}
              />
            </MDBCol>
          </MDBCol>
        </MDBRow>
      </form>
    </blockquote>
  );
});

export default Address;
