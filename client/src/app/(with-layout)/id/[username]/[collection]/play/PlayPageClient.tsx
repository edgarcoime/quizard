"use client"


import { useState } from "react";
import CardTile from "./CardTile";
import NextCardButton from "./NextCardButton";
import PrevCardButton from "./prevCardButton";
import AnswerForm from "./AnswerForm";
import FeedbackCard from "./FeedbackCard";
import useCardData from "@/components/hooks/useCardData";

interface PlayProps{
   cards: any
}



export function PlayPageClient({cards}: PlayProps){
    const [index, setIndex] = useState(0);
    
    const { data, isLoading, isError } = useCardData(cards[index].id);
    let card_question = cards[index].question
    let card_answer = ""
    if(data){
        card_answer = data.answers[0]?.answer
    }


    let total_num_of_cards = cards.length
    console.log("--------card details")
    console.log(card_question)
    console.log(card_answer)
    const [flippedArr, setFlippedArr] = useState(Array(total_num_of_cards).fill(false))
    const [answesArr, setAnswerArr] = useState(Array(total_num_of_cards).fill(""))
    const [feedbackArr, setfeedbackArr] = useState(Array(total_num_of_cards).fill(""))
    return(
        <>
            {/* Show question number */}
            <h1 className="text-center">Question {index+1} of {total_num_of_cards}</h1> 

            {/* Card tile with question */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 p-4">
                {card_question && <CardTile key={cards[index].id} id={cards[index].id} question={card_question} answer={card_answer} flippedArr={flippedArr} setFlippedArr={setFlippedArr} index={index}></CardTile> }
            </div>

            {/* Answer form where user submits answer*/}
            <div className=" flex flex-col justify-center items-center sm:flex-row gap-4 p-4">
            <h1>Answer:</h1>
                <AnswerForm key={index} answerArr = {answesArr} setAnswerArr ={setAnswerArr} index={index} cardID={cards[index].id} feedbackArr = {feedbackArr} setFeedbackArr = {setfeedbackArr}></AnswerForm>
            </div>
            
            {/* Feedback Card for response from AI */}
            {feedbackArr[index] && <div className=" flex flex-col justify-center items-center sm:flex-row gap-4 p-4">
                <FeedbackCard  feedbackArr = {feedbackArr} index={index}></FeedbackCard>
            </div>}

            {/* Next and previous buttons */}
            <div className="flex flex-row justify-between mb-5">
                <div className="m-5">
                    <PrevCardButton  index={index} setIndexFun={setIndex} ></PrevCardButton>
                </div>

                <div className="m-5">
                    {total_num_of_cards && <NextCardButton index={index} setIndexFun={setIndex} num_of_cards = {total_num_of_cards}></NextCardButton> }
                </div>
            </div>
            
        </>
    )
}