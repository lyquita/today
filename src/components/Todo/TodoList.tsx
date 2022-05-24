import { Storage } from "@capacitor/storage";
import {
  CheckboxChangeEventDetail,
  CheckboxCustomEvent,
  IonButton,
  IonCard,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPopover,
  IonRow,
  IonText,
} from "@ionic/react";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  deleteTodo,
  getTodolistByDate,
  ITodo,
  postNewTodo,
  updateTodo,
} from "../../services/todolist";
import Addtodo from "./AddTodo";
import "./todolist.scss";
const Todolist: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const today = moment(new Date()).format("yyyy-MM-DD");
  const month = moment(new Date()).format("MM");
  const year = moment(new Date()).format("yyyy");
  const [pending, setPending] = useState<ITodo[]>([]);
  const [working, setWorking] = useState<ITodo[]>([]);
  const [done, setDone] = useState<ITodo[]>([]);
  const [username, setUsername] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [inputValue, setInputvalue] = useState<string>("");
  const [pendingPopoverState, setPendingShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });
  const [workingPopoverState, setWorkingShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });

  const [donePopoverState, setDoneShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });

  useEffect(() => {
    getTodolistByDate(today)
      .then((res) => {
        setRes(res);
      })
      .catch((err) => console.log(err));

    Storage.get({ key: "username" }).then((res) => {
      if (res.value) {
        setUsername(res.value);
      }
    });
  }, []);

  function handleAddTodo(value: string) {
    const params: ITodo = {
      username: username,
      created_date: today,
      text: value,
      status: "pending",
      month: month,
      year: year,
    };

    postNewTodo(params)
      .then((res) =>
        getTodolistByDate(today)
          .then((res) => {
            setRes(res);
            setInputvalue("");
          })
          .catch((err) => console.log(err))
      )
      .catch((err) => console.log(err));
  }

  function handleChecked(value: number) {
    let checkedTodo = todos.find((X) => X.id === value);

    if (checkedTodo) {
      checkedTodo = { ...checkedTodo, status: "done" };
      updateTodo(value, checkedTodo)
        .then((res) =>
          getTodolistByDate(today)
            .then((res) => {
              setRes(res);
              setInputvalue("");
            })
            .catch((err) => console.log(err))
        )
        .catch((err) => console.log(err));
    }
  }

  function handleRemove(value: number) {
    deleteTodo(value)
      .then((res) =>
        getTodolistByDate(today)
          .then((res) => {
            setRes(res);
          })
          .catch((err) => console.log(err))
      )
      .catch((err) => console.log(err));
  }

  function handleWorking(value: number) {
    let checkedTodo = todos.find((X) => X.id === value);

    if (checkedTodo) {
      checkedTodo = { ...checkedTodo, status: "working" };
      updateTodo(value, checkedTodo)
        .then((res) =>
          getTodolistByDate(today)
            .then((res) => {
              setRes(res);
            })
            .catch((err) => console.log(err))
        )
        .catch((err) => console.log(err));
    }
  }

  function handlePending(value: number) {
    let checkedTodo = todos.find((X) => X.id === value);

    if (checkedTodo) {
      checkedTodo = { ...checkedTodo, status: "pending" };
      updateTodo(value, checkedTodo)
        .then((res) =>
          getTodolistByDate(today)
            .then((res) => {
              setRes(res);
              setInputvalue("");
            })
            .catch((err) => console.log(err))
        )
        .catch((err) => console.log(err));
    }
  }

  function setRes(res: any) {
    setTodos(res.data);
    setPending(res.data.filter((todo: ITodo) => todo.status === "pending"));
    setWorking(res.data.filter((todo: ITodo) => todo.status === "working"));
    setDone(res.data.filter((todo: ITodo) => todo.status === "done"));
  }

  return (
    <div id="todolist-component">
      <IonCard>
        <IonList>
          <IonListHeader className="text-lg ">计划</IonListHeader>
          {pending.map((item) => (
            <IonItem lines="none" key={item.id}>
              <IonCheckbox
                className="h-5 w-5"
                checked={checked}
                onIonChange={() => handleChecked(item.id!)}
              ></IonCheckbox>
              <IonLabel>
                <p className="ml-3 w-40 font-light text-sm">{item.text}</p>
              </IonLabel>
              <IonButton
                onClick={(e: any) => {
                  e.persist();
                  setPendingShowPopover({ showPopover: true, event: e });
                }}
              >
                <IonIcon icon="assets/icon/edit.svg"></IonIcon>
              </IonButton>
              <IonPopover
                event={pendingPopoverState.event}
                isOpen={pendingPopoverState.showPopover}
                onDidDismiss={() =>
                  setPendingShowPopover({ showPopover: false, event: undefined })
                }
              >
                <IonButton onClick={() => handleWorking(item.id!)}>
                  <IonIcon icon="assets/icon/down.svg" />
                </IonButton>
                <IonButton onClick={() => handleRemove(item.id!)}>
                  <IonIcon icon="assets/icon/delete.svg" />
                </IonButton>
              </IonPopover>
            </IonItem>
          ))}
        </IonList>
        <IonList>
          <IonListHeader className="text-lg">正在处理</IonListHeader>
          {working.map((item) => (
            <IonItem lines="none" key={item.id}>
              <IonCheckbox
                className="h-5 w-5"
                checked={checked}
                onIonChange={() => handleChecked(item.id!)}
              ></IonCheckbox>
              <IonLabel>
                <p className="ml-3 w-40 font-light text-sm">{item.text}</p>
              </IonLabel>
              <IonButton
                onClick={(e: any) => {
                  e.persist();
                  setWorkingShowPopover({ showPopover: true, event: e });
                }}
              >
                <IonIcon icon="assets/icon/edit.svg"></IonIcon>
              </IonButton>
              <IonPopover
                event={workingPopoverState.event}
                isOpen={workingPopoverState.showPopover}
                onDidDismiss={() =>
                  setWorkingShowPopover({ showPopover: false, event: undefined })
                }
              >
                <IonButton onClick={() => handlePending(item.id!)}>
                  <IonIcon icon="assets/icon/up.svg" />
                </IonButton>
                <IonButton onClick={() => handleRemove(item.id!)}>
                  <IonIcon icon="assets/icon/delete.svg" />
                </IonButton>
              </IonPopover>
            </IonItem>
          ))}
        </IonList>
        <IonList className="mb-5">
          <IonListHeader className="text-lg">完成</IonListHeader>
          {done.map((item) => (
            <IonItem lines="none" key={item.id}>
               <IonLabel>
                <p className="ml-3 w-40 font-light text-sm">{item.text}</p>
              </IonLabel>
              <IonButton
                onClick={(e: any) => {
                  e.persist();
                  setDoneShowPopover({ showPopover: true, event: e });
                }}
              >
                <IonIcon icon="assets/icon/edit.svg"></IonIcon>
              </IonButton>
              <IonPopover
                event={donePopoverState.event}
                isOpen={donePopoverState.showPopover}
                onDidDismiss={() =>
                  setDoneShowPopover({ showPopover: false, event: undefined })
                }
              >
                <IonButton onClick={() => handleWorking(item.id!)}>
                  <IonIcon icon="assets/icon/up.svg" />
                </IonButton>
                <IonButton onClick={() => handleRemove(item.id!)}>
                  <IonIcon icon="assets/icon/delete.svg" />
                </IonButton>
              </IonPopover>
            </IonItem>
          ))}
        </IonList>
        <Addtodo
          handleAddTodo={handleAddTodo}
          inputValue={inputValue}
          setInputvalue={setInputvalue}
        />
      </IonCard>
    </div>
  );
};

export default Todolist;
