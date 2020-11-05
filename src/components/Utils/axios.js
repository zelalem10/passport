import axios from 'axios';
import Cookies from 'universal-cookie';


const baseURL="https://epassportservicesaddt.azurewebsites.net/";

const cookies = new Cookies();

const refreshToken=()=>{
axios.get(`${baseURL}/User/api/V1.0/Account/RefreshToken?refreshToken=${cookies.get('RF_TO')}`)
.then((response)=>{
    localStorage.setItem('systemToken', response.data.accessToken);
})
.catch((error)=>{
    console.log(error);
})
}
const tokenValue = () => {
    const UserToken = cookies.get('AC_TO');

    if (UserToken) {
      return UserToken;
    } else {
        const SystemToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiQW5vbnltb3VzQGV0aGlvcGlhbmFpcmxpbmVzLmNvbSIsIm5iZiI6MTYwMzUzMTkyNiwiZXhwIjoxNjEzODk5OTI2LCJpYXQiOjE2MDM1MzE5MjZ9.9sfNh1--xqspHt0jgdOLvTuQBpheVbStaiOsNaA755A';
      //const SystemToken = cookies.get('SY_TO');
      return SystemToken;
    }
  };
  let headers = {};
  const token = tokenValue();
  if(token && typeof(token)!=='undefined'){
    headers.Authorization=`Bearer ${token}`;
  }


  
  
const axiosInstance=axios.create({
    baseURL:baseURL,
    headers,
});
axiosInstance.interceptors.response.use(
    
    (response)=>
    new Promise((resolve,reject)=>{
        resolve(response);
    }),
    (error)=>{
        if(!error.response){
            debugger;
            return new Promise((resolve,reject)=>{
                reject(error);
            })
        }
        if(error.response.status===401){
            refreshToken();
        }else{
            return new Promise((resolve,reject)=>{
                reject(error);
            }) 
        }
    }
)





export default axiosInstance;