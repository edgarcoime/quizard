import { IoChevronForwardSharp } from "react-icons/io5";
// defines props
interface NextBtnProps{
    index : number,
    setIndexFun: Function
    num_of_cards: number
}
// Next button to go to next card returns the JsX if not on last question
export default function NextCardButton({index, setIndexFun, num_of_cards} : NextBtnProps){
    return(
        <>
           { (index+1) != num_of_cards && <IoChevronForwardSharp className="text-5xl" onClick={() =>{ setIndexFun(index+1)}}/> }
        </>
    )

}