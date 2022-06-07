import { Storage } from "@capacitor/storage";
import {
  IonActionSheet,
  IonButton,
  IonCard,
  IonCheckbox,
  IonFooter,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
  IonReorder,
  IonReorderGroup,
  IonText,
  IonTextarea,
  IonToolbar,
  ItemReorderEventDetail,
} from "@ionic/react";
import {
  heart,
  trash,
  star,
  archive,
  ellipsisHorizontal,
  ellipsisVertical,
} from "ionicons/icons";
import moment from "moment";
import { Ref, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { postNewBacklog } from "../../services/backlog";
import { getStorage } from "../../services/localStorage";
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
  const [inputValue, setInputvalue] = useState<string>("");
  const [today, setToday] = useState<string>(
    moment(new Date()).format("yyyy-MM-DD")
  );
  const [targetTodo, setTargetTodo] = useState<number>(0);
  const [showKeyboard, setShowKeyboard] = useState<boolean>(false);
  const inputRef = useRef<HTMLIonInputElement>(null);
  const [editFlag, setEditFlag] = useState<boolean>(false);

  const params: RouteParams = useParams();

  useEffect(() => {
    getTodolistByDate(params.date)
      .then((res) => {
        setRes(res);
      })
      .catch((err) => console.log(err));

    getStorage("username").then((res) => {
      if (res) {
        setUsername(res);
      }
    });
  }, [showKeyboard]);

  function handleAddTodo(value: string) {
    if (!editFlag) {
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
              setShowKeyboard(false);
            })
            .catch((err) => console.log(err))
        )
        .catch((err) => console.log(err));
    } else {
      if (inputValue) {
        let editedTodo = todos.find((X) => X.id === targetTodo);
        if (editedTodo) {
          editedTodo = { ...editedTodo, text: inputValue };
          updateTodo(targetTodo, editedTodo)
            .then((res) =>
              getTodolistByDate(today)
                .then((res) => {
                  setRes(res);
                  setInputvalue("");
                  setEditFlag(false);
                })
                .catch((err) => console.log(err))
            )
            .catch((err) => console.log(err));
        }
      }
    }
  }

  function handleCompleted(value: number) {
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

  function handleEdit(value: number) {
    console.log("clicked", inputRef);
    inputRef.current?.setFocus();

    let editedTodo = todos.find((X) => X.id === value);
    setInputvalue(editedTodo?.text!);
    setTargetTodo(value);
    setEditFlag(true);
  }

  function setRes(res: any) {
    setTodos(res.data);
    let pending = res.data.filter((todo: ITodo) => todo.status === "pending");
    let working = res.data.filter((todo: ITodo) => todo.status === "working");
    let done = res.data.filter((todo: ITodo) => todo.status === "done");
    setPending(pending);
    setWorking(working);
    setDone(done);
  }

  function handleClick(id: number, status: string) {
    if (status === "pending" || status === "working") {
      handleCompleted(id);
    } else {
      handlePending(id);
    }
  }

  function handleTodoToBacklog(value: number) {
    const params = {
      username: username,
      text: todos.find((X) => X.id === value)?.text!,
    };
    deleteTodo(value)
      .then((res) => {
        postNewBacklog(params)
          .then((res) => getTodolistByDate(today).then(
            res => setRes(res)
            
          ))
          .catch(err => console.log(err)
          )
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  return (
    <div id="todolist-component">
      <IonListHeader>
        <div className="flex justify-between w-full items-center">
          <h2 className="text-xl">今天</h2>
          <IonButton routerLink="/backlog">所有计划</IonButton>
        </div>
      </IonListHeader>

      {pending.map((item) => (
        <IonItemSliding key={item.id}>
          <IonItemOptions side="start" >
            <IonItemOption color="success" onClick={() => handleWorking(item.id!)}>处理中</IonItemOption>
            <IonItemOption color="secondary" onClick={()=> handleTodoToBacklog(item.id!)}>改天</IonItemOption>
          </IonItemOptions>

          <IonItem>
            <IonLabel onClick={() => handleClick(item.id!, item.status!)}>
              {item.text}
            </IonLabel>
          </IonItem>

          <IonItemOptions side="end">
            <IonItemOption color="primary" onClick={() => handleEdit(item.id!)}>
              编辑
            </IonItemOption>
            <IonItemOption
              color="danger"
              onClick={() => handleRemove(item.id!)}
            >
              删除
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
      ))}

      {working.map((item) => (
        <IonItemSliding key={item.id}>
          <IonItemOptions side="start">
            <IonItemOption
              color="success"
              onClick={() => handlePending(item.id!)}
            >
              计划
            </IonItemOption>
          </IonItemOptions>

          <IonItem>
            <IonLabel onClick={() => handleClick(item.id!, item.status!)}>
              {item.text}
              <IonText className="text-xs bg-[#fdf6f0] ml-2">处理中</IonText>
            </IonLabel>
          </IonItem>

          <IonItemOptions side="end">
            <IonItemOption color="primary" onClick={() => handleEdit(item.id!)}>
              编辑
            </IonItemOption>
            <IonItemOption
              color="danger"
              onClick={() => handleRemove(item.id!)}
            >
              删除
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
      ))}
      
      {done.map((item) => (
        <IonItemSliding key={item.id}>
          <IonItemOptions side="start">
            <IonItemOption color="success">处理中</IonItemOption>
          </IonItemOptions>

          <IonItem>
            <IonLabel
              onClick={() => handleClick(item.id!, item.status!)}
              className={item.status === "done" ? "line-through" : ""}
            >
              {item.text}
            </IonLabel>
          </IonItem>

          <IonItemOptions side="end">
            <IonItemOption color="primary" onClick={() => handleEdit(item.id!)}>
              编辑
            </IonItemOption>
            <IonItemOption
              color="danger"
              onClick={() => handleRemove(item.id!)}
            >
              删除
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
      ))}

      <IonFooter>
        <IonToolbar>
          <Addtodo
            handleAddTodo={handleAddTodo}
            inputValue={inputValue}
            setInputvalue={setInputvalue}
            setShowKeyBoard={setShowKeyboard}
            inputRef={inputRef}
          />
        </IonToolbar>
      </IonFooter>
    </div>
  );
};

export default Todolist;
