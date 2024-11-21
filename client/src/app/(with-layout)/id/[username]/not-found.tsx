import Basic404 from "@/components/partials/Basic404";

export default function NotFound({ error, reset }: any) {
  const errorMsg =
    error?.message ??
    "That user does not exist. Please double check the username";

  return <Basic404 details={errorMsg} />;
}
