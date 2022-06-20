import axios from "axios";
import { axiosInstance } from "../config";
import { getEmotionList, IEmotion } from "../services/emotion";
import { combineReducers } from "./combineReducers";
import { useEmoReducer } from "./emotion/emotion.reducer";
import { useReducer } from "./user/user.reducer";




export const initialState:AppState = {
    user:{
        isLoggedin: false
    },
    emotion: {
        isUpdated: false,
        emotionList: []
    }
}



export const reducers  = combineReducers({
    user: useReducer,
    emotion: useEmoReducer
})


export type AppState = ReturnType<typeof reducers>;
