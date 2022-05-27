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

const Today: React.FC = () => {
  const [login, setLogin] = useState<boolean>(false);
  const { state, dispatch } = useContext(AppContext);
  const [ today, setToday ] = useState(moment(new Date()).format("yyyy-MM-DD"))
  const [ todoAmount, setTodoAmount ] = useState<number>(0)
  const [ inprogressAmount, setInprogressAmount ] = useState<number>(0)
  const [ doneAmount, setDoneAmount ] = useState<number>(0)

  useEffect(() => {
    
    getTodolistByDate(today)
    .then((res) => {
      let pending = 0;
      let working = 0;
      let done =0;

      res.data.map((item:ITodo) => {
  
        switch (item.status) {
          case "pending":
            pending = pending + 1
            break;
          case "working":
            working = working+1
            break;
          case "done":
            done = done+1
            break
          default:
            break;
        }
      })
      setTodoAmount(pending)
      setInprogressAmount(working)
      setDoneAmount(done)
    })
    .catch((err) => console.log(err));
  }, [login]);

  const handleLogout = () => {
    dispatch({
      type: "set-is-login",
      loggedIn: false,
    });
    clearStorage();
    setLogin(false);
  };

  // check login status
  getStorage("hasLoggedIn").then((res) => {
    if (res.value) {
      setLogin(true);
    }
  });

  

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
            <h2 className="font-bold">收集清单</h2>
            <p>Redesign the todo list home page</p>
          </IonText>
        </IonItem>
      </IonList>
      {login ? (
        <IonButton routerLink="/login" onClick={handleLogout}>
          退出
        </IonButton>
      ) : (
        <IonButton routerLink="/login">登录</IonButton>
      )}
    </div>
  );
};

export default Today;
