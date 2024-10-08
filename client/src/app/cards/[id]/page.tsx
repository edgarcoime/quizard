import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"


// interface collectionsParams{
//     title: String
// }

function create_card(id: number, question: String, answer: String){
    return (
    <>
    <Card key={id} className="m-8 p-8 bg-slate-300 w-[350px]"> 
            <CardTitle className=" flex flex-row justify-center mb-5">{question}</CardTitle> 
            <CardContent className=" flex flex-row justify-center ">{answer}</CardContent> 
    </Card>
    </>
    )
}

export default function CardsPage({ params }: { params: {id: number }}){
    const heading = "Cards"
    const sampleCards = [
        {Id:1, cards: [{question: "What is coupling?",answer: "When one class is too dependent on another class"},
            {question: "What is a class diagram?",answer: "Diagram that shows the relationships between classes"},
            {question: "Wh is a sequence diagram unique?",answer: "Show the time flow of a program"}
         ]}, 
        {Id: 2, cards: [{question: "What does a derivative represent?", answer: "The slope of the original graph"}]}
        ,{Id: 3, cards:[{question: "What does SMP stand for?", answer: "Symmetric multi processing"}]}, {Id: 4, cards: [{question: "What does a firewall do?", answer:"It helps block and monitor incoming and outgoing traffic"}]}
    ]

    let list_of_cards: any = []
    sampleCards.map( (cardcollection) => { 
        if (cardcollection.Id == Number(params.id)){
            cardcollection.cards.map( (card:any, index) =>
                list_of_cards.push(create_card(index, card.question,card.answer))
            )
            
        }

    }) 

    return(
    <>

    <h1 className="flex flex-row justify-center m-5 text-5xl ">{heading}</h1>

    <div className="flex flex-col justify-center">
        {list_of_cards}
    </div>
    </>
    ) 


}