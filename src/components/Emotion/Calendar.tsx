import { IonDatetime, IonFab, IonFabButton, IonFooter, IonIcon, IonMenuButton, IonToolbar } from "@ionic/react";
import { add } from "ionicons/icons";
import { useState } from "react";
import Calendar from 'react-calendar';
import './calendar.scss';

const CalendarComponent = () => {
    const [value, setValue] = useState(new Date());

    function onChange(nextValue:any) {
      setValue(nextValue);
    }

    return(
        <>
        <Calendar showWeekNumbers={false} 
          onChange={onChange}
          value={value}
          activeStartDate={new Date()}
          showNeighboringMonth= {false}
        />
        </>
    )
}

export default CalendarComponent;