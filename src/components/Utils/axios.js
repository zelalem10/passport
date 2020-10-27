import axios from 'axios';

function axiosApiInstance(method,path,data){
debugger;
const tokenValue = () => {
    const UserToken = localStorage.userToken;

    if (UserToken) {
        return UserToken;
    } else {
        const SystemToken = localStorage.systemToken;
        return SystemToken;
    }
};
const accesstoken = tokenValue();
    let headers={};
    headers.Authorization=`Bearer ${accesstoken}`;
    const baseURL="https://epassportservicesaddt.azurewebsites.net/";

    axios({
        method: `${method}`,
        url: `${baseURL}${path}`,
        data:data,
        headers:headers,
      }).then((response)=>{
return response;
      })
.catch((error)=>{
    if (error.response.status === 403) {

    }
return error;
})

}

export default axiosApiInstance;