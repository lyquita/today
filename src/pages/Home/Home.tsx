import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Greeting from '../../components/Home/Greeting';
import Today from '../../components/Home/Today';
import './home.scss';

const Home: React.FC = () => {
  return (
    <IonPage id='home-page'>
      <IonContent>
            <Greeting />
            <Today />
      </IonContent>
    </IonPage>
  );
};

export default Home;
