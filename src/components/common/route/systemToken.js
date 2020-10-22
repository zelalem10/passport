import React, { useEffect } from 'react';
import axios from 'axios';
import API from '../../Utils/API';

function SystemToken() {
  
  
  const baseUrl = 'https://epassportservices.azurewebsites.net/';
  

  useEffect(() => {
    axios({
      method: 'post',
      url:
        'https://epassportservices.azurewebsites.net/User/api/V1.0/Account/SignIn',
      data: {
        username: 'Anonymous@ethiopianairlines.com',
        password: 'PassCode#AnoPass%43',
      },
    })
      .then(async (response) => {
       await localStorage.setItem('systemToken', response.data.accessToken);
       const accesstoken = localStorage.systemToken;
       const config = {
        headers: { Authorization: 'Bearer ' + accesstoken },
      };
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
          localStorage.setItem(
            'PassportPageQuantity',
            JSON.stringify(todo.data.pagePassports)
          );
        })
        .catch((error) => {
          console.log('error' + error);
        });
  
        axios({
          headers: { Authorization: 'Bearer ' + accesstoken },
          method: 'get',
          url:
            'https://epassportservices.azurewebsites.net/Master/api/V1.0/CountryRegion/GetAllMasterData',
        })
          .then((response) => {
            console.log(response.data)
            localStorage.setItem('MasterData',JSON.stringify(response.data));
    
            //console.log(response)
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error.response);
      });
   
  
  
  }, []);

  return <div></div>;
}
export default SystemToken;
