"use client";

import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/constants";
import { Submission } from "@/types/Submission";
import { useState } from "react";

interface BUttonProps{
    cardID: string, 
    answer: string,
    feedbackArr: Submission[],
    setFeedbackArr: Function
    index: number
}

export default function SubmitAnswerButton({cardID, answer, feedbackArr, setFeedbackArr, index}: BUttonProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState("")
  async function handleClick(e:any) {
    e.preventDefault()
    const url = `${API_BASE_URL}/submission`;

    if(!answer){
        setIsError("No answer provided must fill in before submitting!")
        return
    }
    setIsLoading(true)
    const res = await fetch(url, {
        method: 'PUT', 
        credentials: 'include', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({card_id: cardID, text_submission: answer})
    });

    if (!res.ok) {
      console.error("Failed to create submission", res.status, res.statusText);
      setIsLoading(false)
      return;
    }else{
        let data = await res.json()
        console.log("create submission response", data);
        setIsLoading(false)
        const newFeedbackArr = [...feedbackArr];
        newFeedbackArr[index] = data; 
        setFeedbackArr(newFeedbackArr);
    }


  }

  return (
    <>
    <Button type="submit"  disabled={isLoading} onClick={ (e) => handleClick(e)}>
       { !isLoading ? "Submit" : "Loading ..."}
    </Button>
    <p className="text-red-600 text-lg">{isError}</p>
    </>
  );
}