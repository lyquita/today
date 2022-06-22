import { IonButton, IonCol, IonIcon, IonRow } from "@ionic/react";
import { emotionGroup } from "../../services/emotion";
import "./emotionSelection.scss";

interface IProps {
  handleClick: (value: string, url:string) => void;
  selectedMood: string | null;
  setSelectedMood: (value:string ) => void;
}

const EmotionSelection: React.FC<IProps> = ({ handleClick, selectedMood , setSelectedMood}) => {
  
  return (
    <>
      <div id="emotion-selection">
        {selectedMood ? (
          <IonIcon icon={selectedMood} onClick={()=> setSelectedMood('')}></IonIcon>
        ) : (
          <IonRow>
            {emotionGroup.map((item) => (
              <IonCol key={item.name}>
                <IonButton onClick={() => handleClick(item.name, item.url)}>
                  <IonIcon icon={item.url}></IonIcon>
                </IonButton>
              </IonCol>
            ))}
          </IonRow>
        )}
      </div>
    </>
  );
};

export default EmotionSelection;
