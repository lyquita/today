import {
  IonButton,
  IonCol,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonText,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import "./login.scss";
import { postLogin } from "../../services/login";
import jwt_decode from "jwt-decode";
import { Storage } from "@capacitor/storage";
import { useHistory } from "react-router";
import { AppContext } from "../../data/AppContext";
import { setIsLoggedInData, setStorage } from "../../services/localStorage";
import { Alert } from "../../services/alert";

const LoginComponent: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showLoginSuccess, setShowLoginSuccess] = useState<boolean>(false);

  const history = useHistory();

  useEffect(() => {
    console.log("effect", showLoginSuccess);
  }, [showLoginSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const params = {
        username: username,
        password: password,
      };
      const res = await postLogin(params);
      if (res) {
        const userId = (jwt_decode(res.data.access) as any).user_id;
        await setStorage("user_id", userId);
        await setStorage("access_token", res.data.access);
        await setStorage("refresh_token", res.data.refresh);

        setIsLoggedInData(true);

        setUsername("");
        setPassword("");

        //dispatch login status
        dispatch({
          type: "set-is-login",
          loggedIn: true,
        });
        setShowLoginSuccess(true);
      }
    } catch (error) {
      console.error("login failed. " + error);
    }
  };

  console.log("show login", showLoginSuccess);

  return (
    <div className="mt-10 flex flex-col items-center" id="login-component">
      <IonText>
        <h2 className="text-3xl font-bold underline">Login</h2>
      </IonText>
      <form onSubmit={handleSubmit}>
        <IonList className="mt-10">
          <IonItem>
            <IonLabel position="floating">Username</IonLabel>
            <IonInput
              name="username"
              type="text"
              required
              value={username}
              onIonChange={(e) => setUsername(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              name="password"
              type="password"
              required
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            ></IonInput>
          </IonItem>
        </IonList>

        <IonRow>
          <IonCol>
            <IonButton type="submit">Login</IonButton>
          </IonCol>
        </IonRow>
      </form>

      {showLoginSuccess ? (
        <Alert
          isOpen={showLoginSuccess}
          message="登录成功"
          buttons={[
            {
              text: "确定",
              role: "cancel",
              id: "cancel-button",
              handler: (blah) => {
                setShowLoginSuccess(false);
                history.push("/home");
              },
            },
          ]}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default LoginComponent;
