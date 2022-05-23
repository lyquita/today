import { Storage } from '@capacitor/storage';
import axios from 'axios';




axios.defaults.baseURL = "https://api-blog.hireoo.fun/";


// check auth before send request
axios.interceptors.request.use( async function(config){
    const token = await (await Storage.get({key:'access_token'})).value
    config.headers.Authorization = token ?  `Bearer ${token}` : '';

    return config;
})



