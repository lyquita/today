import { IonBackButton, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import LoginComponent from "../../components/Login/Login";

import './login.scss';

const Login: React.FC = () => {
  return (
    <IonPage id="login-page">
        <IonHeader className="ion-no-border">
            <IonToolbar>
                <IonButton>
                <IonBackButton icon="assets/icon/back.svg" text=''></IonBackButton>
                </IonButton>
            </IonToolbar>
        </IonHeader>
      <IonContent scrollY={false}>
        <LoginComponent />
      </IonContent>
    </IonPage>
  );
};

export default Login;
