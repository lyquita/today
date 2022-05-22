import { Storage } from "@capacitor/storage";



export async function getStorage(key:string): Promise<any> {
    const value = await Storage.get({key: key});
    return value
}

export async function clearStorage():Promise<any> {
    const value = await Storage.clear()
    return value
} 

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
    await Storage.set({ key: 'hasLoggedIn', value: JSON.stringify(isLoggedIn) });
  }