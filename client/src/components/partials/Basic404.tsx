import Link from "next/link";

export default function Basic404({
  details,
  reroute,
}: {
  details: string;
  reroute?: string;
}) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-red-600">Not Found</h2>
      <p className="text-md text-red-400">{details}</p>
      {reroute && <Link href={reroute}>Go Back</Link>}
    </div>
  );
}
