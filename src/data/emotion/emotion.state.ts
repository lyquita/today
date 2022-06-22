import { getEmotionList } from "../../services/emotion";

export interface EmotionState {
    isUpdated: boolean;
}


export const emotionListState = async () =>{
 const emotionList =  await getEmotionList()
 return emotionList

}