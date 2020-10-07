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
import API from '../../Utils/API';

const Address = forwardRef((props, ref) => {
  const [countryList, setCountryList] = useState([]);
  const { addressInformation } = props;
  console.log(addressInformation);
  const [addressInfo, setAddressInfo] = useState({
    id: addressInformation.id,
    region: addressInformation.region,
    city: addressInformation.city,
    state: addressInformation.state,
    zone: addressInformation.zone,
    wereda: addressInformation.wereda,
    street: addressInformation.street,
    houseNo: addressInformation.houseNo,
    poBox: addressInformation.poBox,
    requestPlace: addressInformation.requestPlace,
    dataSaved: false,
  });
  const [notCompleted, setNotCompleted] = useState({
    region: addressInformation.region ? false : true,
    city: addressInformation.city ? false : true,
    state: addressInformation.state ? false : true,
    zone: addressInformation.zone ? false : true,
    woreda: addressInformation.wereda ? false : true,
    kebele: addressInformation.kebele ? false : true,
    street: addressInformation.street ? false : true,
    houseNo: addressInformation.houseNo ? false : true,
    poBox: addressInformation.poBox ? false : true,
  });
  const tokenValue = () => {
    const UserToken = localStorage.userToken;

    if (UserToken) {
      return UserToken;
    } else {
      const SystemToken = localStorage.systemToken;
      return SystemToken;
    }
  };
  const token = tokenValue();
  const config = {
    headers: { Authorization: 'Bearer ' + token },
  };
  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  const isRequired = 'is required!';
  if (counter.address.length === 0) {
    dispatch(addAddressInfo(addressInfo));
  }
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
        region: addressInfo.region === '' ? true : false,
        city: addressInfo.city === '' ? true : false,
        state: addressInfo.state === '' ? true : false,
        zone: addressInfo.zone === '' ? true : false,
        woreda: addressInfo.woreda === '' ? true : false,
        kebele: addressInfo.kebele === '' ? true : false,
        street: addressInfo.street === '' ? true : false,
        houseNo: addressInfo.houseNo === '' ? true : false,
        poBox: addressInfo.poBox === '' ? true : false,
        requestPlace: addressInfo.requestPlace === '' ? true : false,
      });
      if (notCompleted.region == true || notCompleted.city == true)
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
  };
  if (countryList.length === 0) {
    setCountryList(JSON.parse(localStorage.countryRegions));
  }
  const getCountryRegion = (id) => {
    // for (let index = 0; index < countryRegion.length; index++) {
    //   if (countryRegion[index].id == id) {
    //     return countryRegion[index].type;
    //   }
    // }
  };
  var prevInfo = counter.address[counter.address.length - 1];
  useEffect(() => {
    setAddressInfo((prevState) => ({
      ...prevState,
      id: prevInfo ? prevInfo.id : null,
      region: prevInfo ? prevInfo.region : null,
      city: prevInfo ? prevInfo.city : null,
      state: prevInfo ? prevInfo.state : null,
      zone: prevInfo ? prevInfo.zone : null,
      wereda: prevInfo ? prevInfo.wereda : null,
      street: prevInfo ? prevInfo.street : null,
      houseNo: prevInfo ? prevInfo.houseNo : null,
      poBox: prevInfo ? prevInfo.poBox : null,

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
                <div
                  className="md-form form-group passport-select"
                  style={{ 'margin-bottom': '2.5rem' }}
                >
                  <label class="passport-selectList-label">
                    Region
                    <i
                      class="required-for-select-list"
                      style={{ color: 'red' }}
                    >
                      *
                    </i>{' '}
                  </label>
                  <select
                    name="region"
                    onChange={handleChange}
                    className="browser-default custom-select"
                    // defaultValue={prevInfo ? prevInfo.nationalityId : 0}
                  >
                    <option disabled>select Region</option>
                    {countryList.map((region) => (
                      <option
                        value={region.name}
                        selected={region.name === prevInfo.region}
                      >
                        {region.name}
                      </option>
                    ))}
                  </select>
                </div>
                <span style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.region == true && addressInfo.dataSaved == true
                    ? 'Region ' + isRequired
                    : null}
                </span>
              </MDBCol>
            </MDBCol>
            <MDBCol md="4">
              <MDBCol className="required-field">
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
                <span style={{ color: 'red' }}>
                  {' '}
                  {notCompleted.city == true && addressInfo.dataSaved == true
                    ? 'City ' + isRequired
                    : null}
                </span>
              </MDBCol>
            </MDBCol>
            <MDBCol md="4">
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
            </MDBCol>
          </MDBRow>
          <MDBRow>
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
            </MDBCol>
            <MDBCol md="4">
              <MDBCol>
                <MDBInput
                  label="Wereda"
                  group
                  type="text"
                  name="wereda"
                  validate
                  error="wrong"
                  success="right"
                  valueDefault={prevInfo ? prevInfo.wereda : null}
                  onChange={handleChange}
                />
              </MDBCol>
            </MDBCol>
            <MDBCol md="4">
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
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="4">
              <MDBCol>
                <MDBInput
                  label="Kebele"
                  group
                  type="text"
                  name="kebele"
                  validate
                  error="wrong"
                  success="right"
                  valueDefault={prevInfo ? prevInfo.kebele : null}
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
            </MDBCol>
            <MDBCol md="4">
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
            </MDBCol>
          </MDBRow>
        </form>
      </blockquote>
    </Card.Body>
  );
});

export default Address;
