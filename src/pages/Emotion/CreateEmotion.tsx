import {
  IonBackButton,
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import EmotionSelection from "../../components/Emotion/EmotionSelection";
import "./createEmotion.scss";
import { useHistory, useParams } from "react-router";
import {
  IEmotion,
  postNewEmotion,
  updateEmotion,
} from "../../services/emotion";
import { useContext, useEffect, useState } from "react";
import { getStorage } from "../../services/localStorage";
import { AppContext } from "../../data/AppContext";
import DeleteEmotion from "../../components/Emotion/DeleteEmotion";
import Diary from "./Diary";

interface RouteParams {
  date: string;
}

const CreateEmotion = () => {
  const [username, setUsername] = useState<string>("");
  const { state, dispatch } = useContext(AppContext);
  const routerparams: RouteParams = useParams();
  const history = useHistory<{ emotionList?: IEmotion[] }>();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedMoodName, setSelectedMoodName] = useState<string | null> (null);
  const [autoFocus, setAutoFocus] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');
  const emotionList:IEmotion[] = state.emotion.emotionList



  function handleClick(value: string, url: string) {
    setSelectedMood(url);
    setSelectedMoodName(value);
    setAutoFocus(true);
  }

  function handleSubmit(){
    const emotionList:IEmotion[] = state.emotion.emotionList
    if (emotionList) {
      if (emotionList.find((x) => x.date === routerparams.date)) {
        const id = emotionList.find((x) => x.date === routerparams.date)?.id!;
        const params: IEmotion = {
          username: emotionList.find((x) => x.date === routerparams.date)
            ?.username!,
          date: emotionList.find((x) => x.date === routerparams.date)?.date!,
          emo: selectedMoodName!,
          text: userInput
        };
        updateEmotion(id, params).then((res) => {
          console.log('updateEmotion');
          
          dispatch({
            type: "update-emo",
            isUpdated: true,
          });
          setSelectedMood(null)
          setSelectedMoodName(null)
          history.push({ pathname: "/emotion" });
        });
      } else {
        const params: IEmotion = {
          username: username,
          date: routerparams.date,
          emo: selectedMoodName!,
          text: userInput
        };
        postNewEmotion(params)
          .then((res) => {
            dispatch({
              type: "update-emo",
              isUpdated: true,
            });
          setSelectedMood(null);
          setSelectedMoodName(null);
            history.push("/emotion");
          })
          .catch((err) => console.log(err));
      }
    }
  }

  useEffect(() => {
    getStorage("username").then((res) => {
      if (res) {
        setUsername(res);
      }
    });


    if(emotionList.find((x)=> x.date === routerparams.date)?.emo){
      setSelectedMood(`assets/icon/emotion/${emotionList.find((x)=> x.date === routerparams.date)?.emo!}.svg`)
      setSelectedMoodName(emotionList.find((x)=> x.date === routerparams.date)?.emo!)
      setUserInput(emotionList.find((x)=> x.date === routerparams.date)?.text!)
    }
    
  }, []);

  return (
    <IonPage id="create-emotion-page">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButton>
            <IonBackButton icon="assets/icon/back.svg" text=""></IonBackButton>
          </IonButton>
          <IonTitle slot="end">{routerparams.date}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonText>今天心情怎么样~</IonText>
        <EmotionSelection
          handleClick={handleClick}
          selectedMood={selectedMood}
          setSelectedMood = {setSelectedMood}
        />
        {selectedMood ? (
          <Diary setAutoFocus={setAutoFocus} autoFocus={autoFocus} userInput={userInput} setUserInput={setUserInput} />
        ) : (
          ""
        )}
      </IonContent>
      {selectedMood ? (
        <IonFab vertical="bottom" horizontal="center" onClick={()=> handleSubmit()}>
          <IonFabButton>
            <IonIcon icon="assets/icon/submit.svg" />
          </IonFabButton>
        </IonFab>
      ) : (
        ""
      )}
    </IonPage>
  );
};

export default CreateEmotion;
