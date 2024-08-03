"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight  sm:text-5xl">
          Something went wrong!
        </h1>
        <p className="mt-6 ">
          There was an error loading the page. Please click the button below to
          try loading the page.
        </p>
        <div className="mt-4 flex items-center justify-center gap-x-6">
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </div>
    </main>
  );
}
