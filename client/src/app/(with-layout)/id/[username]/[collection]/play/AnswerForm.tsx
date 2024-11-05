

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import SubmitAnswerButton from "./submitAnswerButton";
import { Submission } from "@/types/Submission";

interface AnserFormProps{
    answerArr: string[],
    setAnswerArr: Function,
    index: number,
    cardID:string,
    feedbackArr: Submission[],
    setFeedbackArr: Function
}

function setAnswer(value: string, answerArr: string[], setAnswerArr:Function, index:number){
    const newAnswerArr = [...answerArr];
    newAnswerArr[index] = value; 
    setAnswerArr(newAnswerArr);

}

export default function AnswerForm({answerArr, setAnswerArr, index, cardID, feedbackArr, setFeedbackArr}: AnserFormProps){
    console.log("typed answer: " + answerArr[index])
    
    return(
        <>
        <form>
            <input type="text" placeholder="Answer"  value={answerArr[index]} onChange={(e) => {setAnswer(e.target.value, answerArr, setAnswerArr, index) }}/>
        
            <SubmitAnswerButton  cardID={cardID} answer={answerArr[index]} feedbackArr={feedbackArr} setFeedbackArr={setFeedbackArr} index={index}/>
        </form>
        </>
    )

}