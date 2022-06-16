import { IonText, IonTextarea } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import './diary.scss';

interface IProps{
    setAutoFocus: (value: boolean) => void;
    autoFocus: boolean;
    userInput: string;
    setUserInput: (value: string) => void;
}

const Diary:React.FC<IProps> =({autoFocus, setAutoFocus, userInput, setUserInput}) => {
    const [focus, setFocus] = useState<boolean>(autoFocus)
    const textareaRef = useRef<HTMLIonTextareaElement>(null)
    

    
    useEffect(()=>{
        setFocus(autoFocus)
        console.log(textareaRef.current?.setFocus())
    }, [autoFocus])

    return(
        <div id="diary-textarea">
            <IonText>
                <p>写点什么东西吧...</p>
            </IonText>
            <IonTextarea ref={textareaRef}  autofocus={focus} autoGrow value={userInput} onIonChange={e=> setUserInput(e.detail.value!) }/>
        </div>
    )
}

export default Diary;