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
import { getTodolistByDate, ITodo } from "../../services/todolist";
import moment from "moment";
import { Alert } from "../../services/alert";
import { useHistory } from "react-router";

interface IProps{
  login: boolean,
  today: string,
  todoAmount: number,
  inprogressAmount: number,
  doneAmount: number,
  setLogin: (value:boolean)=> void;
}


const Today: React.FC<IProps> = ({login, today, todoAmount, inprogressAmount, doneAmount, setLogin}) => {
  const { state, dispatch } = useContext(AppContext);
  const  [showLogoutAlert, setShowLogoutAlert] = useState<boolean>(false);
  const history = useHistory();

  const handleLogout = () => {
    dispatch({
      type: "set-is-login",
      loggedIn: false,
    });
    clearStorage();
    setLogin(false);
  };

  

  useEffect(()=> {} ,[showLogoutAlert, login])
  

  return (
    <div className="px-8" id="today-component">
      <div>
        <h2 className="text-2xl">今天</h2>
        <div className="h-3 w-16 bg-[#FBD8D4] top-6 -z-10"></div>
      </div>
      <IonList>
        <IonItem lines="none" routerLink={`/todo/${today}`}>
          <IonRow>
            <IonCol>
              <IonText>
                <p className="font-bold">{todoAmount}</p>
                <p>计划</p>
              </IonText>
            </IonCol>
            <IonCol>
              <IonText>
                <p className="font-bold">{inprogressAmount}</p>
                <p>正在处理</p>
              </IonText>
            </IonCol>
            <IonCol>
              <IonText>
                <p className="font-bold">{doneAmount}</p>
                <p>完成</p>
              </IonText>
            </IonCol>
          </IonRow>
        </IonItem>
        <IonItem lines="none" routerLink="/backlog">
          <IonText>
            <h2>收集要做的事</h2>
          </IonText>
        </IonItem>
      </IonList>
      {login ? (
        <IonButton onClick={()=>setShowLogoutAlert(true)}>
          退出
        </IonButton>
      ) : (
        <IonButton routerLink="/login">登录</IonButton>
      )}
  {
    showLogoutAlert? (
      <Alert  isOpen={showLogoutAlert} message="确定要退出吗？" buttons={[
        {
          text:'确定',
          handler:() => {
            setShowLogoutAlert(false);
            handleLogout();
            history.push('/login');
          }
        },
        {
          text:'取消',
          cssClass: 'cancel',
          handler:()=>{
            setShowLogoutAlert(false)
          }
        }
      ]}/>
    ): ''
  }
      
    </div>
  );
};

export default Today;
