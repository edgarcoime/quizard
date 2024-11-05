import FloatingResourceButtons from "@/components/partials/FloatingResourceButtons";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import fetchCard from "@/lib/api/cardInfo";
import { Cog } from "lucide-react";

// TODO: refactor and add fetch logic to ensure this resource is the users
async function validateOwner(): Promise<boolean> {
  return true;
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

export default async function Page({
  params,
}: {
  params: { username: string; collection: string; card: string };
}) {
  const { username, collection, card } = params;
  const settingsUrl = `/id/${username}/${collection}/${card}/settings`;

  let cardInfo = await fetchCard(card);
  console.log(cardInfo);
  let cardTile;
  if (!cardInfo.error) {
    cardTile = create_card(cardInfo.question, cardInfo.answers[0].answer);
  }

  const buttons = [
    {
      href: settingsUrl,
      symbol: <Cog className="h-8 w-8" />,
    },
  ];

  return (
    <FloatingResourceButtons
      ownerPrivilegeValidator={validateOwner}
      buttons={buttons}
    >
      <div className="flex flex-col sm:flex-row justify-center gap-4 p-4">
        {cardTile}
      </div>
    </FloatingResourceButtons>
  );
}
