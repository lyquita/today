import React, { createContext, useEffect, useReducer, useState } from "react";
import { getEmotionList } from "../services/emotion";
import { initialState, AppState, reducers } from "./state";

export interface AppContextState {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export const AppContext = createContext<AppContextState>({
  state: initialState,
  dispatch: () => undefined,
});

export const AppContextProvider: React.FC = (props) => {
  const [store, dispatch] = useReducer(reducers, initialState);


  useEffect(() => {
    const emotionListArr = store.emotion.emotionList
    const getList = async () =>{
      const list = await getEmotionList()
      if(list){
        emotionListArr.length = 0
        emotionListArr.push.apply(emotionListArr, list.data);
      }
      return emotionListArr
    }

    getList()
  }, [store.user.isLoggedin, store.emotion.isUpdated]);



  return (
    <AppContext.Provider
      value={{
        state: store,
        dispatch,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
