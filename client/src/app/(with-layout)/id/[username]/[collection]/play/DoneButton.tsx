import { Button } from "@/components/ui/button";
import Link from "next/link";
//interface for props, defining props
interface ButtonProps{
    index:number
    num_of_cards: number
    username: string
    colslug:string
}
// Done button component that returns the JSX for the button
export default function  DoneButton({index, num_of_cards, username, colslug}: ButtonProps){
    return(<>
    { (index+1) == num_of_cards && 
    <Link href={`/id/${username}/${colslug}`}>
        <Button className="text-2xl bg-slate-600">Done</Button> 
    </Link>
    }
    </>)
}