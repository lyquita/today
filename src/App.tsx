import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, isPlatform, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/styles.scss';


// Tailwind CSS 
import './theme/tailwind.css';
import Login from './pages/Login/Login';
import Todo from './pages/Todo/Todo';
import { AppContextProvider } from './data/AppContext';
import MonthlyTodoPage from './pages/MonthlyTodo/MonthlyTodoPage';
import BacklogPage from './pages/Backlog/BacklogPage';
import EmotionPage from './pages/Emotion/Emotion';
import CreateEmotion from './pages/Emotion/CreateEmotion';
import DiaryListPage from './pages/Emotion/DairyList';



setupIonicReact({
  animated: false,
  backButtonText:'',
  mode:'md',
});

const App: React.FC = () => (
  <AppContextProvider>
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home" component={Home} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/login" component={Login} />
        <Route exact path="/todo/:date" component={Todo} />
        <Route exact path="/monthly-todo" component={MonthlyTodoPage} />
        <Route exact path="/backlog" component={BacklogPage} />
        <Route exact path="/emotion" component={EmotionPage} />
        <Route exact path="/create-emotion/:date" component={CreateEmotion}  />
        <Route exact path="/diary-list"  component={DiaryListPage} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  </AppContextProvider>
);

export default App;
