import React from 'react';
import { ActionType } from '../../utils/types';

export const setUpdated = (isUpdated:boolean) => async(dispatch: React.Dispatch<any>) => {
    return({
        type: 'update-emo',
        isUpdated
    } as const )
}


export type EmotionActions = 
| ActionType<typeof setUpdated>
