import { Customer } from "./definitions";
import supabase from "@/utils/supabase";

async function fetchData<T>(
  select: string,
  conditions?: { column: string; operator: 'eq' | 'gte' | 'order' | 'limit'; value: any }[]
): Promise<T[] | null> {
  try {
    let query = supabase.from("leads").select(select);
    if (conditions) {
      conditions.forEach((condition) => {
        switch (condition.operator) {
          case 'eq':
            query = query.eq(condition.column, condition.value);
            break;
          case 'gte':
            query = query.gte(condition.column, condition.value);
            break;
          case 'order':
            query = query.order(condition.column, condition.value);
            break;
          case 'limit':
            query = query.limit(condition.value);
            break;
          default:
            throw new Error(`Unsupported operator: ${condition.operator}`);
        }
      });
    }
    const { data } = await query;
    return data as T[] | null;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error('Failed to fetch data.');
  }
}

export async function fetchLeads(): Promise<Customer[]> {
  return (await fetchData<Customer>("*")) ?? [];
}

export async function fetchLead(id: string): Promise<Customer | null> {
  const result = await fetchData<Customer>("*", [
    { column: "id", operator: "eq", value: id },
  ]);
  return result ? result[0] : null;
}

export async function fetchLatestLeads(): Promise<Customer[] | null> {
  return await fetchData<Customer>("name, email, quote", [
    { column: "created_at", operator: "order", value: { ascending: false } },
    { column: "", operator: "limit", value: 5 },
  ]);
}

export async function fetchLeadsCount(
  days?: number,
  status?: string
): Promise<number> {
  const fromDate = days
    ? new Date(new Date().setDate(new Date().getDate() - days)).toISOString()
    : undefined;

  let query = supabase.from("leads").select("*", { count: "exact", head: true });

  if (fromDate) {
    query = query.gte('created_at', fromDate);
  }

  if (status) {
    query = query.eq('status', status);
  }

  try {
    const { count } = await query;
    return count ?? 0;
  } catch (error) {
    console.error("Error fetching count of leads:", error);
    throw new Error("Failed to fetch leads count.");
  }
}

export async function fetchQuotesSum(days?: number): Promise<number> {
  const fromDate = days
    ? new Date(new Date().setDate(new Date().getDate() - days)).toISOString()
    : undefined;

  let query = supabase.from("leads").select("quote");

  if (fromDate) {
    query = query.gte("created_at", fromDate);
  }

  try {
    const { data } = await query;
    return (data ?? []).reduce((sum, lead) => sum + (lead.quote || 0), 0);
  } catch (error) {
    console.error("Error fetching total quotes sum:", error);
    throw new Error("Failed to fetch quotes sum.");
  }
}
