import React from "react";
import { setIsLoggedInData } from "../../services/localStorage";
import { ActionType } from "../../utils/types";

export const setIsLoggedIn = (loggedIn:boolean) => async (dispatch: React.Dispatch<any>) => {   
    return ({
        type: 'set-is-login',
        loggedIn
    } as const)
}


export type UserActions = 
| ActionType<typeof setIsLoggedIn>
