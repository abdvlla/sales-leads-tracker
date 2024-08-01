import { Metadata } from "next";
import LeadForm from "./lead-form";

export const metadata: Metadata = {
  title: "Create Lead",
};

export default async function Add() {
  return (
    <main>
      <LeadForm />
    </main>
  );
}
