import axios from 'axios';
import { Storage } from '@capacitor/storage';

export interface ILogin {
  username: string;
  password: string;
}

export async function postLogin(formdata: ILogin): Promise<any> {
    const res = await axios.post('users/token/', formdata);
    return res
}


export async function getUsername(id:number):Promise<any> {
  axios.interceptors.request.use(function (config: any) {
    if (config.headers.common["Authorization"].slice(7, 11) === "null") {
      config.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("access_token");
    }
    return config
  })
  const res = await axios.get(`/users/${id}`)

  return res
}


