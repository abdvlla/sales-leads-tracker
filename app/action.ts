'use server';

import { revalidatePath } from 'next/cache';

export async function revalidateLeads() {
  revalidatePath('leads')
  revalidatePath('/');
}

export async function revalidateLead(leadId: string) {
  revalidatePath(`/leads/${leadId}/edit`);
}
