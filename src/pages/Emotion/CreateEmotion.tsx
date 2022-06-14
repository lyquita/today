import {
  IonBackButton,
  IonButton,
  IonContent,
  IonHeader,
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

interface RouteParams {
  date: string;
}

const CreateEmotion = () => {
  const [username, setUsername] = useState<string>("");
  const { state, dispatch } = useContext(AppContext);
  const routerparams: RouteParams = useParams();
  const history = useHistory<{ emotionList?: IEmotion[] }>();

  function handleClick(value: string) {
    const emotionList = history.location.state.emotionList;
    console.log("eee", history.location.state);

    if (emotionList) {
      if (emotionList.find((x) => x.date === routerparams.date)) {
        const id = emotionList.find((x) => x.date === routerparams.date)?.id!;
        const params: IEmotion = {
          username: emotionList.find((x) => x.date === routerparams.date)
            ?.username!,
          date: emotionList.find((x) => x.date === routerparams.date)?.date!,
          emo: value,
        };
        updateEmotion(id, params).then((res) => {
          dispatch({
            type: "update-emo",
            isUpdated: true,
          });
          history.push({ pathname: "/emotion" });
        });
      } else {
        const params: IEmotion = {
          username: username,
          date: routerparams.date,
          emo: value,
        };
        postNewEmotion(params)
          .then((res) => {
            dispatch({
              type: "update-emo",
              isUpdated: true,
            });
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
        <EmotionSelection handleClick={handleClick} />
        {/* <DeleteEmotion /> */}
      </IonContent>
    </IonPage>
  );
};

export default CreateEmotion;
