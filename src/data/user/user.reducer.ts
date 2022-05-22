import { UserActions } from "./user.action";
import { UserState } from "./user.state";

export function useReducer(state:UserState, action:UserActions) : UserState{
    switch (action.type){
        case 'set-is-login':
            return { ...state, isLoggedin: action.loggedIn}
    }
}