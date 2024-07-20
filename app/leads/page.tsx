import { columns, Customer } from "./components/columns";
import { DataTable } from "./components/data-tables";
import { Card } from "@/components/ui/card";
import supabase from "@/utils/supabase";

export const revalidate = 0;

async function getData(): Promise<Customer[]> {
  let { data: leads, error } = await supabase.from("leads").select("*");

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }

  return leads as Customer[];
}

export default async function Leads() {
  const data = await getData();

  console.log("Number of rows fetched:", data.length);

  return (
    <div className="container py-6">
      <Card className="p-4">
        <DataTable data={data} columns={columns} />
      </Card>
    </div>
  );
}
