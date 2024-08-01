import React from "react";
import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center gap-2 h-screen">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested lead.</p>
      <Button asChild variant={"default"} className="mt-2">
        <Link href="/leads">Go Back</Link>
      </Button>
    </main>
  );
}
