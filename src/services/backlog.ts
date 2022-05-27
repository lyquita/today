import axios from 'axios';


export interface IBacklog {
        id?:number,
        username: string,
        text: string,
}


export async function getBackloglist():Promise<any>{
    const res = await axios.get('backlog/');

    return res;
}

export async function postNewBacklog(data:IBacklog):Promise<any>{
    const res = await axios.post('backlog/', data);

    return res;
}

export async function updateBacklog(id:number, data:IBacklog):Promise<any>{
    const res = await axios.put(`backlog/${id}`, data);

    return res;
}


export async function deleteBacklog(id:number) :Promise<any>{
    const res = await axios.delete(`backlog/${id}`);

    return res;
}