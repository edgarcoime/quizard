"use client"

import { cards } from "@/lib/samples/data";
import { useState } from "react";
import CardTile from "./CardTile";
import NextCardButton from "./NextCardButton";
import PrevCardButton from "./prevCardButton";
import AnswerForm from "./AnswerForm";
import FeedbackCard from "./FeedbackCard";

interface PlayProps{
    params: { username: string; collection: string }
}



export default function PlayPage({params}: PlayProps){
    const [index, setIndex] = useState(0);

    const { username, collection: collectionId } = params;
    const decodedCollectionId = decodeURIComponent(collectionId);
    const selectedCollection = cards.find(
        (col) => col.collectionName.toLowerCase() === decodedCollectionId.toLowerCase(),
    );
    let card_question = selectedCollection?.cards[index].question
    let card_answer = selectedCollection?.cards[index].answer
    let total_num_of_cards = selectedCollection?.cards.length
    const [flippedArr, setFlippedArr] = useState(Array(total_num_of_cards).fill(false))
    const [answesArr, setAnswerArr] = useState(Array(total_num_of_cards).fill(""))
    return(
        <>
            {/* Show question number */}
            <h1 className="text-center">Question {index+1} of {total_num_of_cards}</h1> 

            {/* Card tile with question */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 p-4">
                {card_question && card_answer && <CardTile key={index} question={card_question} answer={card_answer} flippedArr={flippedArr} setFlippedArr={setFlippedArr} index={index}></CardTile> }
            </div>

            {/* Answer form where user submits answer*/}
            <div className=" flex flex-col justify-center items-center sm:flex-row gap-4 p-4">
            <h1>Answer:</h1>
                <AnswerForm key={index} answerArr = {answesArr} setAnswerArr ={setAnswerArr} index={index}></AnswerForm>
            </div>
            
            {/* Feedback Card for response from AI */}
            <div className=" flex flex-col justify-center items-center sm:flex-row gap-4 p-4">
                <FeedbackCard></FeedbackCard>
            </div>

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