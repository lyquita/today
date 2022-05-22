import { Storage } from "@capacitor/storage";

export async function getStorage(key:string): Promise<any> {
    const value = await Storage.get({key: key});
    return value
}
