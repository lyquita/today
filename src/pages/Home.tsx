import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Greeting from '../components/Home/Greeting';
import Today from '../components/Home/Today';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
            <Greeting />
            <Today />
      </IonContent>
    </IonPage>
  );
};

export default Home;
