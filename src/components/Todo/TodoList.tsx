import { Storage } from "@capacitor/storage";
import {
  IonActionSheet,
  IonButton,
  IonCard,
  IonCheckbox,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  deleteTodo,
  getTodolistByDate,
  ITodo,
  postNewTodo,
  updateTodo,
} from "../../services/todolist";
import Addtodo from "./AddTodo";
import "./todolist.scss";

interface RouteParams {
  date: string;
}

const Todolist: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const month = moment(new Date()).format("MM");
  const year = moment(new Date()).format("yyyy");
  const [pending, setPending] = useState<ITodo[]>([]);
  const [working, setWorking] = useState<ITodo[]>([]);
  const [done, setDone] = useState<ITodo[]>([]);
  const [username, setUsername] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [inputValue, setInputvalue] = useState<string>("");
  const [today, setToday] = useState<string>(
    moment(new Date()).format("yyyy-MM-DD")
  );
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [targetTodo, setTargetTodo] = useState<number>(0);
  const [editId, setEditId] = useState<number>(0);
  const [editInputValue, setEditInputValue] = useState<string>('')
  

  const params: RouteParams = useParams();

  useEffect(() => {
    getTodolistByDate(params.date)
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

  function handleEdit(value:number){
    let editedTodo = todos.find((X) => X.id === value);
    
    if (editedTodo){
      editedTodo = {...editedTodo, text:editInputValue}
      updateTodo(value, editedTodo)
      .then((res) =>
          getTodolistByDate(today)
            .then((res) => {
              setRes(res);
              setEditInputValue("");
              setEditId(0)
            })
            .catch((err) => console.log(err))
        )
        .catch((err) => console.log(err));
    }
  
  }



  function handleEditStatus(value: number) {
    setEditId(value)
  }

  function handleActionsheet(e: any) {
    setShowActionSheet(true);
    setTargetTodo(e);
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
              { editId !== item.id ? (
                <>
                  <IonCheckbox
                    className="h-5 w-5"
                    checked={checked}
                    onIonChange={() => handleChecked(item.id!)}
                  ></IonCheckbox>
                  <IonLabel>
                    <p className="ml-3 w-40 font-light text-sm">{item.text}</p>
                  </IonLabel>
                  <IonButton
                    onClick={() => {
                      handleActionsheet(item.id);
                    }}
                  >
                    <IonIcon icon="assets/icon/edit.svg"></IonIcon>
                  </IonButton>
                </>
              ) : (
                <div className="flex w-full">
                  <IonInput placeholder={item.text} onIonChange={e=> setEditInputValue(e.detail.value!)} value={editInputValue} required></IonInput>
                  <IonButton onClick={()=> handleEdit(item.id!)}>
                    <IonIcon icon="assets/icon/save.svg"></IonIcon>
                  </IonButton>
                </div>
              )}
            </IonItem>
          ))}
        </IonList>
        <IonList>
          <IonListHeader className="text-lg">正在处理</IonListHeader>
          {working.map((item) => (
            <IonItem lines="none" key={item.id}>
            { editId !== item.id ? (
                <>
                  <IonCheckbox
                    className="h-5 w-5"
                    checked={checked}
                    onIonChange={() => handleChecked(item.id!)}
                  ></IonCheckbox>
                  <IonLabel>
                    <p className="ml-3 w-40 font-light text-sm">{item.text}</p>
                  </IonLabel>
                  <IonButton
                    onClick={() => {
                      handleActionsheet(item.id);
                    }}
                  >
                    <IonIcon icon="assets/icon/edit.svg"></IonIcon>
                  </IonButton>
                </>
              ) : (
                <div className="flex w-full">
                  <IonInput placeholder={item.text} onIonChange={e=> setEditInputValue(e.detail.value!)} value={editInputValue} required></IonInput>
                  <IonButton onClick={()=> handleEdit(item.id!)}>
                    <IonIcon icon="assets/icon/save.svg"></IonIcon>
                  </IonButton>
                </div>
              )}
            </IonItem>
          ))}
        </IonList>
        <IonList className="mb-5">
          <IonListHeader className="text-lg">完成</IonListHeader>
          {done.map((item) => (
            <IonItem lines="none" key={item.id}>
              { editId !== item.id ? (
                <>
                  <IonLabel>
                    <p className="ml-3 w-40 font-light text-sm">{item.text}</p>
                  </IonLabel>
                  <IonButton
                    onClick={() => {
                      handleActionsheet(item.id);
                    }}
                  >
                    <IonIcon icon="assets/icon/edit.svg"></IonIcon>
                  </IonButton>
                </>
              ) : (
                <div className="flex w-full">
                  <IonInput placeholder={item.text} onIonChange={e=> setEditInputValue(e.detail.value!)} value={editInputValue} required></IonInput>
                  <IonButton onClick={()=> handleEdit(item.id!)}>
                    <IonIcon icon="assets/icon/save.svg"></IonIcon>
                  </IonButton>
                </div>
              )}
            </IonItem>
          ))}
        </IonList>
        <Addtodo
          handleAddTodo={handleAddTodo}
          inputValue={inputValue}
          setInputvalue={setInputvalue}
        />
      </IonCard>
      <IonActionSheet
        isOpen={showActionSheet}
        onDidDismiss={() => setShowActionSheet(false)}
        cssClass="action-sheet-class"
        buttons={[
          {
            text: "计划状态",
            data: "Data value",
            handler: () => {
              handlePending(targetTodo);
            },
          },
          {
            text: "处理中",
            data: 10,
            handler: () => {
              handleWorking(targetTodo);
            },
          },
          {
            text: "编辑",
            handler: () => {
              handleEditStatus(targetTodo);
            },
          },
          {
            text: "删除",
            role: "destructive",
            id: "delete-button",
            data: {
              type: "delete",
            },
            handler: () => {
              handleRemove(targetTodo);
            },
          },
        ]}
      ></IonActionSheet>
    </div>
  );
};

export default Todolist;
