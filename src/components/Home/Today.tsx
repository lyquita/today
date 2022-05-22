import { IonButton } from "@ionic/react";
import './Today.scss';

const Today: React.FC = () => {
  return (
    <div className="px-8">
      <div>
        <h2 className="text-2xl">Today</h2>
        <div className="h-3 w-16 bg-[#FBD8D4] top-6 -z-10"></div>
      </div>
      <div className="mt-5">
        <div className="w-ful bg-[#F8F8F8] p-7 flex rounded-xl">
          <ul className="flex w-full justify-between">
            <li>
              <p className="font-bold">2</p>
              <p>Todo</p>
            </li>
            <li>
              <p className="font-bold">0</p>
              <p>In Progress</p>
            </li>
            <li>
              <p className="font-bold">1</p>
              <p>Done</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-5">
        <div className="w-ful bg-[#F8F8F8] p-7 rounded-xl">
          <h2 className="font-bold">Backlog</h2>
          <p>Redesign the todo list home page</p>
        </div>
      </div>
          <IonButton className="login">
          Log in
          </IonButton>
    </div>
  );
};

export default Today;
