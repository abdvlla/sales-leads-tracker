import React from "react";
import LeadForm from "../../new/lead-form";
import { fetchLead } from "@/app/lib/data";
import { notFound } from "next/navigation";

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
