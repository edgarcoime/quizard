import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Page({
  params,
}: {
  params: { username: string; collection: string };
}) {
  const { username, collection: collectionId } = params;
  const decodedCollectionId = decodeURIComponent(collectionId)
  const title = `Collection: ${decodedCollectionId}`;
  const heading = "Cards";

  const sampleCards = [
    {
      Id: 1,
      collectionName: "Software Engineering",
      cards: [
        {
          question: "What is coupling?",
          answer: "When one class is too dependent on another class",
        },
        {
          question: "What is a class diagram?",
          answer: "Diagram that shows the relationships between classes",
        },
        {
          question: "Why is a sequence diagram unique?",
          answer: "Show the time flow of a program",
        },
      ],
    },
    {
      Id: 2,
      collectionName: "Calculus",
      cards: [
        {
          question: "What does a derivative represent?",
          answer: "The slope of the original graph",
        },
      ],
    },
    {
      Id: 3,
      collectionName: "Operating Systems",
      cards: [
        {
          question: "What does SMP stand for?",
          answer: "Symmetric multi processing",
        },
      ],
    },
    {
      Id: 4,
      collectionName: "Network Security",
      cards: [
        {
          question: "What does a firewall do?",
          answer: "It helps block and monitor incoming and outgoing traffic",
        },
      ],
    },
  ];

  let list_of_cards: any = [];
  sampleCards.map((cardcollection) => {
    if (cardcollection.collectionName == decodedCollectionId) {
      cardcollection.cards.map((card: any, index) =>
        list_of_cards.push(create_card(username, collectionId, index, card.question, card.answer)),
      );
    }
  });

  return (
    <>
    <div className="flex justify-between items-start p-4">
      <h1>Specific Collection page shows all the cards in collections </h1>
      <Button className=" p-4 bg-slate-300" variant="outline"> Settings </Button>
      </div>
      <h1 className="flex flex-row justify-center m-5 text-5xl">{title}</h1>
      <div className="flex flex-col sm:flex-row justify-center gap-4 p-4">{list_of_cards}</div>
    </>
  );
}

function create_card(username: String, collectionId:String, id: number, question: String, answer: String) {
  return (
    <>
      <Link href={`/id/${username}/${collectionId}/${id.toString()}`}>
      <Card key={id} className="w-full sm:w-auto p-8 bg-slate-300 flex flex-col justify-center items-center">
        <CardTitle className="text-center">
          {question}
        </CardTitle>
        <CardContent className="text-center">
          {answer}
        </CardContent>
      </Card>
      </Link>
    </>
  );
}
