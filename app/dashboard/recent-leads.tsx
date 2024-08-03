import React from "react";
import { fetchLatestLeads } from "../lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchAllLeadsCount } from "../lib/data";

export async function RecentLeads() {
  const data = await fetchLatestLeads();

  if (!data || data.length === 0) {
    return <p>No recent leads found.</p>;
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="space-y-8">
      {data.map((lead) => (
        <div key={lead.id} className="flex items-center">
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{lead.name}</p>
            <p className="text-sm text-muted-foreground">{lead.email}</p>
          </div>
          <div className="ml-auto font-medium">
            {formatter.format(lead.quote)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function RecentLeadsCard() {
  const last14DaysLeadCount = fetchAllLeadsCount();
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Leads</CardTitle>
        <CardDescription>
          You added {last14DaysLeadCount} leads in the last 14 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RecentLeads />
      </CardContent>
    </Card>
  );
}
