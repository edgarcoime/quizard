import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { cards } from "@/lib/samples/data";

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
        className="w-full sm:w-auto p-8 bg-slate-300 flex flex-col justify-center items-center"
      >
        <CardTitle className="text-center">{question}</CardTitle>
        <CardContent className="text-center">{answer}</CardContent>
      </Card>
    </Link>
  );
}

export default function CardsView({
  username,
  collectionId,
}: {
  username: string;
  collectionId: string;
}) {
  const selectedCollection = cards.find(
    (col) => col.collectionName.toLowerCase() === collectionId.toLowerCase(),
  );

  return (
    <>
      {selectedCollection?.cards.map((card, idx) => (
        <CardTile
          id={idx}
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
