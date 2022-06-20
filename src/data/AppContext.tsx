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
  const [emotionList, setEmotionList] = useState([])
  const [renderFlag, setRenderFlag] = useState(false)
  const [loading, setLoading] = useState<boolean>(true)


  useEffect(() => {
    const emotionListArr = store.emotion.emotionList
    const getList = async () =>{
      const list = await getEmotionList()
      if(list){
        emotionListArr.push.apply(emotionListArr, list.data);
      }
      return emotionListArr
    }

    getList()
  }, [store.user.isLoggedin]);



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
