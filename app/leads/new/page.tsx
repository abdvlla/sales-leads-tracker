import { Metadata } from "next";
import LeadForm from "./lead-form";

export const metadata: Metadata = {
  title: "Create lead",
  description: "Make a new lead",
};

export default async function Add() {
  return (
    <main>
      <LeadForm />
    </main>
  );
}
