import {
  IonBackButton,
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router";
import DiaryRecords from "../../components/Emotion/DiaryRecord";
import { IEmotion } from "../../services/emotion";
import './diarylist.scss';


const DiaryListPage = () => {

  return (
    <IonPage id="diary-list-page">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButton>
            <IonBackButton icon="assets/icon/back.svg" text=""></IonBackButton>
          </IonButton>
          <IonTitle slot="end">2022年</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <DiaryRecords />
      </IonContent>
    </IonPage>
  );
};

export default DiaryListPage;
