import { IonButton, IonCol, IonInput, IonItem, IonLabel, IonList, IonRow, IonText } from "@ionic/react"
import React, { useState } from "react";
import './login.scss';
import { postLogin } from "../../services/login";
import jwt_decode from "jwt-decode";
import { Storage } from '@capacitor/storage';
import { useHistory } from "react-router";


const LoginComponent:React.FC = () => {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const history = useHistory();

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        try {
            const params = {
                username: username,
                password: password
            }
        const res = await postLogin(params);
            if(res){
                const userId = (jwt_decode(res.data.access) as any).user_id;
                Storage.set({
                    key:'user_id',
                    value: userId
                });
                Storage.set({
                    key: 'access_token',
                    value: res.data.access
                });
                Storage.set({
                    key:'refresh_token',
                    value: res.data.refresh
                });
         

                setUsername('');
                setPassword('');

                history.push('/home')
            }
    
        } catch (error) {
            console.log('err', error)
        }
        
    }



    return(
        <div className="mt-10 flex flex-col items-center" id="login-component">
            <IonText>
                <h2 className="text-3xl font-bold underline">Login</h2>
            </IonText>
            <form onSubmit={handleSubmit}>
            <IonList className="mt-10">
                <IonItem>
                    <IonLabel position="floating">Username</IonLabel>
                    <IonInput name="username" type="text" required value={username} onIonChange={e => setUsername(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput name="password" type="password" required value={password} onIonChange={e => setPassword(e.detail.value!)}></IonInput>
                </IonItem>
            </IonList>

            <IonRow>
                <IonCol>
                    <IonButton type="submit">Login</IonButton>
                </IonCol>
            </IonRow>
            </form>

        </div>
    )
}

export default LoginComponent