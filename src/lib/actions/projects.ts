'use server';

import { db } from '@/lib/db';
import { projects, clients } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getProjects() {
  try {
    const allProjects = await db
      .select({
        id: projects.id,
        name: projects.name,
        description: projects.description,
        packageTier: projects.packageTier,
        totalValue: projects.totalValue,
        status: projects.status,
        startDate: projects.startDate,
        estimatedEndDate: projects.estimatedEndDate,
        createdAt: projects.createdAt,
        clientName: clients.name,
        clientCompany: clients.company
      })
      .from(projects)
      .leftJoin(clients, eq(projects.clientId, clients.id))
      .orderBy(projects.createdAt);

    return { success: true, data: allProjects };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { success: false, error: 'Failed to fetch projects' };
  }
}

export async function getClients() {
  try {
    const allClients = await db.select().from(clients).orderBy(clients.name);
    return { success: true, data: allClients };
  } catch (error) {
    console.error('Error fetching clients:', error);
    return { success: false, error: 'Failed to fetch clients' };
  }
}

export async function createProject(data: {
  clientId: string;
  name: string;
  description?: string;
  packageTier: 'essencial' | 'profissional' | 'premium';
  totalValue: string;
  paymentPlan:
    | 'milestones'
    | 'monthly_5x'
    | 'monthly_6x'
    | 'monthly_10x'
    | 'custom';
  startDate: string;
  estimatedEndDate?: string;
}) {
  try {
    const [newProject] = await db
      .insert(projects)
      .values({
        ...data,
        status: 'discovery'
      })
      .returning();

    revalidatePath('/dashboard/projects');
    return { success: true, data: newProject };
  } catch (error) {
    console.error('Error creating project:', error);
    return { success: false, error: 'Failed to create project' };
  }
}
