import {
  IonBackButton,
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import BacklogList from "../../components/Backlog/BacklogList";
import './backlogPage.scss'

const BacklogPage = () => {
  return (
    <IonPage id="backlog-page">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButton>
            <IonBackButton icon="assets/icon/back.svg" text=""></IonBackButton>
          </IonButton>
          <IonTitle slot="end">收集要做的事</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
          <BacklogList />
      </IonContent>
    </IonPage>
  );
};

export default BacklogPage;
