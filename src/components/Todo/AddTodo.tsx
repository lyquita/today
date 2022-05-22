import { IonButton, IonIcon, IonInput, IonLabel } from "@ionic/react";
import './addtodo.scss';


const Addtodo: React.FC = () => {
  return (
    <div id="add-todo" className="flex">
      <IonInput name="addtodo" type="text" required placeholder="Add a new todo"></IonInput>
      <IonButton>
          <IonIcon icon="assets/icon/submit.svg" />
      </IonButton>
    </div>
  );
};

export default Addtodo;
