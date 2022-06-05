import { IonButton, IonIcon, IonInput } from "@ionic/react";
import "./addBacklog.scss";

interface Props {
  inputValue: string,
  setInputvalue: (value:string) => void;
  handleAddBacklog: () => void;
  inputRef: any
}


const Addbacklog:React.FC<Props> = ({ inputValue, setInputvalue, handleAddBacklog, inputRef }) => {
  return (
    <div id="addbacklog" className="flex">
      <IonInput
        name="addtodo"
        type="text"
        required
        placeholder="添加新的清单"
        value={inputValue}
        onIonChange={e=> setInputvalue(e.detail.value!)} 
        ref={inputRef}
      ></IonInput>
      <IonButton onClick={handleAddBacklog}>
        <IonIcon icon="assets/icon/submit.svg" />
      </IonButton>
    </div>
  );
};

export default Addbacklog;
