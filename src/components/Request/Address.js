import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import addAddressInfo from '../../redux/actions/addAddressInfoAction';
import API from '../Utils/API';

const Address = forwardRef((props, ref) => {
  const [addressInfo, setAddressInfo] = useState({
    region: '',
    city: '',
    state: '',
    zone: '',
    woreda: '',
    kebele: '',
    street: '',
    houseNo: '',
    poBox: '',
    requestPlace: '',
    dataSaved: false,
  });
  const [notCompleted, setNotCompleted] = useState({
    region: true,
    city: true,
    state: true,
    zone: true,
    woreda: true,
    kebele: true,
    street: true,
    houseNo: true,
    poBox: true,
    phoneNumber: true,
  });
  const [regionList, setRegionList] = useState([]);
  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  const accesstoken = localStorage.systemToken;
  const usertoken = localStorage.userToken;
  const config = {
    headers: { Authorization: 'Bearer ' + accesstoken },
  };
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
    dispatch(addAddressInfo(addressInfo));
  };
  var prevInfo = counter.address[counter.address.length - 1];
  const isRequired = 'is required!';
  useEffect(() => {
    setAddressInfo((prevState) => ({
      ...prevState,
      region: prevInfo ? prevInfo.region : '',
      city: prevInfo ? prevInfo.city : '',
      state: prevInfo ? prevInfo.state : '',
      zone: prevInfo ? prevInfo.zone : '',
      woreda: prevInfo ? prevInfo.woreda : '',
      street: prevInfo ? prevInfo.street : '',
      houseNo: prevInfo ? prevInfo.houseNo : '',
      poBox: prevInfo ? prevInfo.poBox : '',
      requestPlace: prevInfo ? prevInfo.requestPlace : '',
    }));

    setNotCompleted({
      region: prevInfo!==null && prevInfo.region === '' ? true : false,
      city: prevInfo!==null && prevInfo.city === '' ? true : false,
      state: prevInfo!==null && prevInfo.state === '' ? true : false,
      zone: prevInfo!==null && prevInfo.zone === '' ? true : false,
      woreda: prevInfo!==null && prevInfo.woreda === '' ? true : false,
      kebele: prevInfo!==null && prevInfo.kebele === '' ? true : false,
      street: prevInfo!==null && prevInfo.street === '' ? true : false,
      houseNo: prevInfo!==null && prevInfo.houseNo === '' ? true : false,
      poBox: prevInfo!==null && prevInfo.poBox === '' ? true : false,
      requestPlace: prevInfo!==null && prevInfo.requestPlace === '' ? true : false,
    });
    setRegionList(JSON.parse(localStorage.countryRegions))
    if (regionList.length === 0) {
      API.get('https://epassportservices.azurewebsites.net/Master/api/V1.0/CountryRegion/GetAll', config)
        .then((todo) => {
          setRegionList(todo.data.countryRegions);
        })
        .catch((err) => {
          console.log('AXIOS ERROR: ', err.response);
        });
    }
    
  }, []);
  return (
    <MDBCard>
      <MDBCardBody>
        <form>
          <MDBRow>
            <MDBCol md="3" className="required-field">
              <div>
                <label>
                  Region<i style={{ color: 'red' }}>*</i>{' '}
                </label>
                <select
                  className="browser-default custom-select"
                  name="region"
                  onChange={handleChange}
                >
                  <option>Select region</option>
                  {regionList.map((region) => (
                    <option value={region.name} selected={prevInfo !=null && (region.name===prevInfo.region)}>{region.name}</option>
                  ))}
                </select>
              </div>
              <span style={{ color: 'red' }}>
                {' '}
                {notCompleted.region == true && addressInfo.dataSaved == true
                  ? 'Region ' + isRequired
                  : null}
              </span>{' '}
            </MDBCol>

            <MDBCol md="3" className="required-field">
              <MDBInput
                valueDefault={prevInfo ? prevInfo.city : null}
                name="city"
                className="form-control"
                onBlur={handleChange}
                type="text"
                label="City"
              />
              <span style={{ color: 'red' }}>
                {' '}
                {notCompleted.city == true && addressInfo.dataSaved == true
                  ? 'City ' + isRequired
                  : null}
              </span>
            </MDBCol>
            <MDBCol md="3">
              <MDBInput
                valueDefault={prevInfo ? prevInfo.state : null}
                name="state"
                className="form-control"
                onBlur={handleChange}
                type="text"
                label="State"
              />
            </MDBCol>
            <MDBCol md="3">
              <MDBInput
                valueDefault={prevInfo ? prevInfo.zone : null}
                name="zone"
                className="form-control"
                onBlur={handleChange}
                type="text"
                label="Zone"
              />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="3">
              <MDBInput
                valueDefault={prevInfo ? prevInfo.woreda : null}
                name="woreda"
                className="form-control"
                onBlur={handleChange}
                type="text"
                label="Woreda"
              />
            </MDBCol>
            <MDBCol md="3">
              <MDBInput
                valueDefault={prevInfo ? prevInfo.kebele : null}
                name="kebele"
                className="form-control"
                onBlur={handleChange}
                type="text"
                label="Kebele"
              />
            </MDBCol>
            <MDBCol md="3">
              <MDBInput
                valueDefault={prevInfo ? prevInfo.street : null}
                name="street"
                className="form-control"
                onBlur={handleChange}
                type="text"
                label="Street"
              />
            </MDBCol>
            <MDBCol md="3">
              <MDBInput
                valueDefault={prevInfo ? prevInfo.houseNo : null}
                name="houseNo"
                className="form-control"
                onBlur={handleChange}
                type="text"
                label="House No."
              />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="3">
              <MDBInput
                valueDefault={prevInfo ? prevInfo.poBox : null}
                name="poBox"
                className="form-control"
                onBlur={handleChange}
                type="text"
                label="Po. Box"
              />
            </MDBCol>
            <MDBCol md="3">
              <MDBInput
                valueDefault={prevInfo ? prevInfo.requestPlace : null}
                name="requestPlace"
                className="form-control"
                onBlur={handleChange}
                type="text"
                label="Request Place"
              />
            </MDBCol>
          </MDBRow>
        </form>
      </MDBCardBody>
    </MDBCard>
  );
});

export default Address;
