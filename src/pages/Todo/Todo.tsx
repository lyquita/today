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
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Addtodo from "../../components/Todo/AddTodo";
import MonthlyTodoButton from "../../components/Todo/MonthlyTodo";
import Todolist from "../../components/Todo/TodoList";
import "./todo.scss";

const Todo: React.FC = () => {


  interface RouteParams {
    date: string
  }
  
  const [day, setDay] = useState(moment(new Date()).format("DD"));
  const [month, setMonth] = useState(moment(new Date()).format("MM"));
  const [year, setYear] = useState(moment(new Date()).format("yyyy"));
  const params:RouteParams = useParams();

  useEffect(()=>{
    setDay(moment(params.date).format('DD'))
    setMonth(moment(params.date).format('MM'))
    setYear(moment(params.date).format('yyyy'))
  },[])
  

  return (
    <IonPage id="todo-page">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButton>
            <IonBackButton icon="assets/icon/back.svg" text=''></IonBackButton>
          </IonButton>
          <IonTitle slot="end">
            <span className="text-xl">{month}月{day}日</span>
            <span className="text-sm ml-2">{year}</span>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >
        <MonthlyTodoButton />
        <Todolist />
      </IonContent>
    </IonPage>
  );
};

export default Todo;
