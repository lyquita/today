import { IonButton, IonIcon } from "@ionic/react";
import './monthlyTodo.scss';

const MonthlyTodoButton = () => {


    return(
        <div id="monthly-todo-button">
        <IonButton slot="end" routerLink="/monthly-todo">
            <IonIcon icon="assets/icon/monthly-open.svg"></IonIcon>
        </IonButton>
        </div>
    )
}

export default MonthlyTodoButton;