import { IonText } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { getStorage } from "../../services/localStorage";
import { getUsername } from "../../services/login";
import { Storage } from "@capacitor/storage";
import { AppContext } from "../../data/AppContext";

const Greeting: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [currentGreeting, setCurrentGreeting] = useState<string>("你好呀");
  const { state, dispatch } = useContext(AppContext);
  const [login, setLogin] = useState(state.user.isLoggedin);


  useEffect(() => {
    GenerateGreeting();
  });

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


  const GenerateGreeting = () => {
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

  return (
    <div className="p-8 flex justify-around items-center">
      <div>
        <IonText>
          <h2 className="text-2xl tracking-widest leading-10 font-thin">
            {currentGreeting}
          </h2>
          <h2 className="text-2xl tracking-widest font-bold">{username}</h2>
        </IonText>
      </div>
      <div>
        {currentTime ? (
          <img src="assets/img/moon.svg" alt="" className="w-28 h28 ml-5" />
        ) : (
          <img src="assets/img/day.svg" alt="" className="w-28 h28 ml-5" />
        )}
      </div>
    </div>
  );
};

export default Greeting;
