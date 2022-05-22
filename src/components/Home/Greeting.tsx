import { IonText } from "@ionic/react";


const Greeting:React.FC = () => {

    return(
        <div className="p-8 flex justify-around items-center">
            <div >
                <IonText>
                    <h2 className="text-2xl tracking-widest leading-10 font-thin">下午好~</h2>
                    <h2 className="text-2xl tracking-widest font-bold">海里!</h2>
                </IonText>
            </div>
            <div>
                <img src="assets/img/day.svg" alt="" className="w-28 h28 ml-5" />
            </div>
        </div>
    );
};


export default Greeting;

