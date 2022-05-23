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
import Addtodo from "../../components/Todo/AddTodo";
import Todolist from "../../components/Todo/TodoList";
import "./todo.scss";

const Todo: React.FC = () => {

  const day = moment(new Date()).format("DD");
  const month =  moment(new Date()).format("MM");
  const year = moment(new Date()).format("yyyy")

  return (
    <IonPage id="todo-page">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButton>
            <IonBackButton icon="assets/icon/back.svg"></IonBackButton>
          </IonButton>
          <IonTitle slot="end">
            <span className="text-xl">{month}月{day}日</span>
            <span className="text-sm ml-2">{year}</span>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false}>
        <Todolist />
      </IonContent>
    </IonPage>
  );
};

export default Todo;
