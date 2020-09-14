import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { MDBContainer } from 'mdbreact';
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
    debugger;
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
    <Card>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <Form>
            <Form.Row>
              <Form.Group as={Col} md="3" controlId="validationCustom02">
                <Form.Label>
                  Country<i style={{ color: 'red' }}>*</i>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="country"
                  defaultValue={prevInfo ? prevInfo.country : null}
                  onChange={handleChange}
                />
                <p style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.country == true && addressInfo.dataSaved == true
                    ? 'Counrty ' + isRequired
                    : null}
                </p>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom03">
                <Form.Label>
                  City<i style={{ color: 'red' }}>*</i>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  defaultValue={prevInfo ? prevInfo.city : null}
                  onChange={handleChange}
                  required
                />
                <p style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.city == true && addressInfo.dataSaved == true
                    ? 'City ' + isRequired
                    : null}
                </p>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom04">
                <Form.Label>
                  State<i style={{ color: 'red' }}>*</i>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  defaultValue={prevInfo ? prevInfo.state : null}
                  onChange={handleChange}
                  required
                />
                <p style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.state == true && addressInfo.dataSaved == true
                    ? 'State ' + isRequired
                    : null}
                </p>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom04">
                <Form.Label>
                  Zone<i style={{ color: 'red' }}>*</i>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="zone"
                  defaultValue={prevInfo ? prevInfo.zone : null}
                  onChange={handleChange}
                  required
                />
                <p style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.zone == true && addressInfo.dataSaved == true
                    ? 'Zone ' + isRequired
                    : null}
                </p>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md="3" controlId="validationCustom02">
                <Form.Label>
                  Wereda<i style={{ color: 'red' }}>*</i>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="woreda"
                  defaultValue={prevInfo ? prevInfo.woreda : null}
                  onChange={handleChange}
                />
                <p style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.woreda == true && addressInfo.dataSaved == true
                    ? 'Woreda ' + isRequired
                    : null}
                </p>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom03">
                <Form.Label>
                  Street<i style={{ color: 'red' }}>*</i>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="street"
                  defaultValue={prevInfo ? prevInfo.street : null}
                  onChange={handleChange}
                  required
                />
                <p style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.street == true && addressInfo.dataSaved == true
                    ? 'Street ' + isRequired
                    : null}
                </p>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom04">
                <Form.Label>
                  HouseNo<i style={{ color: 'red' }}>*</i>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="houseNo"
                  defaultValue={prevInfo ? prevInfo.houseNo : null}
                  onChange={handleChange}
                  required
                />
                <p style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.houseNo == true && addressInfo.dataSaved == true
                    ? 'House No. ' + isRequired
                    : null}
                </p>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom04">
                <Form.Label>
                  PoBox<i style={{ color: 'red' }}>*</i>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="poBox"
                  defaultValue={prevInfo ? prevInfo.poBox : null}
                  onChange={handleChange}
                  required
                />
                <p style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.poBox == true && addressInfo.dataSaved == true
                    ? 'PoBox ' + isRequired
                    : null}
                </p>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md="3" controlId="validationCustom02">
                <Form.Label>
                  Phone Number<i style={{ color: 'red' }}>*</i>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="phoneNumber"
                  defaultValue={prevInfo ? prevInfo.phoneNumber : null}
                  onChange={handleChange}
                />
                <p style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.phoneNumber == true &&
                  addressInfo.dataSaved == true
                    ? 'Phone Number ' + isRequired
                    : null}
                </p>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom03">
                <Form.Label>
                  Email<i style={{ color: 'red' }}>*</i>
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  defaultValue={prevInfo ? prevInfo.email : null}
                  onChange={handleChange}
                  required
                />
                <p style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.email == true && addressInfo.dataSaved == true
                    ? 'Email ' + isRequired
                    : null}
                </p>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom04">
                <Form.Label>
                  Request Place<i style={{ color: 'red' }}>*</i>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="requestPlace"
                  defaultValue={prevInfo ? prevInfo.requestPlace : null}
                  onChange={handleChange}
                  required
                />
                <p style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.requestPlace == true &&
                  addressInfo.dataSaved == true
                    ? 'Request Place ' + isRequired
                    : null}
                </p>
              </Form.Group>
            </Form.Row>
            {/* <Row>
                            <Col md="5"></Col>
                            <Button variant="success"  onClick={handleSave}>Save</Button>
                        </Row> */}
          </Form>
        </blockquote>
      </Card.Body>
    </Card>
  );
});

export default Address;
