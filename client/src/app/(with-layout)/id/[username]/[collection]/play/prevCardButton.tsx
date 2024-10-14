import { IoChevronBackSharp } from "react-icons/io5";

interface prevBtnProps{
    index : number,
    setIndexFun: Function

}

export default function PrevCardButton({index, setIndexFun} : prevBtnProps){
    return(
        <>
           { index != 0 && <IoChevronBackSharp className="text-3xl" onClick={() =>{ setIndexFun(index - 1)}} /> }
        </>
    )

}