import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SettingsButton from "@/components/ui/settingsButton";

export default function Page({
  params,
}: {
  params: { username: string; collection: string; card: string };
}) {
  const { username, collection, card } = params;

  const decodedCollectionId = decodeURIComponent(collection);

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
      cardcollection.cards.map((card_in_list: any, index) => {
        if (index == Number(card)) {
          list_of_cards.push(
            create_card(card_in_list.question, card_in_list.answer),
          );
        }
      });
    }
  });

  const settingsRoute = `/id/${username}/${collection}/${card}/settings`;

  return (
    <>
      <div className="flex justify-end p-4">
        <SettingsButton desc="Card Settings" routeRedirect={settingsRoute} />
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-4 p-4">
        {list_of_cards}
      </div>
    </>
  );
}

function create_card(question: String, answer: String) {
  return (
    <>
      <Card className="w-full sm:w-auto max-w-2xl p-12 bg-slate-300 flex flex-col justify-center items-center shadow-lg">
        <CardTitle className="text-center text-3xl font-bold">
          {question}
        </CardTitle>
        <CardContent className="text-center text-xl mt-4">{answer}</CardContent>
      </Card>
    </>
  );
}
