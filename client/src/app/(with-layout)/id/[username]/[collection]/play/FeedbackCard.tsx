import { Card , CardTitle, CardContent, CardFooter} from "@/components/ui/card";

export default function FeedbackCard(){
    return(
        <>
            <Card className="w-full sm:w-auto bg-slate-300">
                <CardTitle className="ml-3 mt-5 mb-3"> Quizard Feedback </CardTitle>
                <CardContent>
                    Ai feedback on ways to improve answer and how close it was!
                </CardContent>

                <CardFooter className="flex-row justify-end ">
                    Score: 80%
                </CardFooter>
            </Card>
        </>
    )

}