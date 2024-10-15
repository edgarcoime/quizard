import { Card, CardTitle } from "@/components/ui/card"
import { useState } from "react"

interface CardProps{
    question: string,
    answer: string,
    flippedArr: boolean[],
    setFlippedArr: Function,
    index: number
}

function flipCard(index: number, flippedArr: boolean[], setFlipFun: Function){
    const newFlippedArr = [...flippedArr];
    newFlippedArr[index] = !newFlippedArr[index]; 
    setFlipFun(newFlippedArr);
}

export default function CardTile({question, answer, flippedArr, setFlippedArr, index}: CardProps){
    let isFlipped = flippedArr[index]
    let content = ""
    {isFlipped ? content = answer : content = question}
    return(
        <>
            <Card className="w-full sm:w-auto p-8 bg-slate-300 flex flex-col justify-center items-center" onClick={ () => {flipCard(index, flippedArr, setFlippedArr)}}> 
                <CardTitle className="text-center">{content}</CardTitle>
            </Card>
        </>
    )
}