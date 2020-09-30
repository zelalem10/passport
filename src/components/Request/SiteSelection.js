import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as ReactBootstrap from 'react-bootstrap';
import { MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody } from 'mdbreact';
import API from '../Utils/API';
import { useDispatch, useSelector } from 'react-redux';
import saveSiteInformation from '../../redux/actions/siteInformationAction';


const accesstoken = localStorage.systemToken;
const SiteSelection = forwardRef((props, ref) => {
  const [cityList, setCityList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [officeList, setOfficeList] = useState([]);
  const [deliverySiteList, setDeliverySiteList] = useState([])
  const [officeId, setOfficeId] = useState(0);
  const [officeName, setOfficeName] = useState('');
  const [officeAddress, setOfficeAddress] = useState('');
  const [officeContact, setOfficeContact] = useState('');
  const [selectedDeliverySiteId, setSelectedDeliverySiteId] = useState(0);
  const [deliveryOfficeName, setDeliveryOfficeName] = useState('');
  const [deliveryOfficeAddress, setdeliveryOfficeAddress] = useState('');
  const [deliveryOfficeContact, setdeliveryOfficeContact] = useState('');


  const [duration, setDuration] = useState('');
  const [officeInfo, setOfficeInfo] = useState({
    offceId: "",
    cityId: "",
    reagionId: "",
    deliverySiteId: "",
    durationDays: 0,
  });
  const [formCompleted, setFormCompleted] = useState(false);
  const [dataSaved, setDataSaved] = useState(false);
  const [notCompleted, setNotCompleted] = useState({
    officeId: true,
    cityId: true,
    reagionId: true,
    deliverySiteId: true,
  });

  const accesstoken = localStorage.systemToken;
  const dispatch = useDispatch();
  const deliverySiteURL = "https://epassportservices.azurewebsites.net/Master/api/V1.0/DeliverySite/GetAll?OfficeId="
  const officeURL = 'https://epassportservices.azurewebsites.net/Master/api/V1.0/Office/GetByCityId?id=';
  const config = {
    headers: {
      Authorization: `Bearer ` + accesstoken,
    },
  };

  const handleRegionChange = (event) => {
    const id=event.target.value;
    const selectedRegion = regionList.filter(item => item.id == event.target.value);
    setOfficeInfo((prevState) => ({
      ...prevState,
      reagionId: id,
  }));
    setNotCompleted((prevState) => ({
      ...prevState,
      reagionId: false,
    }));
    setCityList(selectedRegion.length > 0 ? selectedRegion[0].cities : []);
  };
  function handeleCityChange(event) {
    const id=event.target.value;
    setNotCompleted((prevState) => ({
      ...prevState,
      cityId: false,
    }));
      setOfficeInfo((prevState) => ({
        ...prevState,
        cityId: id,
    }));
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
    const id=event.target.value;
    const selectedOff = officeList.filter(office => office.id == event.target.value)
    if (selectedOff.length > 0) {
      setOfficeName(selectedOff[0].name);
      setOfficeAddress(selectedOff[0].address);
      setOfficeContact(selectedOff[0].fax);
      setDuration(selectedOff[0].noOfDaysForProcess)
      setOfficeInfo((prevState) => ({
        ...prevState,
        durationDays: selectedOff[0].noOfDaysForProcess,
      }));
    }
    else {
      setOfficeName("");
      setOfficeAddress("");
      setOfficeContact("");
    }
    setOfficeInfo((prevState) => ({
      ...prevState,
      offceId: id,
    }));
    setNotCompleted((prevState) => ({
      ...prevState,
      officeId: false,
    }));
 
    API.get(deliverySiteURL + officeId, config)
      .then((todo) => {
        setDeliverySiteList(todo.data.deliverySites);
      })
      .catch((err) => {
        console.log('AXIOS ERROR: ', err.response);
      });

     }

  function handelDeliveryChange(event) {
    const id=event.target.value;
    setSelectedDeliverySiteId(event.target.value)
    setOfficeInfo((prevState) => ({
      ...prevState,
      deliverySiteId: id,
    }));
    setNotCompleted((prevState) => ({
      ...prevState,
      deliverySiteId: false,
    }));
    const selectedDelivery = deliverySiteList.filter(site => site.id == event.target.value);
    if(selectedDelivery.length>0)
    {
      setDeliveryOfficeName(selectedDelivery[0].siteName);
      setdeliveryOfficeAddress(selectedDelivery[0].address);
      setdeliveryOfficeContact(selectedDelivery[0].phoneNumber);
    }
    else{
      setDeliveryOfficeName("");
      setdeliveryOfficeAddress("");
      setdeliveryOfficeContact("");
    }
    setFormCompleted(true)
  }

  useImperativeHandle(ref, () => ({
    saveData() {
      setDataSaved(true);
      dispatch(saveSiteInformation(officeInfo));
    },
    isCompleted() {
      return formCompleted;
    }
  }));

  useEffect(() => {
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
            <MDBCol md="4">
              <MDBRow>
                <MDBCol>
                  <label>
                    Site Location<i style={{ color: 'red' }}>*</i>{' '}
                  </label>
                  <ReactBootstrap.Form.Control
                    option={regionList}
                    onChange={(e)=> handleRegionChange(e)}
                    as="select"
                  >
                    <option>Select site location</option>
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
                    <option>Select city</option>
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
                    <option>Select office</option>
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
                    onChange={handelDeliveryChange}
                    as="select"
                  >
                    <option>Select delivery site</option>
                    {deliverySiteList.map((site) => (
                      <option value={site.id} name={site.name}>{site.siteName}</option>
                    ))}
                  </ReactBootstrap.Form.Control>
                  <span style={{ color: "red" }}> {(notCompleted.deliverySiteId == true && dataSaved == true) ? "Please select delivery site" : null}</span>
                </MDBCol>
              </MDBRow>
            </MDBCol>
            <MDBCol md="8">
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
                    {/* <h4>
                      <span class="ng-star-inserted">Office detail</span>
                    </h4> */}
                    <MDBRow>
                      <MDBCol md="6">
                      <fieldset>
                      <legend>Application site</legend>
                      <ul class="list--no-indent list--no-bullets ng-star-inserted">
                        <li>
                          <strong>
                            Office name:&nbsp;&nbsp;<a href="#">{officeName}{' '}</a>
                          </strong>
                        </li>
                        <hr />
                        <li>
                          <strong>
                            Address:&nbsp;&nbsp;<a href="#">{officeAddress}{' '}</a>
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
                        {/* <hr />
                        <li>
                          <strong>
                            Process duration :&nbsp;&nbsp;<a >{duration}{' '}</a>
                          </strong>
                        </li> */}
                      </ul>
                    </fieldset>
                      </MDBCol>
                      <MDBCol  md="6">
                      <fieldset>
                      <legend>Delivery site</legend>
                      <ul class="list--no-indent list--no-bullets ng-star-inserted">
                        <li>
                          <strong>
                            Office name:&nbsp;&nbsp;<a href="#">{deliveryOfficeName}{' '}</a>
                          </strong>
                        </li>
                        <hr />
                        <li>
                          <strong>
                            Address:&nbsp;&nbsp;<a href="#">{deliveryOfficeAddress}{' '}</a>
                          </strong>
                        </li>
                        <hr />
                        <li>
                          <strong>
                            Contact :&nbsp;&nbsp;<i
                              aria-hidden="true"
                              class="fas fa-phone fa-rotate-180"
                            ></i>{' '}<a href="tel:deliveryOfficeContact">{deliveryOfficeContact}{' '}</a>
                          </strong>
                        </li>
                      </ul>
                    </fieldset>
                      </MDBCol>
                    </MDBRow>
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
