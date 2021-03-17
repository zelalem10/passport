import axios from 'axios';
import Cookies from 'universal-cookie';

debugger;
const baseURL="https://epassportservicesaddt.azurewebsites.net/";

const cookies = new Cookies();

const getNewToken=()=>{
    debugger;
    axios({
        method: 'post',
        url:
            'https://epassportservicesaddt.azurewebsites.net/User/api/V1.0/Account/SignIn',
        data: {
            username: 'Anonymous@ethiopianairlines.com',
            password: 'PassCode#AnoPass%43',
        },
     })
        .then(async (response) => {
            await cookies.set('SY_TO', response.data.accessToken);
            cookies.set('RF_TO', response.data.refreshToken);
        })
        .catch((error)=>{
            console.log(error);
        })
}

const refreshToken=()=>{
    debugger;
    cookies.remove('SY_TO');
    axios.get(`${baseURL}/User/api/V1.0/Account/RefreshToken?refreshToken=${cookies.get('RF_TO')}`)
    .then((response)=>{
        debugger;
    //cookies.response('SY_TO');
    cookies.set('SY_TO', response.data.accessToken);
    })
.catch((error)=>{
    console.log(error.response.message)
    //getNewToken();
})
}
const tokenValue = () => {
    debugger;
    const UserToken = cookies.get('AC_TO');

    if (UserToken) {
      return UserToken;
    } else {
        const SystemToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiQW5vbnltb3VzQGV0aGlvcGlhbmFpcmxpbmVzLmNvbSIsIm5iZiI6MTYwMzUzMTkyNiwiZXhwIjoxNjEzODk5OTI2LCJpYXQiOjE2MDM1MzE5MjZ9.9sfNh1--xqspHt0jgdOLvTuQBpheVbStaiOsNaA755A';
      //const SystemToken = cookies.get('SY_TO');
      return SystemToken;
    }
  };
  const  getAuthentication=()=>{
      debugger;
    let headers = {};
    const token = tokenValue();
    if(token && typeof(token)!=='undefined'){
      headers.Authorization=`Bearer ${token}`;
    }
    return {
      headers
    };
  }

  const UserToken = cookies.get('AC_TO');

const axiosInstance=axios.create({
    baseURL:baseURL,
    //headers:getAuthentication(),

    headers:{
        

    
        Authorization:UserToken?`Bearer ${UserToken}`:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiQW5vbnltb3VzQGV0aGlvcGlhbmFpcmxpbmVzLmNvbSIsIm5iZiI6MTYwMzUzMTkyNiwiZXhwIjoxNjEzODk5OTI2LCJpYXQiOjE2MDM1MzE5MjZ9.9sfNh1--xqspHt0jgdOLvTuQBpheVbStaiOsNaA755A`,
        "Access-Control-Allow-Credentials": true
    }
});
axiosInstance.interceptors.response.use(
    
    (response)=>
    new Promise((resolve,reject)=>{
        debugger;
        resolve(response);
    }),
    (error)=>{
        debugger;
        if(!error.response){
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