import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as ReactBootstrap from 'react-bootstrap';
import { MDBRow, MDBCol, MDBInput,  MDBCard, MDBCardBody } from 'mdbreact';
import API from '../Utils/API';
import { useDispatch, useSelector } from 'react-redux';
import saveSiteInformation from '../../redux/actions/siteInformationAction';


const accesstoken = localStorage.systemToken;
const SiteSelection=forwardRef((props, ref) => {
  const [cityList, setCityList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [officeList, setOfficeList] = useState([]);
  const [officeId, setOfficeId] = useState(0);
  const [officeName, setOfficeName] = useState('');
  const [officeAddress, setOfficeAddress] = useState('');
  const [officeContact, setOfficeContact] = useState('');
  const [duration, setDuration] = useState('');

  const [officeInfo, setOfficeInfo] = useState({
    offceId:0,
    cityId:0,
    reagionId:0,
  });
  const [formCompleted, setFormCompleted] = useState(false);
  const [dataSaved, setDataSaved] = useState(false);
  const [notCompleted, setNotCompleted] = useState({
    officeId:true,
    cityId: true,
    reagionId: true,
  });

  const accesstoken = localStorage.systemToken;
  const dispatch = useDispatch();
  const officeURL =
    'https://epassportservices.azurewebsites.net/Master/api/V1.0/Office/GetByCityId?id=';
  const config = {
    headers: {
      Authorization: `Bearer `+ accesstoken,
    },
  };

  const handleRegionChange = (event) => {
    const selectedRegion = regionList.filter(item => item.id == event.target.value);
    setNotCompleted((prevState) => ({
      ...prevState,
      reagionId: false,
  }));
    setCityList(selectedRegion[0].cities);
  };
  function handeleCityChange(event) {
    setNotCompleted((prevState) => ({
      ...prevState,
      cityId: false,
  }));
  //   setOfficeInfo((prevState) => ({
  //     ...prevState,
  //     cityId: event.target.value,
  // }));
    API.get(officeURL + event.target.value, config)
      .then((todo) => {
        setOfficeList(todo.data.offices);
      })
      .catch((err) => {
        console.log('AXIOS ERROR: ', err);
      });
  }

  function handelOfficeChange(event) {
    setOfficeId(event.target.value)
    const selectedOff = officeList.filter(office => office.id == event.target.value)
    setOfficeName(selectedOff[0].name);
    setOfficeAddress(selectedOff[0].address);
    setOfficeContact(selectedOff[0].fax);
    setOfficeInfo((prevState) => ({
      ...prevState,
      offceId: officeId,
  }));
  setNotCompleted((prevState) => ({
    ...prevState,
    officeId: false,
}));
  dispatch(saveSiteInformation(officeInfo));
    setFormCompleted(true)
  }

  useImperativeHandle(ref, () => ({
    saveData(){
      setDataSaved(true)
    },
    isCompleted() {
      return formCompleted;
    }
  }));

  useEffect(() => {
    const body = {
      username: 'atalay',
      password: 'Atie@1234',
    };
    API.get('https://epassportservices.azurewebsites.net/Master/api/V1.0/CountryRegion/GetAll', config)
      .then((todo) => {
        setRegionList(todo.data.countryRegions);
      })
      .catch((err) => {
        console.log('AXIOS ERROR: ', err.response);
      });
  }, []);
  return (
    <MDBCard style={{ marginBottom: "1rem" }}>
      <MDBCardBody>
        <form>
          <MDBRow>
            <MDBCol>
              <MDBRow>
                <MDBCol>
                  <label>
                    Region<i style={{ color: 'red' }}>*</i>{' '}
                  </label>
                  <ReactBootstrap.Form.Control
                    option={regionList}
                    onChange={handleRegionChange}
                    as="select"
                  >
                    <option>select Region</option>
                    {regionList.map((region) => (
                      <option value={region.id}>{region.name}</option>
                    ))}
                  </ReactBootstrap.Form.Control>
                  <span style={{ color: "red" }}> {(notCompleted.reagionId == true && dataSaved == true) ? "Please select region" : null}</span>
                </MDBCol>
              </MDBRow>
              <hr></hr>
              <MDBRow>
                <MDBCol>
                  <label>
                    City<i style={{ color: 'red' }}>*</i>
                  </label>
                  <ReactBootstrap.Form.Control
                    option={cityList}
                    onChange={handeleCityChange}
                    as="select"
                  >
                    <option>select city</option>
                    {cityList
                      .map((city) => (
                        <option value={city.id}>{city.name}</option>
                      ))}
                  </ReactBootstrap.Form.Control>
                  <span style={{ color: "red" }}> {(notCompleted.cityId == true && dataSaved == true) ? "Please select city" : null}</span>
                </MDBCol>
              </MDBRow>
              <hr></hr>
              <MDBRow>
                <MDBCol>
                  <label>
                    Office<i style={{ color: 'red' }}>*</i>
                  </label>
                  <ReactBootstrap.Form.Control
                    placeholder="Select office"
                    onChange={handelOfficeChange}
                    as="select"
                  >
                    <option>select office</option>
                    {officeList.map((office) => (
                      <option value={office.id} name={office.name} key={office.address}>{office.name}</option>
                    ))}
                  </ReactBootstrap.Form.Control>
                  <span style={{ color: "red" }}> {(notCompleted.officeId == true && dataSaved == true) ? "Please select office" : null}</span>
                </MDBCol>
              </MDBRow>

              <hr></hr>
              <MDBRow>
                <MDBCol>
                  <label>
                    Delivery Site<i style={{ color: 'red' }}>*</i>
                  </label>
                  <ReactBootstrap.Form.Control
                    placeholder="Select delivery site"
                    onChange={handelOfficeChange}
                    as="select"
                  >
                    <option>select delivery site</option>
                    {officeList.map((office) => (
                      <option value={office.id} name={office.name} key={office.address}>{office.name}</option>
                    ))}
                  </ReactBootstrap.Form.Control>
                  <span style={{ color: "red" }}> {(notCompleted.officeId == true && dataSaved == true) ? "Please select office" : null}</span>
                </MDBCol>
              </MDBRow>
            </MDBCol>
            <MDBCol>
              <app-right-content
                class="small-12 medium-4 large-offset-1 large-4 column sticky-container"
                data-sticky-container=""
                _nghost-kxs-c3=""
              >
                <aside
                  class="sidebar small sticky is-anchored is-at-top"
                  data-btm-anchor="request-an-appointment:bottom"
                  data-margin-top="2"
                  data-sticky="s2eunn-sticky"
                  data-sticky-on="medium"
                  data-top-anchor="180"
                  id="raa-sidebar"
                  data-resize="raa-sidebar"
                  data-mutate="raa-sidebar"
                  data-events="mutate"
                >
                  <div class="multistep-form__details sidebar__box sidebar__box--border sidebar__box--teal ng-star-inserted">
                    <h4>
                      <span class="ng-star-inserted">Office detail</span>
                    </h4>
                    <ul class="list--no-indent list--no-bullets ng-star-inserted">
                      <li>
                        <strong>
                          Office name:&nbsp;&nbsp;<a href="#">{officeName}{' '}</a>
                        </strong>
                      </li>
                      <hr />
                      <li>
                        <strong>
                          Office Address:&nbsp;&nbsp;<a href="#">{officeAddress}{' '}</a>
                        </strong>
                      </li>
                      <hr />
                      <li>
                        <strong>
                          Contact :&nbsp;&nbsp;<i
                          aria-hidden="true"
                          class="fas fa-phone fa-rotate-180"
                        ></i>{' '}<a href="tel:officeContact">{officeContact}{' '}</a>
                        </strong>
                      </li>
                      <hr />
                      <li>
                        <strong>
                          Process duration :&nbsp;&nbsp;<a >{duration}{' '}</a>
                        </strong>
                      </li>
                    </ul>
                  </div>
                </aside>
              </app-right-content>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBCardBody>
    </MDBCard>

  );
});
export default SiteSelection
