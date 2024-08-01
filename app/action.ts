'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export async function revalidateLeads() {
  revalidateTag('leads');
}

export async function revalidateLead(leadId: string) {
  revalidatePath(`/leads/${leadId}/edit`);
}
