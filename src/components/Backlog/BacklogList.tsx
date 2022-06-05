import {
  IonActionSheet,
  IonButton,
  IonButtons,
  IonCard,
  IonCheckbox,
  IonCol,
  IonContent,
  IonDatetime,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonPopover,
  IonRow,
  IonText,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import {
  deleteBacklog,
  getBackloglist,
  IBacklog,
  postNewBacklog,
  updateBacklog,
} from "../../services/backlog";
import Addbacklog from "./Addbacklog";
import "./backlogList.scss";
import { Storage } from "@capacitor/storage";
import moment from "moment";
import { ITodo, postNewTodo } from "../../services/todolist";
import { getStorage } from "../../services/localStorage";
import { Alert } from "../../services/alert";

const BacklogList = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [backlogList, setBackloglist] = useState<IBacklog[]>([]);
  const [inputValue, setInputvalue] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [renderFlag, setRenderflag] = useState<boolean>(false);
  const [targetBacklog, setTargetBacklog] = useState<number>(0);
  const [editId, setEditid] = useState<number>(0);
  const [editInputValue, setEditInputValue] = useState<string>("");
  const [showPopover, setShowpopover] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [showNewTodoAlert, setShowNewTodoAlert] = useState<boolean>(false);
  const [showEmptyDateAlert, setShowEmptyDateAlert] = useState<boolean>(false);
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const inputRef = useRef<HTMLIonInputElement>(null);

  function handleAddBacklog() {
    if (!editFlag) {
      const params: IBacklog = {
        username: username,
        text: inputValue,
      };

      postNewBacklog(params)
        .then((res) => {
          setInputvalue("");

          setRenderflag(!renderFlag);
        })
        .catch((err) => console.log(err));
    } else {
      if (inputValue) {
        let editedBacklog = backlogList.find((x) => x.id === targetBacklog);

        if (editedBacklog) {
          editedBacklog = { ...editedBacklog, text: inputValue };

          updateBacklog(targetBacklog, editedBacklog)
            .then((res) => {
              setRenderflag(!renderFlag);
              setInputvalue("");
            })
            .catch((err) => console.log(err));
        }
      }
    }
  }

  function handleSchedule(value:number){
    setShowpopover(true)
    setEditid(value);
  }


  function handleEdit(value: number) {
    inputRef.current?.setFocus();

    let editedBacklog = backlogList.find((X) => X.id === value);
    setInputvalue(editedBacklog?.text!);
    setTargetBacklog(value);
    setEditFlag(true);
  }

  function handleAddToTodo(value:number) {
      const newTodo = backlogList.find((x) => x.id === value);

      const params: ITodo = {
        created_date: moment().format('yyyy-MM-DD'),
        username: username,
        text: newTodo?.text || "",
        status: "pending",
        month: moment().format("MM"),
        year: moment().format("yyyy"),
      };

      postNewTodo(params)
        .then((res) =>
          deleteBacklog(value)
            .then((res) => {
              setRenderflag(!renderFlag);
              setSelectedDate("");
              setShowNewTodoAlert(true);
            })
            .catch((err) => console.log(err))
        )
        .catch((err) => console.log(err));

      setShowpopover(false);
    
  }

  function handleOnSave(){
    if(!selectedDate){
      setShowEmptyDateAlert(true)
    }else{
      const newTodo = backlogList.find((x) => x.id === editId);

      const params: ITodo = {
        created_date: selectedDate,
        username: username,
        text: newTodo?.text || "",
        status: "pending",
        month: moment(selectedDate).format("MM"),
        year: moment(selectedDate).format("yyyy"),
      };
  
      postNewTodo(params)
        .then((res) =>
          deleteBacklog(editId)
            .then((res) => {
              setRenderflag(!renderFlag);
              setSelectedDate('');
              setShowNewTodoAlert(true);
            })
            .catch((err) => console.log(err))
        )
        .catch((err) => console.log(err));
  
      setShowpopover(false);
    }
  }

  function handleRemove(value: number) {
    deleteBacklog(value)
      .then((res) =>
        getBackloglist()
          .then((res) => {
            setRenderflag(!renderFlag);
          })
          .catch((err) => console.log(err))
      )
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getBackloglist()
      .then((res) => setBackloglist(res.data))
      .catch((err) => console.log(err));

    getStorage("username").then((res) => {
      if (res) {
        setUsername(res);
      }
    });
  }, [renderFlag, showNewTodoAlert, showEmptyDateAlert]);

  return (
    <div id="backlog-list">
      <IonList>
        {backlogList.map((backlog) => (
          <IonItemSliding key={backlog.id}>
            <IonItem>
              <IonLabel>{backlog.text}</IonLabel>
              <IonButtons>
                <IonButton onClick={()=> handleAddToTodo(backlog.id!)}>
                  <IonIcon icon="assets/icon/add.svg"></IonIcon>
                </IonButton>
                <IonButton onClick={()=> handleSchedule(backlog.id!)}>
                  <IonIcon icon="assets/icon/calendar.svg"></IonIcon>
                </IonButton>
              </IonButtons>
            </IonItem>

            <IonItemOptions side="end">
              <IonItemOption
                color="primary"
                onClick={() => handleEdit(backlog.id!)}
              >
                编辑
              </IonItemOption>
              <IonItemOption
                color="danger"
                onClick={() => handleRemove(backlog.id!)}
              >
                删除
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        ))}
      </IonList>
      <Addbacklog
        inputValue={inputValue}
        setInputvalue={setInputvalue}
        handleAddBacklog={handleAddBacklog}
        inputRef={inputRef}
      />
      <IonPopover isOpen={showPopover} className="calendar-popover">
        <IonDatetime
          presentation="date"
          value={selectedDate}
          onIonChange={(e) =>
            setSelectedDate(moment(e.detail.value).format("yyyy-MM-DD"))
          }
        ></IonDatetime>
        <IonButton className="save" onClick={()=> handleOnSave()}>
          Save
        </IonButton>
        <IonButton>Cancel</IonButton>
      </IonPopover>

      {showNewTodoAlert ? (
        <Alert
          isOpen={showNewTodoAlert}
          message={`已经添加到了${selectedDate} 计划中~`}
          buttons={[
            {
              text: "我知道了",
              handler: () => {
                setShowNewTodoAlert(false);
              },
            },
          ]}
        />
      ) : (
        ""
      )}

      {showEmptyDateAlert ? (
        <Alert
          isOpen={showEmptyDateAlert}
          message="请选择日期"
          buttons={[
            {
              text: "我知道了",
              handler: () => {
                setShowEmptyDateAlert(false);
              },
            },
          ]}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default BacklogList;
