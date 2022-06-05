import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { AppContext } from "../../data/AppContext";
import { Alert } from "../../services/alert";
import { clearStorage } from "../../services/localStorage";
import "./menu.scss";

interface IProps {
  login: boolean;
  setLogin: (value: boolean) => void;
}

const Menu: React.FC<IProps> = ({ login, setLogin }) => {
  const { state, dispatch } = useContext(AppContext);
  const [showLogoutAlert, setShowLogoutAlert] = useState<boolean>(false);
  const history = useHistory();

  const handleLogout = () => {
    dispatch({
      type: "set-is-login",
      loggedIn: false,
    });
    clearStorage();
    setLogin(false);
  };

  return (
    <>
      <IonMenu contentId="menu" id="menu-nav" className="menu-nav">
        <IonContent>
          <IonList>
            <IonItem lines="none" routerLink="/backlog">
              <IonMenuToggle>
                <IonButton>所有计划</IonButton>
              </IonMenuToggle>
            </IonItem>
            <IonItem lines="none">
              <IonMenuToggle>
             <IonButton>设置</IonButton>
              </IonMenuToggle>
            </IonItem>
            <IonItem lines="none">
              {login ? (
                <IonMenuToggle>
                <IonButton onClick={() => setShowLogoutAlert(true)}>
                  退出
                </IonButton>
                </IonMenuToggle>
              ) : (
                <IonMenuToggle>
                <IonButton routerLink="/login">登录</IonButton>
                </IonMenuToggle>
              )}
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>

      {showLogoutAlert ? (
        <Alert
          isOpen={showLogoutAlert}
          message="确定要退出吗？"
          buttons={[
            {
              text: "确定",
              handler: () => {
                setShowLogoutAlert(false);
                handleLogout();
                history.push("/login");
              },
            },
            {
              text: "取消",
              cssClass: "cancel",
              handler: () => {
                setShowLogoutAlert(false);
              },
            },
          ]}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Menu;

function setLogin(arg0: boolean) {
  throw new Error("Function not implemented.");
}
