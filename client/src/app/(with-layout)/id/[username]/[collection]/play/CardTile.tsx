"use client"
import { Card, CardTitle } from "@/components/ui/card"

//interface for props defining props
interface CardProps{
    question: string,
    answer: string,
    flippedArr: boolean[],
    setFlippedArr: Function,
    index: number
    id: string
}
//Flip the card and updates the state array on whether it is flipped
async function flipCard(index: number, isFlipped: boolean, flippedArr: boolean[], setFlipFun: Function){
    const newFlippedArr = [...flippedArr];
    newFlippedArr[index] = !newFlippedArr[index]; 
    setFlipFun(newFlippedArr);

    await new Promise((resolve) => setTimeout(resolve, 400));

    
}
// Card Tile component that returns the JSX for an individual card
export default function CardTile({question,answer,  flippedArr, setFlippedArr, index, id}: CardProps){
    let isFlipped = flippedArr[index]
    const content = isFlipped ? answer : question;

    const handleClick = async () => {
        await flipCard(index,isFlipped, flippedArr, setFlippedArr);
    };
   
    return(
        <>
            <Card   className={`w-full sm:w-auto p-8 bg-slate-300 flex flex-col justify-center items-center transition-transform duration-1000 `} 
                    style={{ 
                        perspective: "1000px", 
                        transformStyle: "preserve-3d", 
                        transform: isFlipped ? "rotateY(360deg)" : "rotateY(0deg)",
                        
                    }}
                    onClick={handleClick}> 
                <CardTitle className="text-center "> {content}</CardTitle>
            </Card>
        </>
    )
}