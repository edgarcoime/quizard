import { IoChevronBackSharp } from "react-icons/io5";
//defines props
interface prevBtnProps{
    index : number,
    setIndexFun: Function

}
// previous button to go to previous card returns the JsX if not on first question
export default function PrevCardButton({index, setIndexFun} : prevBtnProps){
    return(
        <>
           { index != 0 && <IoChevronBackSharp className="text-5xl" onClick={() =>{ setIndexFun(index - 1)}} /> }
        </>
    )

}