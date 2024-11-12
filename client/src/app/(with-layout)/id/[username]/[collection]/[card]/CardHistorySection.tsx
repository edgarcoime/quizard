import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Submission } from "@/types/Submission";
import { ScrollArea } from "@/components/ui/scroll-area"

interface HistoryProps{
    previousSubmissions: Submission[]
}

function FeedbackAccordian(props : {title:string, feedback:string}){
    const {title, feedback} = props

    let formated_feedback = feedback.split("\n")
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="Details">
                <AccordionTrigger className="sticky top-0 ">{title}</AccordionTrigger>
                <AccordionContent>
                    <ScrollArea className="max-h-64 overflow-y-auto p-2">
                    {formated_feedback.map((paragraph, index) =>{
                                return <p key ={index}>{paragraph}</p>
                            })}
                    </ScrollArea>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}



function SubmissionTile(props : { answer: string,feedback: string, score: number} ){
    const { answer, feedback, score} = props
    const unrounded_score = score * 100
    const rounded_score = Math.round(unrounded_score)
    return(
    <Card  className="sm:w-auto p-8 bg-slate-300 m-4">
        <div className="flex justify-between">
            <div>Answer: {answer} </div>
            <div>Score: {rounded_score}</div>
        </div>
        <CardContent >
        <FeedbackAccordian title="Feedback" feedback={feedback}></FeedbackAccordian>
        </CardContent>
    </Card>
    )
}


export default function HistorySection({previousSubmissions} : HistoryProps){
        return(
            <>
            <h1 className="flex flex-row justify-center m-5 text-3xl font-bold"> History</h1> 
                {previousSubmissions && previousSubmissions.map((submission: Submission, idx:number) => (
                    <SubmissionTile key={idx} answer={submission.text_submission} 
                    feedback={submission.feedback} score={submission.score}
                    /> 
                ))}
            </>
        )
}