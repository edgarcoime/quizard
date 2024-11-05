import { Card , CardTitle, CardContent, CardFooter} from "@/components/ui/card";
import { Submission } from "@/types/Submission";

interface FeedbackPRops{
    feedbackArr : Submission [],
    index: number
}

export default function FeedbackCard({feedbackArr, index}: FeedbackPRops){
    const feedbackObj = feedbackArr[index]
    const unRounded_score = feedbackObj.score * 100
    const rounded_score = Math.round(unRounded_score)
    const raw_feedback = feedbackObj.feedback
    let formated_feedback = raw_feedback.split("\n")
    return(
        <>
            <Card className="w-full sm:w-auto bg-slate-300">
                <CardTitle className="ml-3 mt-5 mb-3"> Quizard Feedback </CardTitle>
                <CardContent className="overflow-y-auto h-48">
                            {formated_feedback.map((paragraph, index) =>{
                                return <p key ={index}>{paragraph}</p>
                            })}
                </CardContent>

                <CardFooter className="flex-row justify-end ">
                    Score: {rounded_score} %
                </CardFooter>
            </Card>
        </>
    )

}