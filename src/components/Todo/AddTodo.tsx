import { IonButton, IonIcon, IonInput, IonLabel } from "@ionic/react";
import { RefObject, useState } from "react";
import './addtodo.scss';

interface Props {
  handleAddTodo : (value:string) => void;
  inputValue: string;
  setInputvalue: (value:string) => void; 
  setShowKeyBoard: (value:boolean) => void;
  inputRef:any
}


const Addtodo: React.FC<Props> = ({handleAddTodo, inputValue, setInputvalue, setShowKeyBoard, inputRef}) => {

  

  return (
    <div id="add-todo" className="flex">
      <IonInput name="addtodo" type="text" required placeholder="添加新计划" onIonChange={e=> setInputvalue(e.detail.value!)} value={inputValue} onClick={()=>setShowKeyBoard(true)!} onIonBlur={()=>setShowKeyBoard(false)} ref={inputRef}></IonInput>
      <IonButton onClick={()=> handleAddTodo(inputValue)}>
          <IonIcon icon="assets/icon/submit.svg" />
      </IonButton>
    </div>
  );
};

export default Addtodo;
