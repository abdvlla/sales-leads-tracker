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