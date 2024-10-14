import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AnserFormProps{
    answerArr: string[],
    setAnswerArr: Function,
    index: number
}

function setAnswer(value: string, answerArr: string[], setAmswerArr:Function, index:number){
    const newAnswerArr = [...answerArr];
    newAnswerArr[index] = value; 
    setAmswerArr(newAnswerArr);
}

export default function AnswerForm({answerArr, setAnswerArr, index}: AnserFormProps){
    // const [answer, setAnswer] = useState('');
    return(
        <>
        <form>
            <input type="text" placeholder="Answer"  value={answerArr[index]} onChange={(e) => {setAnswer(e.target.value, answerArr, setAnswerArr, index)}}/>
        </form>

        <Button  type="submit" > Submit </Button>
        </>
    )

}