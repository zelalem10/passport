import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as ReactBootstrap from 'react-bootstrap';
import { MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody } from 'mdbreact';
import API from '../Utils/API';
import { useDispatch, useSelector } from 'react-redux';
import saveSiteInformation from '../../redux/actions/siteInformationAction';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

function requestTypeGetter(requetTypeId) {
  switch (requetTypeId) {
    case 2:
      return 'New';
    case 3:
      return 'Renew/Replacement';
    case 4:
      return 'Lost';
    case 8:
      return 'Correction';
    default:
      return 'Unkown';
  }
}
const SiteSelection = forwardRef((props, ref) => {
  const { t, i18n } = useTranslation();
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
    offceId: 0,
    cityId: 0,
    reagionId: 0,
    deliverySiteId: 0,
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
  const counter = useSelector((state) => state);
  const serviceSelcetion = counter.service[counter.service.length - 1];
  const requestType = serviceSelcetion.appointemntType;
  const requestTypeStr = requestTypeGetter(requestType);


  const deliverySiteURL = "https://epassportservices.azurewebsites.net/Master/api/V1.0/DeliverySite/GetAll?OfficeId="
  const officeURL = 'https://epassportservices.azurewebsites.net/Master/api/V1.0/Office/GetByCityId?id=';
  const config = {
    headers: {
      Authorization: `Bearer ` + accesstoken,
    },
  };

  const handleRegionChange = (event) => {
    setCityList([]);
    const id=event.target.value;
    // const selectedRegion = regionList.filter(item => item.id == event.target.value);
    setOfficeInfo((prevState) => ({
      ...prevState,
      reagionId: id,
  }));
    setNotCompleted((prevState) => ({
      ...prevState,
      reagionId: false,
    }));
    API.get('https://epassportservices.azurewebsites.net/Master/api/V1.0/CountryRegion/GetCityListByRegion?regionId='+id, config)
        .then((todo) => {
          setCityList(todo.data.cities);
        })
        .catch((err) => {
          console.log('AXIOS ERROR: ', err.response);
        });
        setFormCompleted(false)
  };
  function handeleCityChange(event) {
    setOfficeList([])
     ;
    const id=event.target.value;
    const notNumeric= isNaN(id);
    let selectedCity=[];
    if(notNumeric===false){
     selectedCity = cityList.filter(city => city.id == Number.parseInt(id, 10))[0].offices;
    }
    setNotCompleted((prevState) => ({
      ...prevState,
      cityId: false,
    }));
    setOfficeInfo((prevState) => ({
        ...prevState,
        cityId: id,
    }));
    setOfficeList(selectedCity)
    setFormCompleted(false)
  }

  function handelOfficeChange(event) {
    setDeliverySiteList([]);
    setOfficeId(event.target.value)
    const id = event.target.value;
    setOfficeInfo((prevState) => ({
      ...prevState,
      offceId: id,
    }));
    const selectedOff = officeList.filter(office => office.id == event.target.value)

    if (selectedOff.length > 0) {
      setOfficeName(selectedOff[0].name);
      setOfficeAddress(selectedOff[0].address);
      setOfficeContact(selectedOff[0].fax);
      if(requestTypeStr !=="New"){
        setDeliveryOfficeName(selectedOff[0].name);
      setdeliveryOfficeAddress(selectedOff[0].address);
      setdeliveryOfficeContact(selectedOff[0].fax);
      }
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
    setNotCompleted((prevState) => ({
      ...prevState,
      officeId: false,
    }));

    if (selectedOff.length > 0)
      setDeliverySiteList(selectedOff[0].deliverySites)

    if (requestTypeStr !== "New")
      setFormCompleted(true)
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
    <MDBCard style={{ marginBottom: "1rem" }}>
      <MDBCardBody>
        <form>
          <div class='row noShadow'>
            <div class="col-md-4">
              <MDBRow>
                <MDBCol className='mb-3'>
                  <label>
                  <Trans>requestForm.siteSelection</Trans><i style={{ color: 'red' }}>*</i>{' '}
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
                </MDBCol >
              </MDBRow>
              <MDBRow>
                <MDBCol className='mb-3'>
                  <label>
                  <Trans>requestForm.city</Trans><i style={{ color: 'red' }}>*</i>
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
      
              <MDBRow>
                <MDBCol className='mb-3'>
                  <label>
                  <Trans>requestForm.office</Trans><i style={{ color: 'red' }}>*</i>
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
              {requestTypeStr==="New"?( <MDBRow>
                <MDBCol className='mb-3'>
                  <label>
                  <Trans>requestForm.deliverySite</Trans><i style={{ color: 'red' }}>*</i>
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
              </MDBRow >
           ):(null)}
              </div>
            <div class="col-md-8">
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
                      <legend> <Trans>requestForm.applicationSite</Trans></legend>
                      <ul class="list--no-indent list--no-bullets ng-star-inserted">
                        <li>
                          <strong>
                          <Trans>requestForm.office</Trans>&nbsp;&nbsp;<Link to="#">{officeName}{' '}</Link>
                          </strong>
                        </li>
                        <hr />
                        <li>
                          <strong>
                          <Trans>requestForm.address</Trans>&nbsp;&nbsp;<Link to="#">{officeAddress}{' '}</Link>
                          </strong>
                        </li>
                        <hr />
                        <li>
                          <strong>
                          <Trans>requestForm.contact</Trans>&nbsp;&nbsp;<i
                              aria-hidden="true"
                              class="fas fa-phone fa-rotate-180"
                                                              ></i>{' '}<Link to="tel:officeContact">{officeContact}{' '}</Link>
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
                      <legend><Trans>requestForm.deliverySite</Trans></legend>
                      <ul class="list--no-indent list--no-bullets ng-star-inserted">
                        <li>
                          <strong>
                          <Trans>requestForm.office</Trans>&nbsp;&nbsp;<Link to="#">{deliveryOfficeName}{' '}</Link>
                          </strong>
                        </li>
                        <hr />
                        <li>
                          <strong>
                          <Trans>requestForm.address</Trans>&nbsp;&nbsp;<Link to="#">{deliveryOfficeAddress}{' '}</Link>
                          </strong>
                        </li>
                        <hr />
                        <li>
                          <strong>
                             <Trans>requestForm.contact</Trans>&nbsp;&nbsp;<i
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
            </div>
          </div>
        </form>
      </MDBCardBody>
    </MDBCard>

  );
});
export default SiteSelection
