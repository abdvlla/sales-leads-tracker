import { columns, Customer } from "./columns";
import { DataTable } from "./data-tables";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import supabase from "@/utils/supabase";

async function getData(): Promise<Customer[]> {
  const { data, error } = await supabase.from("leads").select();

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }

  return data as Customer[];
}

export default async function Leads() {
  const data = await getData();

  return (
    <div className="container max-w-6xl py-6">
      <Card className="p-4">
        <CardHeader>
          <CardTitle className="text-center">Sales leads</CardTitle>
        </CardHeader>
        <DataTable columns={columns} data={data} />
      </Card>
    </div>
  );
}
