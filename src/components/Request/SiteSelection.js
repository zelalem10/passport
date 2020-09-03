import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as ReactBootstrap from 'react-bootstrap';
import API from '../Utils/API';


const SiteSelection=forwardRef((props, ref) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 700,
      },
    },
  }));
  const [countryList, setCountryList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [officeList, setOfficeList] = useState([]);
  const [selectedRegionId, setSelectedRegionId] = useState(0);
  const [selectedCountryId, setSelectedCountryId] = useState(0);
  const [officeName, setOfficeName] = useState('');
  const [officeAddress, setOfficeAddress] = useState('');
  const [officeContact, setOfficeContact] = useState('');
  const [formCompleted, setFormCompleted] = useState(false);

  const classes = useStyles();
  const officeURL =
    'https://epassportservices.azurewebsites.net/Master/api/V1.0/Office/GetByCountryId?id=';
  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiQWRtaW4iLCJuYmYiOjE1OTkxMTQwMDMsImV4cCI6MTU5OTEyODQwMywiaWF0IjoxNTk5MTE0MDAzfQ.-fjjDr4Z71dqz3ss_NyVu05lnwl5nT025VwmckOVpHE`,
    },
  };

  const handleRegionChange = (event) => {
    setSelectedRegionId(event.target.value);
    API.get('https://epassportservices.azurewebsites.net/Master/api/V1.0/Country/GetAll', config)
      .then((todo) => {
        setCountryList(todo.data.countrys);
        setSelectedCountryId(0);
      })
      .catch((err) => {
        console.log('AXIOS ERROR: ', err);
      });
  };
  function handeleCountryChange(event) {
    setSelectedCountryId(event.target.value);
    API.get(officeURL+event.target.value, config)
      .then((todo) => {
        setOfficeList(todo.data.offices);
      })
      .catch((err) => {
        console.log('AXIOS ERROR: ', err);
      });
  }

  function handelOfficeChange(event) {
    const selectedOff=officeList.filter(office => office.id==event.target.value)
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
    API.get('https://epassportservices.azurewebsites.net/Master/api/V1.0/Region/GetAll', config)
      .then((todo) => setRegionList(todo.data.regionSer))
      .catch((err) => {
        console.log('AXIOS ERROR: ', err);
      });
  }, []);
  return (
    <ReactBootstrap.Card>
      <ReactBootstrap.Card.Header>Site Selection</ReactBootstrap.Card.Header>
      <ReactBootstrap.Card.Body>
        <blockquote className="blockquote mb-0">
          <ReactBootstrap.Form.Group>
            <ReactBootstrap.Row>
              <ReactBootstrap.Col>
                <ReactBootstrap.Form.Label>
                  Region<i style={{ color: 'red' }}>*</i>{' '}
                </ReactBootstrap.Form.Label>
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
              </ReactBootstrap.Col>

              <ReactBootstrap.Col>
                <ReactBootstrap.Form.Label>
                  Office name{' '}
                </ReactBootstrap.Form.Label>
                <div
                  style={{ borderStyle: 'outset', height: '50px' }}
                  as="textarea"
                  disabled
                  aria-label="With textarea"
                >
                  <h5 style={{ color: 'purple' }}>{officeName}</h5>
                </div>
              </ReactBootstrap.Col>
            </ReactBootstrap.Row>
            <hr></hr>
            <ReactBootstrap.Row>
              <ReactBootstrap.Col>
                <ReactBootstrap.Form.Label>
                  Country<i style={{ color: 'red' }}>*</i>
                </ReactBootstrap.Form.Label>
                <ReactBootstrap.Form.Control
                  option={countryList}
                  onChange={handeleCountryChange}
                  as="select"
                >
                  <option>select country</option>
                  {countryList
                    .filter((country) => country.regionId == selectedRegionId)
                    .map((country) => (
                      <option value={country.id}>{country.name}</option>
                    ))}
                </ReactBootstrap.Form.Control>
              </ReactBootstrap.Col>
              <ReactBootstrap.Col>
                <ReactBootstrap.Form.Label>
                  Office Address{' '}
                </ReactBootstrap.Form.Label>
                <div
                  style={{ borderStyle: 'outset', height: '100px' }}
                  as="textarea"
                  disabled
                  aria-label="With textarea"
                >
                  <h5 style={{ color: 'purple' }}>{officeAddress}</h5>
                </div>
              </ReactBootstrap.Col>
            </ReactBootstrap.Row>
            <hr></hr>
            <ReactBootstrap.Row>
              <ReactBootstrap.Col>
                <ReactBootstrap.Form.Label>
                  Office<i style={{ color: 'red' }}>*</i>
                </ReactBootstrap.Form.Label>
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
              </ReactBootstrap.Col>
              <ReactBootstrap.Col>
                <ReactBootstrap.Form.Label>
                  Contact Number{' '}
                </ReactBootstrap.Form.Label>
                <div
                  style={{ borderStyle: 'outset', height: '50px' }}
                  as="textarea"
                  disabled
                  aria-label="With textarea"
                >
                  <h5 style={{ color: 'purple' }}>{officeContact}</h5>
                </div>
              </ReactBootstrap.Col>
            </ReactBootstrap.Row>
          </ReactBootstrap.Form.Group>
        </blockquote>
      </ReactBootstrap.Card.Body>
    </ReactBootstrap.Card>
  );
});
export default SiteSelection
