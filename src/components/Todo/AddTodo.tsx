import { IonButton, IonIcon, IonInput, IonLabel } from "@ionic/react";
import { useState } from "react";
import './addtodo.scss';

interface Props {
  handleAddTodo : (value:string) => void;
  inputValue: string;
  setInputvalue: (value:string) => void; 
  setShowKeyBoard: (value:boolean) => void;
}


const Addtodo: React.FC<Props> = ({handleAddTodo, inputValue, setInputvalue, setShowKeyBoard}) => {

  

  return (
    <div id="add-todo" className="flex">
      <IonInput name="addtodo" type="text" required placeholder="Add a new todo" onIonChange={e=> setInputvalue(e.detail.value!)} value={inputValue} onClick={()=>setShowKeyBoard(true)!} onIonBlur={()=>setShowKeyBoard(false)}></IonInput>
      <IonButton onClick={()=> handleAddTodo(inputValue)}>
          <IonIcon icon="assets/icon/submit.svg" />
      </IonButton>
    </div>
  );
};

export default Addtodo;
