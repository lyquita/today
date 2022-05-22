import axios from 'axios';
import { getStorage } from './services/localStorage';




axios.defaults.baseURL = "https://api-blog.hireoo.fun/";
getStorage('access_token').then(res => axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.value )

