import {
  IonCard,
  IonCheckbox,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonText,
} from "@ionic/react";
import "./todolist.scss";
const Todolist: React.FC = () => {
  return (
    <div id="todolist-component">
      <IonCard>
        <IonList>
          <IonListHeader className="text-lg">计划</IonListHeader>
          <IonItem lines="none">
            <IonCheckbox className="h-5 w-5"></IonCheckbox>
            <IonText>
              <p className="ml-3 w-40 font-light">
                我想要测试一下最长的长度是多少还有几个？
              </p>
            </IonText>
          </IonItem>
          <IonItem lines="none">
            <IonCheckbox></IonCheckbox>
            <IonText>
              <p className="ml-3 w-40 font-light">我想要测试一</p>
            </IonText>
          </IonItem>
          <IonItem lines="none">
            <IonCheckbox></IonCheckbox>
            <IonText>
              <p className="ml-3 w-40 font-light">我想要测试一下最长的长度</p>
            </IonText>
          </IonItem>
        </IonList>
        <IonList>
          <IonListHeader className="text-lg">正在处理</IonListHeader>
          <IonItem lines="none">
            <IonCheckbox></IonCheckbox>
            <IonText>
              <p className="ml-3 w-40 font-light">
                我想要测试一下最长的长度是多少还有几个？
              </p>
            </IonText>
          </IonItem>
        </IonList>
        <IonList>
          <IonListHeader className="text-lg">完成</IonListHeader>
          <IonItem lines="none">
            <IonText>
              <p className="w-40 font-light">我想要测试一下最长</p>
            </IonText>
          </IonItem>
        </IonList>
      </IonCard>
    </div>
  );
};

export default Todolist;
