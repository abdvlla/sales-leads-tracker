import { Customer } from "./definitions";
import supabase from "@/utils/supabase";

export async function fetchLeads(): Promise<Customer[]> {
    try 
    {
        let { data: leads } = await supabase.from("leads").select("*");
        return leads as Customer[];
    }
  
    catch (error) {
      console.error("Error fetching data:", error);
      throw new Error('Failed to fetch leads data.');
    }
  
  }

  export async function fetchLead(id: string): Promise<Customer | null> {
    try {
        let { data: lead } = await supabase
            .from("leads")
            .select("*")
            .eq("id", id)
            .single(); 

        return lead as Customer | null;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error('Failed to fetch lead data.');
    }
}

export async function fetchLatestLeads(): Promise<Customer[] | null> {
    try {
        let { data: leads } = await supabase
            .from("leads")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(5);

        return leads as Customer[] | null;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error('Failed to fetch lead data.');
    }
}

// fetch the count in the last 14 days
export async function fetchAllLeadsCount() {
    try {
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 14);
        let { count } = await supabase
            .from("leads")
            .select('*', { count: 'exact', head: true }).gte('created_at', fromDate.toISOString());;

        return count;
    } catch (error) {
        console.error("Error fetching count of last 14 days:", error);
        throw new Error('Failed to fetch count of leads in last 14 days.');
    }
}

export async function fetchTotalLeadsCount() {
    try {
        let { count } = await supabase
            .from("leads")
            .select('*', { count: 'exact', head: true });

        return count;
    } catch (error) {
        console.error("Error fetching count of all leads:", error);
        throw new Error('Failed to fetch count of leads.');
    }
}

export async function fetchTotalQuotesSum() {
    try {
        let { data } = await supabase
            .from("leads")
            .select("quote", { count: "exact", head: false });



        const totalSum = (data ?? []).reduce((sum, lead) => sum + (lead.quote || 0), 0);
        return totalSum;
    } catch (error) {
        console.error("Error fetching total quotes sum:", error);
        throw new Error('Failed to fetch total quotes sum.');
    }
}

// Fetch the sum of quotes from leads added in the last 14 days
export async function fetchRecentQuotesSum() {
    try {
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 14);
        
        let { data } = await supabase
            .from("leads")
            .select("quote", { count: "exact", head: false })
            .gte("created_at", fromDate.toISOString());

        const recentSum = (data ?? []).reduce((sum, lead) => sum + (lead.quote || 0), 0);
        return recentSum;
    } catch (error) {
        console.error("Error fetching recent quotes sum:", error);
        throw new Error('Failed to fetch recent quotes sum.');
    }
}
