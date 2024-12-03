
// Import necessary dependencies and components
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import SubmitAnswerButton from "./submitAnswerButton";
import { Submission } from "@/types/Submission";

// Interface defining the props for the AnswerForm component
interface AnserFormProps{
    answerArr: string[],
    setAnswerArr: Function,
    index: number,
    cardID:string,
    feedbackArr: Submission[],
    setFeedbackArr: Function
}
// Function to handle updating the answer array
function setAnswer(value: string, answerArr: string[], setAnswerArr:Function, index:number){
    const newAnswerArr = [...answerArr];
    newAnswerArr[index] = value; 
    setAnswerArr(newAnswerArr);

}
// Anser form componenent that returns the JSX element for the form
export default function AnswerForm({answerArr, setAnswerArr, index, cardID, feedbackArr, setFeedbackArr}: AnserFormProps){
    console.log("typed answer: " + answerArr[index])
    
    return(
        <>

        <form>
            <div className="flex justify-center">
            <input className="p-2 rounded-sm" type="text" placeholder="Answer"  value={answerArr[index]} onChange={(e) => {setAnswer(e.target.value, answerArr, setAnswerArr, index) }}/>
            </div>
            <SubmitAnswerButton  cardID={cardID} answer={answerArr[index]} feedbackArr={feedbackArr} setFeedbackArr={setFeedbackArr} index={index}/>
        </form>

        </>
    )

}