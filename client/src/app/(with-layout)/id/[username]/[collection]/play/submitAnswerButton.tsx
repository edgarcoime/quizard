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
    const [Error, setError] = useState("")
  async function handleClick(e:any) {
    e.preventDefault()
    const url = `${API_BASE_URL}/submission`;

    if(!answer){
        setError("No answer provided can't be blank!")
        return
    }else{
      setError("")
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
    <div className="flex flex-col items-center">
    
      <p className="text-red-600 text-lg mt-2">
          {Error}
      </p>
      
        <Button className="text-lg mt-4" type="submit"  disabled={isLoading}  onClick={(e) => handleClick(e)}
        >
          {!isLoading ? "Submit" : "Loading ..."}
        </Button>
    </div>

    </>
  );
}