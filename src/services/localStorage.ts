import { Storage } from "@capacitor/storage";



export async function getStorage(key:string): Promise<any> {
    // const value = await Storage.get({key: key});
    // return value

    const value =  localStorage.getItem(key);
    return Promise.resolve(value);
}

export async function clearStorage():Promise<any> {
    localStorage.clear();
    return Promise.resolve(null);
} 

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
    await setStorage('hasLoggedIn',JSON.stringify(isLoggedIn) );
  }

export async function setStorage(key: string, value: string){
    localStorage.setItem(key, value);
    return Promise.resolve(null);
}