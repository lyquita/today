import { Storage } from '@capacitor/storage';
import axios from 'axios';
import { getStorage, setStorage } from './services/localStorage';
import jwt_decode from "jwt-decode";
import moment from 'moment'
import { refresh } from 'ionicons/icons';




axios.defaults.baseURL = "https://api-blog.hireoo.fun/";


// check auth before send request
axios.interceptors.request.use( async function(config){
    const token = await getStorage('access_token');

    config.headers.Authorization = token ?  `Bearer ${token}` : '';
    return config;
})

axios.interceptors.response.use(response => {
    console.log('respnse', response)
    return response

 }, async err => {
    const originalRequest = err.config;
    const refreshToken = await getStorage('refresh_token');

    console.log(err);

    if( err.response.status === 401 && err.response.statusText === 'Unauthorized'){
        return axios.post('users/token/refresh/', {refresh: refreshToken}).then(
            res => {
                 setStorage('refresh_token', res.data.refresh)
                 setStorage('access_token', res.data.access)
                axios.defaults.headers.Authorization = `Bearer ${res.data.access}`
                originalRequest.headers.Authorization =  `Bearer ${res.data.access}`

                return 
            }
        )
        .catch(err => console.log('refresh token failed', err))
    }

    return  Promise.reject(err)
})





