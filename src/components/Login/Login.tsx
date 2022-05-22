import { IonButton, IonCol, IonInput, IonItem, IonLabel, IonList, IonRow } from "@ionic/react"

const LoginComponent:React.FC = () => {


    return(
        <div>
            <IonList>
                <IonItem>
                    <IonLabel>Username</IonLabel>
                    <IonInput name="username" type="text" required></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel>Password</IonLabel>
                    <IonInput name="password" type="password" required></IonInput>
                </IonItem>
            </IonList>
            <IonRow>
                <IonCol>
                    <IonButton type="submit">Login</IonButton>
                </IonCol>
                <IonCol>
                    <IonButton>Sign up</IonButton>
                </IonCol>
            </IonRow>
        </div>
    )
}

export default LoginComponent