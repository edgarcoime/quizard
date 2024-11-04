import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { fetchCards } from "@/lib/api/collectionCards";
import Link from "next/link";
// import { cards } from "@/lib/samples/data";


function CardTile(props: {
  username: string;
  collectionId: string;
  id: number;
  question: string;
  answer: string;
}) {
  const { username, collectionId, id, question, answer } = props;

  return (
    <Link href={`/id/${username}/${collectionId}/${id.toString()}`}>
      <Card
        key={id}
        className="w-full sm:w-auto p-8 bg-slate-300"
      >
        <CardTitle className="text-center">{question}</CardTitle>
        <CardContent className="text-center">{answer}</CardContent>
      </Card>
    </Link>
  );
}

export default async function CardsView({ username,collectionId,cards}: {  username: string;collectionId: string, cards: any}) {
  // const selectedCollection = cards.find(
  //   (col) => col.collectionName.toLowerCase() === collectionId.toLowerCase(),
  // );
  console.log("collection id:" + collectionId)
  // const data = await fetchCards(collectionId)

  // const cards: any = data;

  // console.log("--------------cards: ")
  // console.log(cards)

  return (
    <>
      {cards && cards.map((card: any, idx: number) => (
        <CardTile
          id={card.id}
          key={String(idx)}
          username={username}
          collectionId={collectionId}
          question={card.question}
          answer={card.answer}
        />
      ))}
    </>
  );
}
