import axios from "axios"
import moment from "moment"
import { useState } from "react"
import { getEmotionList } from "../../services/emotion"

//  emotionList = await getEmotionList()

let emotionList = [{
    date: '2022-06-05',
    emo: 'sad'
  },
    {
      date: '2022-06-01',
      emo: 'happy'
    }
  ]


function isSelected(day,value){
    return value.isSame(day, 'day')
  }

export function afterToday(day){
    return day.isAfter(new Date(), 'day')
  }


  function isToday(day){
    return day.isSame(new Date(), 'day')
  }


  export default function dayStyles(day, value){

    if(emotionList.find(x=> x.date === moment(day).format('yyyy-MM-DD'))) return emotionList.find(x=> x.date === moment(day).format('yyyy-MM-DD')).emo
    if(afterToday(day)) return 'after'
    if((isSelected(day,value))) return 'selected'
    if(isToday(day)) return 'today'
    return ''
  }