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
import { useEffect, useState } from "react";
import "./calendar.scss";
import buildCalendar from "./buildCalendar";
import Header from "./header";



const CalendarComponent = ({value, onChange, emotionList}) => {
  const [calendar, setCalendar] = useState([]);

function isSelected(day,value){
    return value.isSame(day, 'day')
  }

function afterToday(day){
    return day.isAfter(new Date(), 'day')
  }


  function isToday(day){
    return day.isSame(new Date(), 'day')
  }

  function dayStyles(day, value){
    if(Array.isArray(emotionList)){
      if(emotionList.find(x=> x.date === moment(day).format('yyyy-MM-DD'))) return emotionList.find(x=> x.date === moment(day).format('yyyy-MM-DD')).emo
    }
    if(afterToday(day)) return 'after'
    if((isSelected(day,value))) return 'selected'
    if(isToday(day)) return 'today'
    return ''
  }

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);


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
                <div className={dayStyles(day, value)}>
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
