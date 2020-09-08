import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { MDBContainer } from 'mdbreact';
import { Form, Card, Row, Col, InputGroup, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import addAddressInfo from '../../../redux/actions/addAddressInfoAction';

const Address = forwardRef((props, ref) => {
  debugger;
  const { addressInformation } = props;
  console.log(addressInformation);
  const [addressInfo, setAddressInfo] = useState({
    id: addressInformation.id,
    country: addressInformation.country,
    city: addressInformation.city,
    state: addressInformation.state,
    zone: addressInformation.zone,
    woreda: addressInformation.wereda,
    street: addressInformation.street,
    houseNo: addressInformation.houseNo,
    poBox: addressInformation.poBox,
    phoneNumber: addressInformation.phoneNumber,
    email: addressInformation.email,
    requestPlace: addressInformation.requestPlace,
    dataSaved: false,
  });
  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  if (counter.address.length === 0) {
    dispatch(addAddressInfo(addressInfo));
  }
  // const handleSave = (event) => {
  //     setAddressInfo((prevState) =>({
  //         ...prevState,
  //         dataSaved: true,
  //         }));
  //     dispatch(addAddressInfo(addressInfo));
  // }
  useImperativeHandle(ref, () => ({
    saveData() {
      setAddressInfo((prevState) => ({
        ...prevState,
        dataSaved: true,
      }));
      dispatch(addAddressInfo(addressInfo));
    },
    Validate() {
      //alert("Validation")
    },
  }));
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddressInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  var prevInfo = counter.address[counter.address.length - 1];
  useEffect(() => {
    setAddressInfo((prevState) => ({
      ...prevState,
      id: prevInfo ? prevInfo.id : null,
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
    <MDBContainer className="passport-container pt-3" fluid>
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
                    name="country"
                    type="text"
                    placeholder="Country"
                    defaultValue={prevInfo ? prevInfo.country : null}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom03">
                  <Form.Label>
                    City<i style={{ color: 'red' }}>*</i>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    placeholder="City"
                    required
                    defaultValue={prevInfo ? prevInfo.city : null}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid city.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                  <Form.Label>
                    State<i style={{ color: 'red' }}>*</i>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    placeholder="State"
                    required
                    defaultValue={prevInfo ? prevInfo.state : null}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid state.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                  <Form.Label>
                    Zone<i style={{ color: 'red' }}>*</i>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="zone"
                    placeholder="Zone"
                    required
                    defaultValue={prevInfo ? prevInfo.zone : null}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid state.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} md="3" controlId="validationCustom02">
                  <Form.Label>
                    Wereda<i style={{ color: 'red' }}>*</i>
                  </Form.Label>
                  <Form.Control
                    required
                    name="woreda"
                    type="text"
                    placeholder="Woreda"
                    defaultValue={prevInfo ? prevInfo.woreda : null}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom03">
                  <Form.Label>
                    Street<i style={{ color: 'red' }}>*</i>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="street"
                    placeholder="Street"
                    required
                    defaultValue={prevInfo ? prevInfo.street : null}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid city.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                  <Form.Label>
                    HouseNo<i style={{ color: 'red' }}>*</i>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="houseNo"
                    placeholder="HouseNo"
                    required
                    defaultValue={prevInfo ? prevInfo.houseNo : null}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid state.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                  <Form.Label>
                    PoBox<i style={{ color: 'red' }}>*</i>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="poBox"
                    placeholder="PoBox"
                    required
                    defaultValue={prevInfo ? prevInfo.poBox : null}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid state.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} md="3" controlId="validationCustom02">
                  <Form.Label>
                    Phone Number<i style={{ color: 'red' }}>*</i>
                  </Form.Label>
                  <Form.Control
                    required
                    name="phoneNumber"
                    type="text"
                    placeholder="PhoneNumber"
                    defaultValue={prevInfo ? prevInfo.phoneNumber : null}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom03">
                  <Form.Label>
                    Email<i style={{ color: 'red' }}>*</i>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    defaultValue={prevInfo ? prevInfo.email : null}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid city.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                  <Form.Label>
                    Request Place<i style={{ color: 'red' }}>*</i>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="requestPlace"
                    placeholder="Request Place"
                    required
                    defaultValue={prevInfo ? prevInfo.requestPlace : null}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid state.
                  </Form.Control.Feedback>
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
    </MDBContainer>
  );
});

export default Address;
