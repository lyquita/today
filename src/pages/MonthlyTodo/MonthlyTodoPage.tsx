import {
  IonBackButton,
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import moment from "moment";
import MonthlyTodoContent from "../../components/MonthlyTodo/MonthlyTodoContent";
import './monthlyTodoPage.scss';

const MonthlyTodoPage = () => {
    const month =  moment(new Date()).format("MM");

  return (
    <IonPage id="monthly-todo-page">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButton>
            <IonBackButton icon="assets/icon/back.svg"></IonBackButton>
          </IonButton>
          <IonTitle slot="end">
            <span className="text-xl">{month}月</span>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
            <MonthlyTodoContent/>
      </IonContent>
    </IonPage>
  );
};

export default MonthlyTodoPage;
