import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-full place-items-center  px-6 py-24 sm:py-32 lg:px-8 h-screen">
      <div className="text-center">
        <p className="text-base font-semibold">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight  sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 ">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-4 flex items-center justify-center gap-x-6">
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
