import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { MDBContainer, MDBCol, MDBInput, MDBRow } from 'mdbreact';
import { Card } from 'react-bootstrap';
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
        <Card.Body>
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
        </Card.Body>
  );
});

export default Address;
