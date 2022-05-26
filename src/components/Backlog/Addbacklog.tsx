import { IonButton, IonIcon, IonInput } from "@ionic/react";
import "./addBacklog.scss";

const Addbacklog = () => {
  return (
    <div id="addbacklog" className="flex">
      <IonInput
        name="addtodo"
        type="text"
        required
        placeholder="添加新的清单"
      ></IonInput>
      <IonButton>
        <IonIcon icon="assets/icon/submit.svg" />
      </IonButton>
    </div>
  );
};

export default Addbacklog;
