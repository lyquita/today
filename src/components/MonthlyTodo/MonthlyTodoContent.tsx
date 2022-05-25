import { IonCard, IonCol, IonIcon, IonItem, IonList, IonRow, IonText, IonTitle } from '@ionic/react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { getTodolistByMonth, ITodo } from '../../services/todolist';
import './monthlyTodoContent.scss';



const MonthlyTodoContent = () => {

    interface IMonthIterm {
        created_date: string;
        data: ITodo[];
      }

    const [listData, setListData] = useState<IMonthIterm[]>([]);
    

    const currentMonth = moment().format("MM")

    useEffect(()=>{
        getTodolistByMonth(currentMonth).then(res => {

            let expectedData = [];
            let temArr = [];
            const data = res.data
          
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
            setListData(expectedData);
            
        })
        .catch(err => console.log(err)
        ) 

    },[])


    return(
        <div id="monthly-todo-content">
            {
                listData.map(item=> 
                    (
                        <IonCard routerLink={`/todo/${item.created_date}`} key={item.created_date}>
                            <IonList>
                            <IonText>{item.created_date}</IonText>
                            {
                                item.data.map(x=>(
                                    <IonItem lines='none' key={x.id}>
                                    🌸{x.text}
                                    </IonItem>
                                ))
                            }
                            </IonList>
                            <IonIcon icon='assets/img/emoji4.svg'></IonIcon>
                        </IonCard>
                )
                )
            }
        </div>
    )
}

export default MonthlyTodoContent;