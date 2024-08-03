import React from "react";
import LeadForm from "../../new/lead-form";
import { fetchLead } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit lead",
  description: "Make changes to lead information",
};

type EditProps = {
  params: { id: string };
};

export default async function Edit({ params }: EditProps) {
  const { id } = params;
  const customer = await fetchLead(id);

  if (!customer) {
    return notFound();
  }

  return (
    <div>
      <LeadForm customer={customer} />
    </div>
  );
}
