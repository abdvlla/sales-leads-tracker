import { Metadata } from "next";
import CreateForm from "./create-form";

export const metadata: Metadata = {
  title: "Create Lead",
};

export default async function Page() {
  return (
    <main>
      <CreateForm />
    </main>
  );
}
