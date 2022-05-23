import axios from 'axios';
import { Storage } from '@capacitor/storage';
import { getStorage } from './localStorage';

export interface ILogin {
  username: string;
  password: string;
}

export async function postLogin(formdata: ILogin): Promise<any> {
    const res = await axios.post('users/token/', formdata);
    return res
}


export async function getUsername(id:number):Promise<any> {
  const res = await axios.get(`/users/${id}`)

  return res
}


