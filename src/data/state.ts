import { combineReducers } from "./combineReducers";
import { useReducer } from "./user/user.reducer";


export const initialState:AppState = {
    user:{
        isLoggedin: false
    }
}



export const reducers  = combineReducers({
    user: useReducer
})


export type AppState = ReturnType<typeof reducers>;
