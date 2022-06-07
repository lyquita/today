import {
  IonButton,
  IonCard,
  IonCol,
  IonIcon,
  IonItem,
  IonList,
  IonRow,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonText,
  IonTitle,
} from "@ionic/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { getTodolistByMonth, ITodo } from "../../services/todolist";
import "./monthlyTodoContent.scss";

interface IProps{
  month: string,
  date: string
}


const MonthlyTodoContent:React.FC<IProps> = ({month, date}) => {
  interface IMonthIterm {
    created_date: string;
    data: ITodo[];
  }

  const [listData, setListData] = useState<IMonthIterm[]>([]);
  const [firstWeek, setFirstWeek] = useState<boolean>(false);
  const [secondWeek, setSecondWeek] = useState<boolean>(false);
  const [thirdWeek, setThirdWeek] = useState<boolean>(false);
  const [forthWeek, setForthWeek] = useState<boolean>(false);
  const [firstWeekList, setFirstWeekList] = useState<IMonthIterm[]>([]);
  const [secondWeekList, setSecondWeekList] = useState<IMonthIterm[]>([]);
  const [thirdWeekList, setThirdWeekList] = useState<IMonthIterm[]>([]);
  const [forthWeekList, setForthWeekList] = useState<IMonthIterm[]>([]);

  const today = moment().format('DD')

  useEffect(() => {
    getTodolistByMonth(month)
      .then((res) => {
        let expectedData = [];
        let firstWeekArr = [];
        let secondWeekArr = [];
        let thirdWeekArr = [];
        let forthWeekArr = [];
        let temArr = [];
        const data = res.data;

        for (let i = 0; i < data.length; i++) {
          if (temArr.indexOf(data[i]["created_date"]) === -1) {
            expectedData.push({
              created_date: data[i]["created_date"],
              data: [data[i]],
            });
            temArr.push(data[i]["created_date"]);
     
    
             
          } else {
            for (let j = 0; j < expectedData.length; j++) {
              if (expectedData[j]["created_date"] === data[i]["created_date"]) {
                expectedData[j].data.push(data[i]);
              }
            }
          }
        }


        // sort list by date
        expectedData.sort((a,b) => +new Date(a.created_date) - +new Date(b.created_date))
        console.log('exo', expectedData);
    

        for( let m = 0; m < expectedData.length; m++){

          if (parseInt(moment(expectedData[m]["created_date"]).format("DD")) <= 7) {
                      firstWeekArr.push(expectedData[m]);
                    } else if (
                      7 < parseInt(moment(expectedData[m]["created_date"]).format("DD")) &&
                      parseInt(moment(expectedData[m]["created_date"]).format("DD")) <= 14
                    ) {
                      secondWeekArr.push(expectedData[m]);
                    } else if (
                      14 < parseInt(moment(expectedData[m]["created_date"]).format("DD")) &&
                      parseInt(moment(expectedData[m]["created_date"]).format("DD")) <= 21
                    ) {
                      thirdWeekArr.push(expectedData[m]);
                    } else{
                      forthWeekArr.push(expectedData[m])
                    }
        }

        setFirstWeekList(firstWeekArr);
        setSecondWeekList(secondWeekArr);
        setThirdWeekList(thirdWeekArr);
        setForthWeekList(forthWeekArr);
        console.log('first', firstWeekArr, secondWeekArr);
        
        if(parseInt(today) <= 7){
          setListData(firstWeekArr)
          setFirstWeek(true)
        }else if(7 < parseInt(today) && parseInt(today) <= 14){
          setListData(secondWeekArr)
          setSecondWeek(true)
        }else if(14< parseInt(today) && parseInt(today) <= 21){
          setListData(thirdWeekArr)
          setThirdWeek(true)
        }else{
          setListData(forthWeekArr)
          setForthWeek(true)
        }
      })
      .catch((err) => console.log(err));
  }, [month]);

  // useEffect(() => {
  //   getTodolistByMonth(currentMonth)
  //     .then((res) => {
  //       let firstWeekList = [];
  //       let secondWeekList = [];
  //       let thirdWeekList = [];
  //       let forthWeekList = [];
  //       let tmpArr = [];
  //       const data = res.data;
  //       for (let i = 0; i < data.length; i++) {
  //         if (parseInt(moment(data[i]["created_date"]).format("DD")) <= 7) {
  //           firstWeekList.push(data[i]);
  //         } else if (
  //           7 < parseInt(moment(data[i]["created_date"]).format("DD")) &&
  //           parseInt(moment(data[i]["created_date"]).format("DD")) <= 14
  //         ) {
  //           secondWeekList.push(data[i]);
  //         } else if (
  //           14 < parseInt(moment(data[i]["created_date"]).format("DD")) &&
  //           parseInt(moment(data[i]["created_date"]).format("DD")) <= 21
  //         ) {
  //           thirdWeekList.push(data[i]);
  //         } else{
  //           forthWeekList.push(data[i])
  //         }
  //       }
  //       console.log(firstWeekList);
        

  //     })
  //     .catch((err) => console.log(err + "got error when get todolistByMonth"));
  // }, []);

  return (
    <div id="monthly-todo-content">
      <IonRow>
        <IonCol size="6">
          <IonButton
            className={firstWeek ? "clicked" : ""}
            onClick={() => {setFirstWeek(true); setListData(firstWeekList)}}
            onIonBlur={() => setFirstWeek(false)}
          >
            第一个星期
          </IonButton>
        </IonCol>
        <IonCol size="6">
          <IonButton
            className={secondWeek ? "clicked" : ""}
            onClick={() => {setSecondWeek(true); setListData(secondWeekList)}}
            onIonBlur={() => setSecondWeek(false)}
          >
            第二个星期
          </IonButton>
        </IonCol>
        <IonCol size="6">
          <IonButton
            className={thirdWeek ? "clicked" : ""}
            onClick={() => {setThirdWeek(true); setListData(thirdWeekList)}}
            onIonBlur={() => setThirdWeek(false)}
          >
            第三个星期
          </IonButton>
        </IonCol>
        <IonCol size="6">
          <IonButton
            className={forthWeek ? "clicked" : ""}
            onClick={() => {setForthWeek(true); setListData(forthWeekList)}}
            onIonBlur={() => setForthWeek(false)}
          >
            第四个星期
          </IonButton>
        </IonCol>
      </IonRow>
      {listData.map((item) => (
        <IonCard
          routerLink={`/todo/${item.created_date}`}
          key={item.created_date}
        >
          <IonList>
            <IonText>{moment(item.created_date).format("dd, DD")}</IonText>
            {item.data.map((x) => (
              <IonItem lines="none" key={x.id}>
                {x.text}
              </IonItem>
            ))}
          </IonList>
          {/* <IonIcon icon='assets/img/emoji4.svg'></IonIcon> */}
        </IonCard>
      ))}
    </div>
  );
};

export default MonthlyTodoContent;
