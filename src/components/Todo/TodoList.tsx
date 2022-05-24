import { Storage } from "@capacitor/storage";
import {
  CheckboxChangeEventDetail,
  CheckboxCustomEvent,
  IonCard,
  IonCheckbox,
  IonItem,
  IonList,
  IonListHeader,
  IonText,
} from "@ionic/react";
import moment from "moment";
import { useEffect, useState } from "react";
import {
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
          <IonListHeader className="text-lg">计划</IonListHeader>
          {pending.map((item) => (
            <IonItem lines="none" key={item.id}>
              <IonCheckbox
                className="h-5 w-5"
                checked={checked}
                onIonChange={() => handleChecked(item.id!)}
              ></IonCheckbox>
              <IonText>
                <p className="ml-3 w-40 font-light text-sm">{item.text}</p>
              </IonText>
            </IonItem>
          ))}
        </IonList>
        <IonList>
          <IonListHeader className="text-lg">正在处理</IonListHeader>
          {working.map((item) => (
            <IonItem lines="none" key={item.id}>
              <IonCheckbox></IonCheckbox>
              <IonText>
                <p className="ml-3 w-40 font-light text-sm">{item.text}</p>
              </IonText>
            </IonItem>
          ))}
        </IonList>
        <IonList className="mb-5">
          <IonListHeader className="text-lg">完成</IonListHeader>
          {done.map((item) => (
            <IonItem lines="none" key={item.id}>
              <IonText>
                <p className="w-40 font-light text-sm">{item.text}</p>
              </IonText>
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
