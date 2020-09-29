import React, { useEffect } from 'react';
import axios from 'axios';

function SystemToken() {
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
  }, []);

  const accesstoken = localStorage.systemToken;

  useEffect(() => {
    axios({
      headers: { 'Authorization': 'Bearer ' + accesstoken },
      method: 'get',
      url:
        'https://epassportservices.azurewebsites.net/Master/api/V1.0/CountryRegion/GetAll',
    })
      .then((response) => {
        localStorage.setItem('countryRegions', JSON.stringify(response.data.countryRegions));

      //console.log(response)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  

  return <div></div>;
}
export default SystemToken;
