import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as ReactBootstrap from 'react-bootstrap';
import { MDBRow, MDBCol, MDBInput,  MDBCard, MDBCardBody } from 'mdbreact';
import API from '../Utils/API';
import token from '../common/accessToken'

const accesstoken = localStorage.systemToken;
const SiteSelection=forwardRef((props, ref) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 700,
      },
    },
  }));
  const [cityList, setCityList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [officeList, setOfficeList] = useState([]);
  const [officeName, setOfficeName] = useState('');
  const [officeAddress, setOfficeAddress] = useState('');
  const [officeContact, setOfficeContact] = useState('');
  const [formCompleted, setFormCompleted] = useState(false);

  const classes = useStyles();
  const accesstoken = localStorage.systemToken;

  const officeURL =
    'https://epassportservices.azurewebsites.net/Master/api/V1.0/Office/GetByCityId?id=';
  const config = {
    headers: {
      Authorization: `Bearer `+ accesstoken,
    },
  };

  const handleRegionChange = (event) => {
    const selectedRegion = regionList.filter(item => item.id == event.target.value);
    setCityList(selectedRegion[0].cities);
  };
  function handeleCityChange(event) {
    API.get(officeURL + event.target.value, config)
      .then((todo) => {
        setOfficeList(todo.data.offices);
      })
      .catch((err) => {
        console.log('AXIOS ERROR: ', err);
      });
  }

  function handelOfficeChange(event) {
    const selectedOff = officeList.filter(office => office.id == event.target.value)
    setOfficeName(selectedOff[0].name);
    setOfficeAddress(selectedOff[0].address);
    setOfficeContact(selectedOff[0].fax);
    setFormCompleted(true)
  }

  useImperativeHandle(ref, () => ({
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
