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
import CalendarComponent from "../../components/Emotion/Calendar";

const EmotionPage= () => {
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
          <CalendarComponent/>
      </IonContent>
        <IonFab vertical="bottom" horizontal="center" >
          <IonFabButton>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
    </IonPage>
  );
};

export default EmotionPage;
