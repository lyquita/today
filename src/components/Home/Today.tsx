import {
  IonButton,
  IonCol,
  IonItem,
  IonList,
  IonRow,
  IonText,
} from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import "./today.scss";
import { Storage } from "@capacitor/storage";
import { getUsername } from "../../services/login";
import { clearStorage, getStorage } from "../../services/localStorage";
import { AppContext } from "../../data/AppContext";

const Today: React.FC = () => {
  const [login, setLogin] = useState<boolean>(false);
  const context = useContext(AppContext);

  console.log('content from home', context.state);
  

  useEffect(() => {
    // check login status
    getStorage("access_token").then((res) => {
      if (res.value) {
        setLogin(true);
      }
    });
  }, [login]);


  const handleLogout = () => {
      clearStorage();
      setLogin(false);
  }
  

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
      {login ? (
        <IonButton routerLink="/login" onClick={handleLogout}>Log Out</IonButton>
      ) : (
        <IonButton routerLink="/login" >Log In</IonButton>
      )}
    </div>
  );
};

export default Today;
