import { IonButton, IonCol, IonInput, IonItem, IonLabel, IonList, IonRow, IonText } from "@ionic/react"
import './login.scss';


const LoginComponent:React.FC = () => {


    return(
        <div className="mt-10 flex flex-col items-center" id="login-component">
            <IonText>
                <h2 className="text-3xl font-bold underline">Login</h2>
            </IonText>
            <IonList className="mt-10">
                <IonItem>
                    <IonLabel position="floating">Username</IonLabel>
                    <IonInput name="username" type="text" required></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput name="password" type="password" required></IonInput>
                </IonItem>
            </IonList>
            <IonRow>
                <IonCol>
                    <IonButton type="submit">Login</IonButton>
                </IonCol>
                {/* <IonCol>
                    <IonButton>Sign up</IonButton>
                </IonCol> */}
            </IonRow>
        </div>
    )
}

export default LoginComponent