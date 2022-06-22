import {
  IonBackButton,
  IonButton,
  IonContent,
  IonDatetime,
  IonHeader,
  IonPage,
  IonPopover,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import moment from "moment";
import { useEffect, useState } from "react";
import MonthlyTodoContent from "../../components/MonthlyTodo/MonthlyTodoContent";
import "./monthlyTodoPage.scss";

const MonthlyTodoPage = () => {
  const [date, setDate] = useState(moment(new Date()).format("DD"));
  const [month, setMonth] = useState(moment(new Date()).format("MM"));
  const [year, setYear] = useState(moment(new Date()).format("yyyy"));
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<string>();


  useEffect(()=>{},[month,date])
  return (
    <IonPage id="monthly-todo-page">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButton>
            <IonBackButton icon="assets/icon/back.svg" text=""></IonBackButton>
          </IonButton>
          <IonTitle slot="end" onClick={() => setShowPopover(true)}>
            <span className="text-xl mr-3">{month}</span>
            <span className="text-sm">{year}</span>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <MonthlyTodoContent month={month} date={date}/>
        <IonPopover isOpen={showPopover} className="calendar-popover">
          <IonDatetime
            presentation="month"
            value={selectedMonth}
            onIonChange={(e) =>
              setSelectedMonth(moment(e.detail.value).format("MM"))
            }
          ></IonDatetime>
          <IonButton
            className="save"
            onClick={() => {
              setMonth(selectedMonth!);
              setShowPopover(false);
            }}
          >
            Save
          </IonButton>
          <IonButton>Cancel</IonButton>
        </IonPopover>
      </IonContent>
    </IonPage>
  );
};

export default MonthlyTodoPage;
