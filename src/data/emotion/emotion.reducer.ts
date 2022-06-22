import { EmotionActions } from "./emotion.action";
import { EmotionState } from "./emotion.state";


export function useEmoReducer(state: EmotionState, action:EmotionActions){

    switch (action.type) {
        case 'update-emo':
            return {...state, isUpdated: action.isUpdated}
    }

}