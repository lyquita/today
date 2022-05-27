import { IonText } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { getStorage } from "../../services/localStorage";
import { getUsername } from "../../services/login";
import { Storage } from "@capacitor/storage";
import { AppContext } from "../../data/AppContext";

interface IProps{
  username: string,
  currentGreeting: string,
  currentTime :boolean;
}


const Greeting: React.FC<IProps> = ({username, currentGreeting, currentTime}) => {


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
