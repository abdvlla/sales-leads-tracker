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