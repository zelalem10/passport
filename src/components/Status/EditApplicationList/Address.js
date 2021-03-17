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
import axiosInstance from '../../Utils/axios';

const Address = forwardRef((props, ref) => {
  const [regionList, setRegionList] = useState([]);
  const isRequired = 'is required!';
  const { addressInformation } = props;
  const [addressInfo, setAddressInfo] = useState({
    id: addressInformation.id,
    region: addressInformation.region,
    city: addressInformation.city,
    state: addressInformation.state,
    zone: addressInformation.zone,
    wereda: addressInformation.wereda,
    kebele: addressInformation.kebele,
    street: addressInformation.street,
    houseNo: addressInformation.houseNo,
    poBox: addressInformation.poBox,
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

  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
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
    if (value != '') {
      setNotCompleted((prevState) => ({
        ...prevState,
        [name]: false,
      }));
    }
    else{
      setNotCompleted((prevState) => ({
        ...prevState,
        [name]: true,
      }));
    }
  };
 


  var prevInfo = counter.address[counter.address.length - 1];

  if (prevInfo !== null && typeof prevInfo !== 'undefined') {

    if (addressInfo.formCompleted === false) {

      setAddressInfo((prevState) => ({

        ...prevState,

        region: prevInfo.region,

        city: prevInfo.city,

        state: prevInfo.state,

        zone: prevInfo.zone,

        woreda: prevInfo.woreda,

        street: prevInfo.street,

        houseNo: prevInfo.houseNo,

        poBox: prevInfo.poBox,

        requestPlace: prevInfo.requestPlace,

        formCompleted: true,

      }));

    }

  }
  useEffect(() => {

    setNotCompleted({

      region: addressInfo.region === '' ? true : false,

      city: addressInfo.city === '' ? true : false,

      state:addressInfo.state === '' ? true : false,

      zone: addressInfo.zone === '' ? true : false,

      woreda: addressInfo.woreda === '' ? true : false,

      kebele: addressInfo.kebele === '' ? true : false,

      street: addressInfo.street === '' ? true : false,

      houseNo: addressInfo.houseNo === '' ? true : false,

      poBox: addressInfo.poBox === '' ? true : false,

      requestPlace: addressInfo.requestPlace === '' ? true : false,

    });

    setRegionList(JSON.parse(localStorage.countryRegions))

    if (regionList.length === 0) {
axiosInstance.get('/Master/api/V1.0/CountryRegion/GetAll')
        .then((todo) => {

          setRegionList(todo.data.countryRegions);

        })

        .catch((err) => {

          console.log('AXIOS ERROR: ', err.response);

        });

    }

    

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
                    {regionList.map((region) => (
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
                  valueDefault={prevInfo ? prevInfo.city : addressInfo.city?addressInfo.city:null}
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
                  valueDefault={prevInfo ? prevInfo.state : addressInfo.state?addressInfo.state:null}
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
                  valueDefault={prevInfo ? prevInfo.zone : addressInfo.zone?addressInfo.zone:null}
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
                  valueDefault={prevInfo ? prevInfo.wereda : addressInfo.wereda?addressInfo.wereda:null}
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
                  valueDefault={prevInfo ? prevInfo.street : addressInfo.street?addressInfo.street:null}
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
                  valueDefault={prevInfo ? prevInfo.kebele : addressInfo.kebele?addressInfo.kebele:null}
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
                  valueDefault={prevInfo ? prevInfo.houseNo : addressInfo.houseNo?addressInfo.houseNo:null}
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
                  valueDefault={prevInfo ? prevInfo.poBox : addressInfo.poBox?addressInfo.poBox:null}
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
