import React, { useEffect } from 'react';
import axios from 'axios';

function SystemToken() {

  useEffect(() => {

    axios({
      
        method: 'post',
        url: 'https://epassportservices.azurewebsites.net/User/api/V1.0/Account/SignIn',
        data: {
          "username": "Admin",
          "password": "Abcd@1234"
        },
  
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem('systemToken', response.data.accessToken);
      })
      .catch((error) => {
        console.log(error);
      })
  },[]);

  return (
    <div>

    </div>
  );
}
export default SystemToken