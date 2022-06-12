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
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import CalendarComponent from "../../components/Emotion/Calendar";
import { getEmotionList, IEmotion } from "../../services/emotion";
import "./emotion.scss";
const EmotionPage = () => {
  const [value, setValue] = useState(moment());
  const history = useHistory()
  const [emotionList, setEmotionList] = useState<IEmotion[]>([
    {
      id:0,
      username:'hireoo',
      date :'2022-06-10',
      emo :'happy'
    }
  ]);
  const [renderFlag, setRenderFlag] = useState<boolean>(false)

  useEffect(() => {
    getEmotionList().then((res) => setEmotionList(res.data));
  }, [renderFlag]);

 console.log('e', emotionList);
 
  return (
    <IonPage id="emotion-page">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButton>
            <IonBackButton icon="assets/icon/back.svg" text=""></IonBackButton>
          </IonButton>
          <IonTitle slot="end">心情</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <CalendarComponent value={value} onChange={setValue} emotionList={emotionList}/>
      </IonContent>
      <IonFab vertical="bottom" horizontal="center">
        <IonFabButton onClick={() => history.push({pathname: `/create-emotion/${value.clone().format('yyyy-MM-DD')}`, state:{emotionList}}) } >
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default EmotionPage;
