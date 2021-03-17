import axios from 'axios';
import Cookies from 'universal-cookie';


const baseURL="https://epassportservicesaddt.azurewebsites.net/";

const cookies = new Cookies();

const getNewToken=()=>{
    
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
    
    cookies.remove('SY_TO');
    axios.get(`${baseURL}/User/api/V1.0/Account/RefreshToken?refreshToken=${cookies.get('RF_TO')}`)
    .then((response)=>{
        
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
        const SystemToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiQW5vbnltb3VzQGV0aGlvcGlhbmFpcmxpbmVzLmNvbSIsIm5iZiI6MTYxMzk3MTg0MiwiZXhwIjoxNjI0MzM5ODQyLCJpYXQiOjE2MTM5NzE4NDJ9.0cvpJ5pPxFvzGBVhkjapHd0kskTwh9bUa4NWXGicV3Y';
    //   const SystemToken = cookies.get('SY_TO');
      return SystemToken;
    }
  };
  const token = tokenValue();
  const  getAuthentication=()=>{
      
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
        

    
        Authorization:UserToken?`Bearer ${token}`:`Bearer ${token}`,
        "Access-Control-Allow-Credentials": true
    }
});
axiosInstance.interceptors.response.use(
    
    (response)=>
    new Promise((resolve,reject)=>{
        
        resolve(response);
    }),
    (error)=>{
        
        if(!error.response){
            return new Promise((resolve,reject)=>{
                reject(error);
            })
        }
        if(error.response.status===401){
            // refreshToken();
        }else{
            return new Promise((resolve,reject)=>{
                reject(error);
            }) 
        }
    }
)





export default axiosInstance;