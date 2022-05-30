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
  IonLabel,
  IonList,
  IonListHeader,
  IonReorder,
  IonReorderGroup,
  IonTextarea,
  IonToolbar,
  ItemReorderEventDetail,
} from "@ionic/react";
import moment from "moment";
import { Ref, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
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
  const [checked, setChecked] = useState<boolean>(false);
  const [inputValue, setInputvalue] = useState<string>("");
  const [today, setToday] = useState<string>(
    moment(new Date()).format("yyyy-MM-DD")
  );
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [targetTodo, setTargetTodo] = useState<number>(0);
  const [editId, setEditId] = useState<number>(0);
  const [editInputValue, setEditInputValue] = useState<string>("");
  const [groupedItem, setGroupedItem] = useState<ITodo[]>([]);
  const [showKeyboard, setShowKeyboard] = useState<boolean>(false)

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
  }, [showKeyboard, editInputValue]);

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
            setShowKeyboard(false);
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

  function handleEdit(value: number) {
    if (editInputValue) {
      let editedTodo = todos.find((X) => X.id === value);

      if (editedTodo) {
        editedTodo = { ...editedTodo, text: editInputValue };
        updateTodo(value, editedTodo)
          .then((res) =>
            getTodolistByDate(today)
              .then((res) => {
                setRes(res);
                setEditInputValue("");
                setEditId(0);
              })
              .catch((err) => console.log(err))
          )
          .catch((err) => console.log(err));
      }
    }else{
      setEditId(0)
      setEditInputValue('')
    }
  }

  function handleEditStatus(value: number) {
    console.log('clicked', value);
    
    setEditId(value);
  }

  function handleActionsheet(e: any) {
    setShowActionSheet(true);
    setTargetTodo(e);
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


  

  return (
    <div id="todolist-component">
      <IonCard>
        <IonListHeader className="text-lg ">计划</IonListHeader>
      
        {pending.map((item) => (
          <IonItem
            lines="none"
            key={item.id}
          >
            {editId === item.id ? (
              <>
                <IonCheckbox
                  className="h-5 w-5"
                  checked={checked}
                  onIonChange={() => handleChecked(item.id!)}
                ></IonCheckbox>
                  <>
                    <IonTextarea
                      value={editInputValue}
                      required
                      placeholder={item.text}
                      onIonInput={(e:any) => setEditInputValue(e.target.value)}
                      // onIonChange={(e) => setEditInputValue(e.detail.value!)}
                      onIonBlur={() => { handleEdit(item.id!); setEditInputValue('')}}
                      onClick={() => handleEditStatus(item.id!)}
                      autoGrow
                    ></IonTextarea>
                    <IonButton
                      onClick={() => {
                        setShowActionSheet(true);
                        handleActionsheet(item.id)

                      }}
                    >
                      <IonIcon icon="assets/icon/edit.svg"></IonIcon>
                    </IonButton>
                  </>
              </>
            ) : (
              <>
                <IonCheckbox
                  className="h-5 w-5"
                  checked={checked}
                  onIonChange={() => handleChecked(item.id!)}
                ></IonCheckbox>
                  <>
                    <IonTextarea
                      autoGrow
                      value={item.text}
                      required
                      placeholder={item.text}
                      onClick={() => handleEditStatus(item.id!)}
                    ></IonTextarea>
                    <IonButton
                      onClick={() => {
                        setShowActionSheet(true);
                        handleActionsheet(item.id)

                      }}
                    >
                      <IonIcon icon="assets/icon/edit.svg"></IonIcon>
                    </IonButton>
                  </>
              </>
            )}
          </IonItem>
        ))}
        <IonListHeader className="text-lg">正在处理</IonListHeader>
        {working.map((item) => (
           <IonItem
           lines="none"
           key={item.id}
         >
           {editId === item.id ? (
             <>
               <IonCheckbox
                 className="h-5 w-5"
                 checked={checked}
                 onIonChange={() => handleChecked(item.id!)}
               ></IonCheckbox>
                 <>
                   <IonTextarea
                     value={editInputValue}
                     required
                     placeholder={item.text}
                     onIonInput={(e:any) => setEditInputValue(e.target.value)}
                     // onIonChange={(e) => setEditInputValue(e.detail.value!)}
                     onIonBlur={() => { handleEdit(item.id!); setEditInputValue('')}}
                     onClick={() => handleEditStatus(item.id!)}
                     autoGrow
                   ></IonTextarea>
                   <IonButton
                     onClick={() => {
                       setShowActionSheet(true);
                       handleActionsheet(item.id)

                     }}
                   >
                     <IonIcon icon="assets/icon/edit.svg"></IonIcon>
                   </IonButton>
                 </>
             </>
           ) : (
             <>
               <IonCheckbox
                 className="h-5 w-5"
                 checked={checked}
                 onIonChange={() => handleChecked(item.id!)}
               ></IonCheckbox>
                 <>
                   <IonTextarea
                     autoGrow
                     value={item.text}
                     required
                     placeholder={item.text}
                     onClick={() => handleEditStatus(item.id!)}
                   ></IonTextarea>
                   <IonButton
                     onClick={() => {
                       setShowActionSheet(true);
                       handleActionsheet(item.id)

                     }}
                   >
                     <IonIcon icon="assets/icon/edit.svg"></IonIcon>
                   </IonButton>
                 </>
             </>
           )}
         </IonItem>
        ))}
        <IonListHeader className="text-lg">完成</IonListHeader>
        {done.map((item) => (
           <IonItem
           lines="none"
           key={item.id}
         >
           {editId === item.id ? (
             <>
                 <>
                   <IonTextarea
                     value={editInputValue}
                     required
                     placeholder={item.text}
                     onIonInput={(e:any) => setEditInputValue(e.target.value)}
                     // onIonChange={(e) => setEditInputValue(e.detail.value!)}
                     onIonBlur={() => { handleEdit(item.id!); setEditInputValue('')}}
                     onClick={() => handleEditStatus(item.id!)}
                     autoGrow
                   ></IonTextarea>
                   <IonButton
                     onClick={() => {
                       setShowActionSheet(true);
                       handleActionsheet(item.id)

                     }}
                   >
                     <IonIcon icon="assets/icon/edit.svg"></IonIcon>
                   </IonButton>
                 </>
             </>
           ) : (
             <>
                 <>
                   <IonTextarea
                     autoGrow
                     value={item.text}
                     required
                     placeholder={item.text}
                     onClick={() => handleEditStatus(item.id!)}
                     className="line-through"
                   ></IonTextarea>
                   <IonButton
                     onClick={() => {
                       setShowActionSheet(true);
                       handleActionsheet(item.id)

                     }}
                   >
                     <IonIcon icon="assets/icon/edit.svg"></IonIcon>
                   </IonButton>
                 </>
             </>
           )}
         </IonItem>
        ))}
      </IonCard>
      <IonFooter>
        <IonToolbar >
        <Addtodo
          handleAddTodo={handleAddTodo}
          inputValue={inputValue}
          setInputvalue={setInputvalue}
          setShowKeyBoard ={setShowKeyboard}
        />
        </IonToolbar>
      </IonFooter>
     
      <IonActionSheet
        isOpen={showActionSheet}
        onDidDismiss={() => setShowActionSheet(false)}
        cssClass="action-sheet-class"
        buttons={[
          {
            text: "添加到计划",
            data: "Data value",
            handler: () => {
              handlePending(targetTodo);
            },
          },
          {
            text: "添加到处理中",
            data: 10,
            handler: () => {
              handleWorking(targetTodo);
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
