import {
  IonButton,
  IonCard,
  IonCheckbox,
  IonCol,
  IonContent,
  IonDatetime,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonRow,
  IonText,
} from "@ionic/react";
import { useState } from "react";
import Addbacklog from "./Addbacklog";
import "./backlogList.scss";

const BacklogList = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDatePicker, setShowDatePicker ] = useState(false);

  return (
    <div id="backlog-list">
      <IonCard>
        <IonList>
          <IonItem lines="none">
            <IonText>
              测试 你说呢我这个 是一个测试而已 如果很长的样式如何？
            </IonText>
            <IonButton
            >
              <IonIcon icon="assets/icon/edit.svg"></IonIcon>
            </IonButton>
            <IonButton
              onClick={() => {
                setShowModal(true);
              }}
            >
              <IonIcon icon="assets/icon/calendar.svg"></IonIcon>
            </IonButton>
          </IonItem>
          <IonItem lines="none">
            <IonText>测试 你说呢我这个 是一个测试而已</IonText>
            <IonButton
            >
              <IonIcon icon="assets/icon/edit.svg"></IonIcon>
            </IonButton>
            <IonButton
              onClick={() => {
                setShowModal(true);
              }}
            >
              <IonIcon icon="assets/icon/calendar.svg"></IonIcon>
            </IonButton>
          </IonItem>
          <IonItem lines="none">
            <IonText>测试 你说呢我这个 是一个测试而已</IonText>
            <IonButton
            >
              <IonIcon icon="assets/icon/edit.svg"></IonIcon>
            </IonButton>
            <IonButton
              onClick={() => {
                setShowModal(true);
              }}
            >
              <IonIcon icon="assets/icon/calendar.svg"></IonIcon>
            </IonButton>
          </IonItem>
          <IonItem lines="none">
            <IonText>测试 你说呢我这个 是一个测试而已</IonText>
            <IonButton
            >
              <IonIcon icon="assets/icon/edit.svg"></IonIcon>
            </IonButton>
            <IonButton
              onClick={() => {
                setShowModal(true);
              }}
            >
              <IonIcon icon="assets/icon/calendar.svg"></IonIcon>
            </IonButton>
          </IonItem>
        </IonList>
        <Addbacklog />
      </IonCard>
      <IonModal
        className="my-modal"
        isOpen={showModal}
        breakpoints={[0.1, 0.5, 1]}
        initialBreakpoint={0.5}
        onDidDismiss={() => {setShowModal(false); setShowDatePicker(false)}}
      >
        <IonContent className="my-content">
              <IonDatetime ></IonDatetime>
        </IonContent>
      </IonModal>
    </div>
  );
};

export default BacklogList;
