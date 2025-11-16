'use server';

import { db } from '@/lib/db';
import { leads, leadActivities } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getLeads() {
  try {
    const allLeads = await db.select().from(leads).orderBy(leads.createdAt);
    return { success: true, data: allLeads };
  } catch (error) {
    console.error('Error fetching leads:', error);
    return { success: false, error: 'Failed to fetch leads' };
  }
}

export async function getLeadById(id: string) {
  try {
    const lead = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
    return { success: true, data: lead[0] };
  } catch (error) {
    console.error('Error fetching lead:', error);
    return { success: false, error: 'Failed to fetch lead' };
  }
}

export async function createLead(data: {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  source: 'cold_email' | 'linkedin' | 'referral' | 'networking' | 'calendly';
  budgetRange?: '0-5k' | '5-10k' | '10-15k' | '15k+';
}) {
  try {
    const [newLead] = await db
      .insert(leads)
      .values({
        ...data,
        status: 'new'
      })
      .returning();

    // Create activity
    await db.insert(leadActivities).values({
      leadId: newLead.id,
      type: 'created',
      description: `Lead criado via ${data.source}`
    });

    revalidatePath('/dashboard/crm');
    return { success: true, data: newLead };
  } catch (error) {
    console.error('Error creating lead:', error);
    return { success: false, error: 'Failed to create lead' };
  }
}

export async function updateLeadStatus(
  id: string,
  status:
    | 'new'
    | 'discovery_scheduled'
    | 'discovery_in_progress'
    | 'proposal_sent'
    | 'negotiation'
    | 'won'
    | 'lost'
) {
  try {
    const [updatedLead] = await db
      .update(leads)
      .set({ status, updatedAt: new Date() })
      .where(eq(leads.id, id))
      .returning();

    // Create activity
    await db.insert(leadActivities).values({
      leadId: id,
      type: 'status_changed',
      description: `Status alterado para ${status}`
    });

    revalidatePath('/dashboard/crm');
    return { success: true, data: updatedLead };
  } catch (error) {
    console.error('Error updating lead:', error);
    return { success: false, error: 'Failed to update lead' };
  }
}

export async function deleteLead(id: string) {
  try {
    await db.delete(leads).where(eq(leads.id, id));
    revalidatePath('/dashboard/crm');
    return { success: true };
  } catch (error) {
    console.error('Error deleting lead:', error);
    return { success: false, error: 'Failed to delete lead' };
  }
}
