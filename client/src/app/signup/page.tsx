import GoogleSigninButton from "@/components/ui/googleButton";

function SignUpInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-screen flex flex-col justify-center">
      <section className="flex flex-col gap-5 m-5 px-5 py-10 shadow rounded">
        {children}
      </section>
    </div>
  );
}

export default async function Page() {
  return (
    <SignUpInLayout>
      <div className="my-10">
        <h1 className="font-black text-3xl text-center">Welcome Back</h1>
        <p className="font-serif text-center text-gray-500">
          Let's get studying again!
        </p>
      </div>

      <div className="flex flex-col align-middle">
        <GoogleSigninButton />
      </div>
    </SignUpInLayout>
  );
}
