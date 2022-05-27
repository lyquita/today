import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, RefresherEventDetail } from '@ionic/react';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import Greeting from '../../components/Home/Greeting';
import Today from '../../components/Home/Today';
import { AppContext } from '../../data/AppContext';
import { getStorage } from '../../services/localStorage';
import { getUsername } from '../../services/login';
import './home.scss';
import { Storage } from '@capacitor/storage';
import { getTodolistByDate, ITodo } from '../../services/todolist';

const Home: React.FC = () => {

  const [currentTime, setCurrentTime] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [currentGreeting, setCurrentGreeting] = useState<string>("你好呀");
  const { state, dispatch } = useContext(AppContext);
  const [login, setLogin] = useState(state.user.isLoggedin);
  const [renderFlag, setRenderFlag] = useState<boolean>(false);
  const [ today, setToday ] = useState(moment(new Date()).format("yyyy-MM-DD"))
  const [ todoAmount, setTodoAmount ] = useState<number>(0)
  const [ inprogressAmount, setInprogressAmount ] = useState<number>(0)
  const [ doneAmount, setDoneAmount ] = useState<number>(0)
 

  useEffect(() => {
    GenerateGreeting();


      // get username by userid
      getStorage("user_id").then((res) =>
      {
        if(res.value !== null) {
         getUsername(res.value)
         .then((m) => {
           setUsername(m.data.username);
           Storage.set({
             key: "username",
             value: m.data.username,
           });
         })
         .catch((err) => console.log(err))
        }else{
          setUsername('')
        }
      }
    );


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
    .catch((err) => {
      setTodoAmount(0)
      setInprogressAmount(0)
      setDoneAmount(0)
    });

 

  }, [renderFlag, login, doneAmount, todoAmount, inprogressAmount]);

   
   // check login status
   getStorage("hasLoggedIn").then((res) => {
    if (res.value) {
      setLogin(true);
    }
  });

  function GenerateGreeting() {
    const currentHour = moment().format("HH");
    if (parseInt(currentHour) >= 3 && parseInt(currentHour) < 12) {
      return setCurrentGreeting("早上好~");
    } else if (parseInt(currentHour) >= 12 && parseInt(currentHour) < 17) {
      return setCurrentGreeting("下午好~");
    } else if (parseInt(currentHour) >= 17 && parseInt(currentHour) < 20) {
      setCurrentTime(true);
      return setCurrentGreeting("晚上好~");
    } else if (parseInt(currentHour) >= 20 && parseInt(currentHour) < 3) {
      setCurrentTime(true);
      return setCurrentGreeting("晚安~");
    } else {
      return setCurrentGreeting("你好呀~");
    }
  };


  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    console.log('Begin async operation');
    setRenderFlag(!renderFlag)
  
    setTimeout(() => {
      console.log('Async operation has ended');
      event.detail.complete();
    }, 2000);
  }

  
  
  return (
    <IonPage id='home-page'>
      <IonContent>
        <IonRefresher slot='fixed' onIonRefresh={doRefresh}>
          <IonRefresherContent    
          pullingText="Pull to refresh"
          refreshingSpinner="circles"
          refreshingText="Refreshing..."></IonRefresherContent>
        </IonRefresher>
           <Greeting  username={username} currentGreeting={currentGreeting} currentTime={currentTime}/>
            <Today login={login} today={today} todoAmount={todoAmount} inprogressAmount={inprogressAmount} doneAmount={doneAmount} setLogin={setLogin}/> 
      </IonContent>
    </IonPage>
  );
};

export default Home;
