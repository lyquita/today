import { IonButton, IonCol, IonItem, IonList, IonRow, IonText } from "@ionic/react";
import { useEffect, useState } from "react";
import './today.scss';
import { Storage } from "@capacitor/storage";
import { getUsername } from "../../services/login";
import { getStorage } from "../../services/localStorage";

const Today: React.FC = () => {
  const [username, setUsername] = useState<string>('');

   useEffect(()=>{

    getStorage('user_id').then(
      res => 
      getUsername(res.value).then(m => {
        setUsername(m.data.username)
        Storage.set({
          key: 'username',
          value: m.data.username
        })
      })
      .catch(err => console.log(err))

    )
    
   }, [username])

   

  
   

  return (
    <div className="px-8" id="today-component">
      <div>
        <h2 className="text-2xl">Today</h2>
        <div className="h-3 w-16 bg-[#FBD8D4] top-6 -z-10"></div>
      </div>
      <IonList>
        <IonItem lines="none" routerLink="/todo">
          <IonRow>
            <IonCol>
              <IonText>
              <p className="font-bold">2</p>
              <p>Todo</p>
              </IonText>
            </IonCol>
            <IonCol>
              <IonText>
              <p className="font-bold">2</p>
              <p>In progress</p>
              </IonText>
            </IonCol>
            <IonCol>
              <IonText>
              <p className="font-bold">2</p>
              <p>Done</p>
              </IonText>
            </IonCol>
          </IonRow>
        </IonItem>
        <IonItem lines="none">
          <IonText>
          <h2 className="font-bold">Backlog</h2>
          <p>Redesign the todo list home page</p>
          </IonText>
        </IonItem>
      </IonList>
          <IonButton routerLink="/login">
          Log in
          </IonButton>
    </div>
  );
};

export default Today;
