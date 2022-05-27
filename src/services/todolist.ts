

import axios from "axios";


export interface ITodo {
  id?:number,
  username: string,
  created_date?: string,
  text: string,
  status?: string,
  month?: string,
  year?: string
}


export async function getTodolistByDate(data: string): Promise<any> {
    const res = await axios.get(`todolist/daily/?date=${data}`);
    return res;
 
}

export async function getTodolistByMonth(month: string):Promise<any> {
    const res = await axios.get(`todolist/monthly/?month=${month}`);

    return res;
}

export async function postNewTodo(data:ITodo):Promise<any> {
  const res = await axios.post(`todolist/daily/`, data)

  return res;
}

export async function updateTodo(id:number, data:ITodo):Promise<any> {
  const res = await axios.put(`todolist/daily/${id}`, data);

  return res;
}

export async function deleteTodo(id:number):Promise<any> {
  const res = await axios.delete(`todolist/daily/${id}`);

  return res;
}