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
    getEmotionList()
      .then((res) => {
        const emotionListArr = store.emotion.emotionList
        emotionListArr.push.apply(emotionListArr, res.data);
      })
      .catch((err) => console.log("getEmotionList err", err));
  }, []);

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
