import Basic404 from "@/components/partials/Basic404";

export default function NotFound() {
  return (
    <>
      <Basic404
        details={`That user does not exist. Please double check the username`}
      />
    </>
  );
}
