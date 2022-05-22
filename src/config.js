import axios from 'axios';


axios.defaults.baseURL = "https://api-blog.hireoo.fun/";
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
