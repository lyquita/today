import { combineReducers } from "./combineReducers";
import { useEmoReducer } from "./emotion/emotion.reducer";
import { useReducer } from "./user/user.reducer";


export const initialState:AppState = {
    user:{
        isLoggedin: false
    },
    emotion: {
        isUpdated: false
    }
}



export const reducers  = combineReducers({
    user: useReducer,
    emotion: useEmoReducer
})


export type AppState = ReturnType<typeof reducers>;
