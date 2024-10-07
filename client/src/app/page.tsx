"use server";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center">
      <section className="flex flex-col gap-6">
        <div>
          <h1 className="font-black text-6xl text-center">QUIZARD</h1>
          <p className="font-serif text-center text-gray-500">
            A wizard of a quiz app
          </p>
        </div>

        <div className="flex justify-center">
          <Link
            className={buttonVariants({ variant: "default", size: "lg" })}
            href="/signup"
          >
            SIGNUP
          </Link>
        </div>
      </section>
    </div>
  );
}
