import {
  IonActionSheet,
  IonButton,
  IonCard,
  IonCheckbox,
  IonCol,
  IonContent,
  IonDatetime,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonPopover,
  IonRow,
  IonText,
} from "@ionic/react";
import { useEffect, useState } from "react";
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

  function handleAddBacklog() {
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
  }

  function handleActionsheet(e: any) {
    setShowActionSheet(true);
    setTargetBacklog(e);
  }

  function handleEditStatus(value: number) {
    setEditid(value);
  }

  function handleEdit(value: number) {
    if (editInputValue) {
      let editedBacklog = backlogList.find((x) => x.id === value);

      if (editedBacklog) {
        editedBacklog = { ...editedBacklog, text: editInputValue };

        updateBacklog(value, editedBacklog)
          .then((res) => {
            setRenderflag(!renderFlag);
            setEditid(0);
            setEditInputValue("");
          })
          .catch((err) => console.log(err));
      }
    }
  }

  function handleSave() {

    if(!selectedDate){
      setShowEmptyDateAlert(true)
    }else{
      const newTodo = backlogList.find((x) => x.id === targetBacklog);

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
          deleteBacklog(targetBacklog)
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
      <IonCard>
        <IonList>
          {backlogList.map((backlog) => (
            <IonItem
              lines="none"
              key={backlog.id}
              onClick={() => handleEditStatus(backlog.id!)}
            >
              {editId !== backlog.id ? (
                <>
                  <IonInput
                    value={backlog.text}
                    placeholder={backlog.text}
                    onIonBlur={() => handleEdit(backlog.id!)}
                  />
                  <IonButton
                    onClick={() => {
                      setShowActionSheet(true);
                      handleActionsheet(backlog.id);
                    }}
                  >
                    <IonIcon icon="assets/icon/edit.svg"></IonIcon>
                  </IonButton>
                </>
              ) : (
                <>
                  <IonInput
                    placeholder={backlog.text}
                    onIonChange={(e) => setEditInputValue(e.detail.value!)}
                    value={editInputValue}
                    required
                    onIonBlur={() => handleEdit(backlog.id!)}
                  ></IonInput>
                  <IonButton
                    onClick={() => {
                      setShowActionSheet(true);
                      handleActionsheet(backlog.id);
                    }}
                  >
                    <IonIcon icon="assets/icon/edit.svg"></IonIcon>
                  </IonButton>
                </>
              )}
            </IonItem>
          ))}
        </IonList>
        <Addbacklog
          inputValue={inputValue}
          setInputvalue={setInputvalue}
          handleAddBacklog={handleAddBacklog}
        />
      </IonCard>
      <IonPopover isOpen={showPopover} className="calendar-popover">
        <IonDatetime
          presentation="date"
          value={selectedDate}
          onIonChange={(e) =>
            setSelectedDate(moment(e.detail.value).format("yyyy-MM-DD"))
          }
        ></IonDatetime>
        <IonButton className="save" onClick={handleSave}>
          Save
        </IonButton>
        <IonButton>Cancel</IonButton>
      </IonPopover>
      <IonActionSheet
        isOpen={showActionSheet}
        onDidDismiss={() => setShowActionSheet(false)}
        cssClass="action-sheet-class"
        buttons={[
          {
            text: "设置日期",
            handler: () => setShowpopover(true),
          },
          {
            text: "删除",
            role: "destructive",
            id: "delete-button",
            data: {
              type: "delete",
            },
            handler: () => {
              handleRemove(targetBacklog);
            },
          },
        ]}
      ></IonActionSheet>

      {showNewTodoAlert ? (
        <Alert
          isOpen={showNewTodoAlert}
          message={`已经添加到了${selectedDate} 计划中~`}
          buttons={[{
            text:'我知道了',
            handler:()=>{
              setShowNewTodoAlert(false)
            }
          }]}
        />
      ) : (
        ""
      )}


      {
        showEmptyDateAlert? (
          <Alert 
          isOpen= {showEmptyDateAlert}
          message="请选择日期"
          buttons={[{
            text:'我知道了',
            handler:()=> { 
              setShowEmptyDateAlert(false)
            }
          }]}
          />
        ): ''
      }
    </div>
  );
};

export default BacklogList;
