import axios from "axios";

export interface IEmotion {
  id?: number;
  username: string;
  date: string;
  emo?: string;
  text?: string;
}

export async function getEmotionList(): Promise<any> {
  const res = await axios.get("emotion/");

  return res;
}

export async function postNewEmotion(data: IEmotion): Promise<any> {
  const res = await axios.post("emotion/", data);

  return res;
}

export async function updateEmotion(id:number, data:IEmotion): Promise<any> {
    const res = await axios.put(`emotion/${id}`, data);

    return res;
}

export const emotionGroup = [
  {
    name: "slight-smile",
    url: "assets/icon/emotion/slight-smile.svg",
  },
  {
    name: "wink",
    url: "assets/icon/emotion/wink.svg",
  },
  {
    name: "happy",
    url: "assets/icon/emotion/happy.svg",
  },
  {
    name: "cool",
    url: "assets/icon/emotion/cool.svg",
  },
  {
    name: "grining-face",
    url: "assets/icon/emotion/grining-face.svg",
  },
  {
    name: "angry",
    url: "assets/icon/emotion/angry.svg",
  },
  {
    name: "confuse",
    url: "assets/icon/emotion/confuse.svg",
  },
  {
    name: "pouting-face",
    url: "assets/icon/emotion/pouting-face.svg",
  },
  {
    name: "unhappy",
    url: "assets/icon/emotion/unhappy.svg",
  },
  {
    name: "dizzy",
    url: "assets/icon/emotion/dizzy.svg",
  }
];
