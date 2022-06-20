import {
  IonDatetime,
  IonFab,
  IonFabButton,
  IonFooter,
  IonIcon,
  IonMenuButton,
  IonToolbar,
} from "@ionic/react";
import { add } from "ionicons/icons";
import moment, { Moment } from "moment";
import { useContext, useEffect, useState } from "react";
import "./calendar.scss";
import buildCalendar from "./buildCalendar";
import Header from "./header";
import { useHistory } from "react-router";
import { AppContext } from "../../data/AppContext";
import { getEmotionList } from "../../services/emotion";

const CalendarComponent = ({ value, onChange }) => {
  const [calendar, setCalendar] = useState([]);
  const [emotionList, setEmotionList] = useState([]);
  const history = useHistory();
  const {state, dispatch} = useContext(AppContext);
  function isSelected(day, value) {
    return value.isSame(day, "day");
  }

  function afterToday(day) {
    return day.isAfter(new Date(), "day");
  }

  function isToday(day) {
    return day.isSame(new Date(), "day");
  }

  function dayStyles(day, value) {
    if (Array.isArray(emotionList)) {
      if (emotionList.find((x) => x.date === moment(day).format("yyyy-MM-DD")))
        return emotionList.find(
          (x) => x.date === moment(day).format("yyyy-MM-DD")
        ).emo;
    }
    if (afterToday(day)) return "after";
    if (isSelected(day, value)) return "selected";
    if (isToday(day)) return "today";
    return "";
  }

  function handleClick(value) {

    if (emotionList.find((x) => x.date === moment(value).format("yyyy-MM-DD")))
      return history.push({pathname: '/diary-list', state:{emotionList}});
    else {
      history.push({
        pathname: `/create-emotion/${value.clone().format("yyyy-MM-DD")}`,
      });
    }
  }

  useEffect(() => {
  if(state.emotion.emotionList){
    setEmotionList(state.emotion.emotionList)
  }else{
    getEmotionList().then(res => setEmotionList(res.data))
    .catch(err => console.log('err', err))
  }

    setCalendar(buildCalendar(value));
  }, []);

  return (
    <div className="calendar">
      <Header value={value} onChange={onChange} />
      <div className="body">
        {calendar.map((week) => (
          <div key={week}>
            {week.map((day) => (
              <div
                className="day"
                onClick={() => !afterToday(day) && onChange(day)}
              >
                <div
                  className={dayStyles(day, value)}
                  onClick={() => handleClick(day)}
                >
                  {day.format("D").toString()}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarComponent;
