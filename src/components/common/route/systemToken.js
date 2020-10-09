import React, { useEffect } from 'react';
import axios from 'axios';
import API from '../../Utils/API';

function SystemToken() {
  const accesstoken = localStorage.systemToken;
  const usertoken = localStorage.userToken;
  const baseUrl = 'https://epassportservices.azurewebsites.net';
  const config = {
    headers: { Authorization: 'Bearer ' + accesstoken },
  };

  useEffect(() => {
    axios({
      method: 'post',
      url:
        'https://epassportservices.azurewebsites.net/User/api/V1.0/Account/SignIn',
      data: {
        username: 'Admin@gmail.com',
        password: 'Abcd@1234',
      },
    })
      .then((response) => {
        localStorage.setItem('systemToken', response.data.accessToken);
      })
      .catch((error) => {
        console.log(error.response);
      });
    axios({
      headers: { Authorization: 'Bearer ' + accesstoken },
      method: 'get',
      url:
        'https://epassportservices.azurewebsites.net/Master/api/V1.0/CountryRegion/GetAll',
    })
      .then((response) => {
        localStorage.setItem(
          'countryRegions',
          JSON.stringify(response.data.countryRegions)
        );

        //console.log(response)
      })
      .catch((error) => {
        console.log(error);
      });
    API.get(
      'https://epassportservices.azurewebsites.net/Master/api/V1.0/Nationality/GetAll',
      config
    )
      .then((todo) => {
        localStorage.setItem(
          'nationalitys',
          JSON.stringify(todo.data.nationalitys)
        );
      })
      .catch((err) => {
        console.log('AXIOS ERROR: ', err.response);
      });
    API.get(
      'https://epassportservices.azurewebsites.net/Master/api/V1.0/Occupation/GetAll',
      config
    )
      .then((todo) => {
        localStorage.setItem(
          'occupations',
          JSON.stringify(todo.data.occupations)
        );
      })
      .catch((err) => {
        console.log('AXIOS ERROR: ', err.response);
      });
    axios({
      headers: {
        Authorization: 'Bearer ' + accesstoken,
      },
      method: 'get',
      url: baseUrl + '/Person/api/V1.0/Person/GetAllFamilyType',
    })
      .then(async (response) => {
        localStorage.setItem(
          'familyTypesResponse',
          JSON.stringify(response.data.familyTypesResponse)
        );
      })
      .catch((error) => {
        console.log('error' + error);
      });
    API.get(
      'https://epassportservices.azurewebsites.net/Master/api/V1.0/CountryRegion/GetAll',
      config
    )
      .then((todo) => {
        localStorage.setItem(
          'countryRegions',
          JSON.stringify(todo.data.countryRegions)
        );
      })
      .catch((error) => {
        console.log('error' + error);
      });

    API.get(
      'https://epassportservices.azurewebsites.net/Master/api/V1.0/PassportPage/GetAll',
      config
    )
      .then((todo) => {
        debugger;
        localStorage.setItem(
          'PassportPageQuantity',
          JSON.stringify(todo.data.pagePassports)
        );
      })
      .catch((error) => {
        debugger;
        console.log('error' + error);
      });
  }, []);

  return <div></div>;
}
export default SystemToken;
