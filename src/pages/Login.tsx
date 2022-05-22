import { IonBackButton, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import LoginComponent from "../components/Login/Login";

const Login: React.FC = () => {
  return (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButton>
                <IonBackButton text="back"></IonBackButton>
                </IonButton>
                <IonTitle>Login</IonTitle>
            </IonToolbar>
        </IonHeader>
      <IonContent fullscreen>
        <LoginComponent />
      </IonContent>
    </IonPage>
  );
};

export default Login;
