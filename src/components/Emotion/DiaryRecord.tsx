import { IonCol, IonIcon, IonItem, IonRow, IonText } from "@ionic/react";
import moment from "moment";
import { useContext } from "react";
import { AppContext } from "../../data/AppContext";
import { IEmotion } from "../../services/emotion";
import './diaryRecord.scss';


const DiaryRecords = () => {

const {state, dispatch} = useContext(AppContext)

const emotionList:IEmotion[] = state.emotion.emotionList;
emotionList.sort((a,b) => +new Date(a.date) - +new Date(b.date))


    return(
        <div id="diary-records">
            {
                emotionList.map(item=> (
                    <IonItem key={item.id} routerLink={`/create-emotion/${item.date}`}>
                    <IonRow>
                        <IonCol size="3">
                            <IonText>{moment(item.date).format('MM月DD日')}</IonText>
                        </IonCol>
                        <IonCol>
                            <IonIcon icon={`assets/icon/emotion/${item.emo}.svg`}></IonIcon>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonText>
                            <p>{item.text}</p>
                        </IonText>
                    </IonRow>
                </IonItem>
                ))
            }
     
        </div>
    )
}

export default DiaryRecords;