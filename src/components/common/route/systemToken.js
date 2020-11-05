import React, { useEffect } from 'react';
import axios from 'axios';
import API from '../../Utils/API';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../../Utils/axios';
import Cookies from 'universal-cookie';

function SystemToken() {
    const cookies = new Cookies();
    const baseUrl = 'https://epassportservicesaddt.azurewebsites.net/';
    let history = useHistory();

    // function logout() {

    //     localStorage.removeItem('userToken');
    //     localStorage.removeItem('personalDetail');
    //     localStorage.removeItem('userId');
    //     history.push('/signIn');
    // }

    useEffect(async () => {

        // debugger;
        // var personalDetail = localStorage.getItem('logedInUsedData');
        // debugger;

        // if (personalDetail) {
        //     let personalDetailJson = JSON.parse(personalDetail);

        //     if (!personalDetailJson.hasOwnProperty('isOldUser')) {
        //         logout();
        //     }
        // }

        const accesstoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiQW5vbnltb3VzQGV0aGlvcGlhbmFpcmxpbmVzLmNvbSIsIm5iZiI6MTYwMzUzMTkyNiwiZXhwIjoxNjEzODk5OTI2LCJpYXQiOjE2MDM1MzE5MjZ9.9sfNh1--xqspHt0jgdOLvTuQBpheVbStaiOsNaA755A';
         cookies.set('SY_TO', accesstoken);
        const config = {
            headers: { Authorization: 'Bearer ' + accesstoken },
        };
        //axios({
        //    method: 'post',
        //    url:
        //        'https://epassportservicesaddt.azurewebsites.net/User/api/V1.0/Account/SignIn',
        //    data: {
        //        username: 'Anonymous@ethiopianairlines.com',
        //        password: 'PassCode#AnoPass%43',
        //    },
        //})
        //    .then(async (response) => {
        //        await localStorage.setItem('systemToken', response.data.accessToken);
        //        const accesstoken = localStorage.systemToken;
        //        const config = {
        //            headers: { Authorization: 'Bearer ' + accesstoken },
        //        };
axiosInstance.get('/Master/api/V1.0/CountryRegion/GetAll')
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
        axiosInstance.get('/Master/api/V1.0/Nationality/GetAll')
            .then((todo) => {
                localStorage.setItem(
                    'nationalitys',
                    JSON.stringify(todo.data.nationalitys)
                );
            })
            .catch((err) => {
                console.log('AXIOS ERROR: ', err.response);
            });
        axiosInstance.get('/Master/api/V1.0/Occupation/GetAll')
            .then((todo) => {
                localStorage.setItem(
                    'occupations',
                    JSON.stringify(todo.data.occupations)
                );
            })
            .catch((err) => {
                console.log('AXIOS ERROR: ', err.response);
            });
        axiosInstance.get('/Person/api/V1.0/Person/GetAllFamilyType')
            .then(async (response) => {
                localStorage.setItem(
                    'familyTypesResponse',
                    JSON.stringify(response.data.familyTypesResponse)
                );
            })
            .catch((error) => {
                console.log('error' + error);
            });
        axiosInstance.get('/Master/api/V1.0/CountryRegion/GetAll')
            .then((todo) => {
                localStorage.setItem(
                    'countryRegions',
                    JSON.stringify(todo.data.countryRegions)
                );
            })
            .catch((error) => {
                console.log('error' + error);
            });
axiosInstance.get('/Master/api/V1.0/PassportPage/GetAll')
            .then((todo) => {
                localStorage.setItem(
                    'PassportPageQuantity',
                    JSON.stringify(todo.data.pagePassports)
                );
            })
            .catch((error) => {
                console.log('error' + error);
            });
axiosInstance.get('/Master/api/V1.0/CountryRegion/GetAllMasterData')
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('MasterData', JSON.stringify(response.data));

                //localStorage.setItem(
                //    'PassportPageQuantity',
                //    JSON.stringify(response.data.PassportPageQuantity)
                //);

                //localStorage.setItem(
                //    'countryRegions',
                //    JSON.stringify(response.data.countryRegions)
                //);

                //console.log(response)
            })
            .catch((error) => {
                console.log(error);
            });
        //})
        //.catch((error) => {
        //    console.log(error.response);
        //});



    }, []);

    return <div></div>;
}
export default SystemToken;
