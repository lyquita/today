import { IonText } from "@ionic/react";

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
