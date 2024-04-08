import axios from 'axios'
import router from '../../router'



const instance = axios.create({
  baseURL: '',
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('compassJwt')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }, 
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (res) => {
    let json = res.data;
    if (json.error != null) {
      throw new Error(json.error);
    }
    return res
  },
  (error) => {
    if(error.config.url === "/api/refresh-access-token"){
      return;
    }
    if (error.response) {
      router.push({name: 'errorPage' })
      
    }
    return Promise.reject(error);
  }
)
export default instance;
