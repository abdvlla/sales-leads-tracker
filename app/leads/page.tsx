import { columns } from "./components/columns";
import { DataTable } from "./components/data-tables";
import { Card } from "@/components/ui/card";
import { fetchLeads } from "../lib/data";

export const revalidate = 0;

export default async function Leads() {
  const data = await fetchLeads();

  console.log("Number of rows fetched:", data.length);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight ">Leads table</h2>
      <Card className="p-4">
        <DataTable data={data} columns={columns} />
      </Card>
    </div>
  );
}
