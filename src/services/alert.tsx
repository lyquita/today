import { AlertButton, IonAlert } from "@ionic/react"
import { useState } from "react";


interface IProps {
    isOpen:boolean;
    message: string;
    buttons?: AlertButton[] 
}



export const Alert:React.FC<IProps> = ({message, isOpen, buttons}) => {

    const [showAlert, setShowAlert] = useState<boolean>(isOpen)

    return(
        <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        cssClass='alert-class'
        message= {message}
        buttons= {buttons}
      />
    )
}