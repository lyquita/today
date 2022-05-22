import {
  IonBackButton,
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Addtodo from "../../components/Todo/AddTodo";
import Todolist from "../../components/Todo/TodoList";
import "./todo.scss";

const Todo: React.FC = () => {
  return (
    <IonPage id="todo-page">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButton>
            <IonBackButton icon="assets/icon/back.svg"></IonBackButton>
          </IonButton>
          <IonTitle slot="end">
            <span className="text-xl">5月21日</span>
            <span className="text-sm ml-2">2022</span>
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
