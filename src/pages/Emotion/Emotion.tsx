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
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add } from "ionicons/icons";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import CalendarComponent from "../../components/Emotion/Calendar";
import DeleteEmotion from "../../components/Emotion/DeleteEmotion";
import { AppContext } from "../../data/AppContext";
import { getEmotionList, IEmotion } from "../../services/emotion";
import "./emotion.scss";
const EmotionPage = () => {
  const [value, setValue] = useState(moment());
  const history = useHistory<{ emotionList?: IEmotion[], prev?:string }>()
  const {state, dispatch} = useContext(AppContext);


  useEffect(() => {
    // dispatch({
    //   type: "update-emo",
    //   isUpdated: false
    // })
  }, [state.emotion.isUpdated])


 
  return (
    <IonPage id="emotion-page" >
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButton>
            <IonBackButton icon="assets/icon/back.svg" text=""></IonBackButton>
          </IonButton>
          <IonTitle slot="end">心情树洞</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <CalendarComponent value={value} onChange={setValue} />      </IonContent>
      <IonFab vertical="bottom" horizontal="center">
        <IonFabButton onClick={() => history.push({pathname: `/create-emotion/${value.clone().format('yyyy-MM-DD')}`}) } >
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default EmotionPage;
