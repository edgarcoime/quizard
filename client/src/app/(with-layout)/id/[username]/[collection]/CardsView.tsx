import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { fetchCards } from "@/lib/api/collectionCards";
import Link from "next/link";
// import { cards } from "@/lib/samples/data";


function CardTile(props: {
  username: string;
  collectionSlug: string;
  cardSlug: string;
  question: string;
  answer: string;
}) {
  const { username, collectionSlug, cardSlug, question, answer } = props;
  console.log("-------- card-slug: " + cardSlug)
  return (
    <Link href={`/id/${username}/${collectionSlug}/${cardSlug}`}>
      <Card
        key={cardSlug}
        className="w-full sm:w-auto p-8 bg-slate-300"
      >
        <CardTitle className="text-center">{question}</CardTitle>
        <CardContent className="text-center">{answer}</CardContent>
      </Card>
    </Link>
  );
}

export default async function CardsView({ username,collectionSlug,cards}: {  username: string;collectionSlug: string, cards: any}) {
  // const selectedCollection = cards.find(
  //   (col) => col.collectionName.toLowerCase() === collectionId.toLowerCase(),
  // );
  console.log("---------------collection slug:" + collectionSlug)
  // const data = await fetchCards(collectionId)

  // const cards: any = data;

  // console.log("--------------cards: ")
  // console.log(cards)
  console.log(cards)
  return (
    <>
      {cards && cards.map((card: any, idx: number) => (
        <CardTile
          cardSlug={(card.id).toString()}
          key={String(idx)}
          username={username}
          collectionSlug={collectionSlug}
          question={card.question}
          answer={card.answer}
        />
      ))}
    </>
  );
}
