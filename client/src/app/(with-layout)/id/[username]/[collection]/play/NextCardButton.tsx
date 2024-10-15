import { IoChevronForwardSharp } from "react-icons/io5";

interface NextBtnProps{
    index : number,
    setIndexFun: Function
    num_of_cards: number
}

export default function NextCardButton({index, setIndexFun, num_of_cards} : NextBtnProps){
    return(
        <>
           { (index+1) != num_of_cards && <IoChevronForwardSharp className="text-3xl" onClick={() =>{ setIndexFun(index+1)}}/> }
        </>
    )

}