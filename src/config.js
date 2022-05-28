import { Storage } from '@capacitor/storage';
import axios from 'axios';
import { getStorage } from './services/localStorage';




axios.defaults.baseURL = "https://api-blog.hireoo.fun/";


// check auth before send request
axios.interceptors.request.use( async function(config){
    const token = await getStorage('access_token');
    config.headers.Authorization = token ?  `Bearer ${token}` : '';

    return config;
})



