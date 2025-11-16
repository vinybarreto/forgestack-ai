import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  decimal,
  pgEnum,
  boolean,
  integer,
  date,
  jsonb
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ==================== ENUMS ====================

export const roleEnum = pgEnum('role', ['admin', 'developer', 'client']);

export const leadStatusEnum = pgEnum('lead_status', [
  'new',
  'discovery_scheduled',
  'discovery_in_progress',
  'proposal_sent',
  'negotiation',
  'won',
  'lost'
]);

export const leadSourceEnum = pgEnum('lead_source', [
  'cold_email',
  'linkedin',
  'referral',
  'networking',
  'calendly'
]);

export const budgetRangeEnum = pgEnum('budget_range', [
  '0-5k',
  '5-10k',
  '10-15k',
  '15k+'
]);

export const bantLevelEnum = pgEnum('bant_level', ['low', 'medium', 'high']);

export const bantTimelineEnum = pgEnum('bant_timeline', [
  '0-3m',
  '3-6m',
  '6m+'
]);

export const packageTierEnum = pgEnum('package_tier', [
  'essencial',
  'profissional',
  'premium'
]);

export const paymentPlanEnum = pgEnum('payment_plan', [
  'milestones',
  'monthly_5x',
  'monthly_6x',
  'monthly_10x',
  'custom'
]);

export const projectStatusEnum = pgEnum('project_status', [
  'discovery',
  'in_progress',
  'on_hold',
  'completed',
  'cancelled'
]);

export const milestoneStatusEnum = pgEnum('milestone_status', [
  'pending',
  'in_progress',
  'client_review',
  'approved',
  'paid'
]);

export const taskStatusEnum = pgEnum('task_status', [
  'todo',
  'in_progress',
  'review',
  'done'
]);

export const priorityEnum = pgEnum('priority', [
  'low',
  'medium',
  'high',
  'urgent'
]);

export const invoiceStatusEnum = pgEnum('invoice_status', [
  'draft',
  'sent',
  'paid',
  'overdue',
  'cancelled'
]);

export const paymentMethodEnum = pgEnum('payment_method', [
  'bank_transfer',
  'mb_way',
  'stripe'
]);

export const documentCategoryEnum = pgEnum('document_category', [
  'contract',
  'documentation',
  'training',
  'deliverable',
  'other'
]);

export const supportStatusEnum = pgEnum('support_status', [
  'open',
  'in_progress',
  'waiting_client',
  'resolved',
  'closed'
]);

export const emailCategoryEnum = pgEnum('email_category', [
  'sales',
  'project',
  'invoice',
  'support'
]);

export const emailStatusEnum = pgEnum('email_status', [
  'sent',
  'bounced',
  'failed'
]);

// ==================== TABLES ====================

// Users
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  role: roleEnum('role').notNull().default('developer'),
  avatarUrl: text('avatar_url'),
  hourlyRate: decimal('hourly_rate', { precision: 10, scale: 2 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// Clients
export const clients = pgTable('clients', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  company: varchar('company', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 50 }),
  nif: varchar('nif', { length: 50 }),
  address: text('address'),
  portalToken: uuid('portal_token').unique().defaultRandom(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// Leads
export const leads = pgTable('leads', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  company: varchar('company', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  source: leadSourceEnum('source').notNull(),
  status: leadStatusEnum('status').notNull().default('new'),
  budgetRange: budgetRangeEnum('budget_range'),
  bantBudget: bantLevelEnum('bant_budget'),
  bantAuthority: boolean('bant_authority'),
  bantNeed: boolean('bant_need'),
  bantTimeline: bantTimelineEnum('bant_timeline'),
  bantScore: integer('bant_score'),
  lostReason: text('lost_reason'),
  ownerId: uuid('owner_id').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// Lead Activities
export const leadActivities = pgTable('lead_activities', {
  id: uuid('id').primaryKey().defaultRandom(),
  leadId: uuid('lead_id')
    .notNull()
    .references(() => leads.id, { onDelete: 'cascade' }),
  type: varchar('type', { length: 100 }).notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

// Lead Notes
export const leadNotes = pgTable('lead_notes', {
  id: uuid('id').primaryKey().defaultRandom(),
  leadId: uuid('lead_id')
    .notNull()
    .references(() => leads.id, { onDelete: 'cascade' }),
  note: text('note').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

// Projects
export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: uuid('client_id')
    .notNull()
    .references(() => clients.id),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  packageTier: packageTierEnum('package_tier').notNull(),
  totalValue: decimal('total_value', { precision: 10, scale: 2 }).notNull(),
  paymentPlan: paymentPlanEnum('payment_plan').notNull(),
  status: projectStatusEnum('status').notNull().default('discovery'),
  startDate: date('start_date').notNull(),
  estimatedEndDate: date('estimated_end_date'),
  actualEndDate: date('actual_end_date'),
  ownerId: uuid('owner_id').references(() => users.id),
  repoUrl: text('repo_url'),
  stagingUrl: text('staging_url'),
  productionUrl: text('production_url'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// Milestones
export const milestones = pgTable('milestones', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  order: integer('order').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  value: decimal('value', { precision: 10, scale: 2 }).notNull(),
  deadline: date('deadline').notNull(),
  status: milestoneStatusEnum('status').notNull().default('pending'),
  approvedAt: timestamp('approved_at'),
  approvedBy: uuid('approved_by').references(() => users.id),
  paidAt: timestamp('paid_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// Tasks
export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  milestoneId: uuid('milestone_id')
    .notNull()
    .references(() => milestones.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  assignedTo: uuid('assigned_to').references(() => users.id),
  priority: priorityEnum('priority').notNull().default('medium'),
  estimatedHours: decimal('estimated_hours', { precision: 5, scale: 2 }),
  actualHours: decimal('actual_hours', { precision: 5, scale: 2 }),
  status: taskStatusEnum('status').notNull().default('todo'),
  dueDate: date('due_date'),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// Time Entries
export const timeEntries = pgTable('time_entries', {
  id: uuid('id').primaryKey().defaultRandom(),
  taskId: uuid('task_id')
    .notNull()
    .references(() => tasks.id, { onDelete: 'cascade' }),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  startedAt: timestamp('started_at').notNull(),
  stoppedAt: timestamp('stopped_at'),
  durationMinutes: integer('duration_minutes'),
  description: text('description'),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

// Invoices
export const invoices = pgTable('invoices', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id),
  milestoneId: uuid('milestone_id').references(() => milestones.id),
  invoiceNumber: varchar('invoice_number', { length: 50 }).notNull().unique(),
  date: date('date').notNull(),
  dueDate: date('due_date').notNull(),
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  ivaRate: decimal('iva_rate', { precision: 5, scale: 2 })
    .notNull()
    .default('23'),
  ivaAmount: decimal('iva_amount', { precision: 10, scale: 2 }).notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  status: invoiceStatusEnum('status').notNull().default('draft'),
  paidAt: timestamp('paid_at'),
  paymentMethod: paymentMethodEnum('payment_method'),
  paymentReference: text('payment_reference'),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// Invoice Line Items
export const invoiceLineItems = pgTable('invoice_line_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  invoiceId: uuid('invoice_id')
    .notNull()
    .references(() => invoices.id, { onDelete: 'cascade' }),
  description: varchar('description', { length: 500 }).notNull(),
  quantity: integer('quantity').notNull().default(1),
  unitPrice: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  order: integer('order').notNull()
});

// Payments
export const payments = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  invoiceId: uuid('invoice_id')
    .notNull()
    .references(() => invoices.id, { onDelete: 'cascade' }),
  date: date('date').notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  method: paymentMethodEnum('method').notNull(),
  reference: text('reference'),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

// Expenses
export const expenses = pgTable('expenses', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id').references(() => projects.id),
  category: varchar('category', { length: 100 }).notNull(),
  description: text('description').notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  date: date('date').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

// Documents
export const documents = pgTable('documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  category: documentCategoryEnum('category').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  fileUrl: text('file_url').notNull(),
  fileSizeKb: integer('file_size_kb'),
  uploadedBy: uuid('uploaded_by')
    .notNull()
    .references(() => users.id),
  visibleToClient: boolean('visible_to_client').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

// Client Portal Tokens
export const clientPortalTokens = pgTable('client_portal_tokens', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: uuid('client_id')
    .notNull()
    .references(() => clients.id, { onDelete: 'cascade' }),
  token: uuid('token').notNull().unique().defaultRandom(),
  expiresAt: timestamp('expires_at')
});

// Support Tickets
export const supportTickets = pgTable('support_tickets', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  priority: priorityEnum('priority').notNull().default('medium'),
  status: supportStatusEnum('status').notNull().default('open'),
  createdBy: uuid('created_by')
    .notNull()
    .references(() => users.id),
  assignedTo: uuid('assigned_to').references(() => users.id),
  resolvedAt: timestamp('resolved_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// Support Messages
export const supportMessages = pgTable('support_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  ticketId: uuid('ticket_id')
    .notNull()
    .references(() => supportTickets.id, { onDelete: 'cascade' }),
  message: text('message').notNull(),
  createdBy: uuid('created_by')
    .notNull()
    .references(() => users.id),
  isInternal: boolean('is_internal').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

// Email Templates
export const emailTemplates = pgTable('email_templates', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  subject: varchar('subject', { length: 500 }).notNull(),
  bodyHtml: text('body_html').notNull(),
  variables: jsonb('variables'),
  category: emailCategoryEnum('category').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// Sent Emails
export const sentEmails = pgTable('sent_emails', {
  id: uuid('id').primaryKey().defaultRandom(),
  templateId: uuid('template_id').references(() => emailTemplates.id),
  recipient: varchar('recipient', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 500 }).notNull(),
  bodyHtml: text('body_html').notNull(),
  sentAt: timestamp('sent_at').notNull().defaultNow(),
  openedAt: timestamp('opened_at'),
  clickedAt: timestamp('clicked_at'),
  repliedAt: timestamp('replied_at'),
  status: emailStatusEnum('status').notNull().default('sent')
});

// NPS Surveys
export const npsSurveys = pgTable('nps_surveys', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: uuid('client_id')
    .notNull()
    .references(() => clients.id),
  score: integer('score').notNull(),
  feedback: text('feedback'),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

// ==================== RELATIONS ====================

export const usersRelations = relations(users, ({ many }) => ({
  leads: many(leads),
  projects: many(projects),
  tasks: many(tasks),
  timeEntries: many(timeEntries)
}));

export const clientsRelations = relations(clients, ({ many }) => ({
  projects: many(projects),
  npsSurveys: many(npsSurveys),
  portalTokens: many(clientPortalTokens)
}));

export const leadsRelations = relations(leads, ({ one, many }) => ({
  owner: one(users, {
    fields: [leads.ownerId],
    references: [users.id]
  }),
  activities: many(leadActivities),
  notes: many(leadNotes)
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  client: one(clients, {
    fields: [projects.clientId],
    references: [clients.id]
  }),
  owner: one(users, {
    fields: [projects.ownerId],
    references: [users.id]
  }),
  milestones: many(milestones),
  invoices: many(invoices),
  documents: many(documents),
  supportTickets: many(supportTickets),
  expenses: many(expenses)
}));

export const milestonesRelations = relations(milestones, ({ one, many }) => ({
  project: one(projects, {
    fields: [milestones.projectId],
    references: [projects.id]
  }),
  tasks: many(tasks),
  invoices: many(invoices)
}));

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  milestone: one(milestones, {
    fields: [tasks.milestoneId],
    references: [milestones.id]
  }),
  assignedUser: one(users, {
    fields: [tasks.assignedTo],
    references: [users.id]
  }),
  timeEntries: many(timeEntries)
}));

export const invoicesRelations = relations(invoices, ({ one, many }) => ({
  project: one(projects, {
    fields: [invoices.projectId],
    references: [projects.id]
  }),
  milestone: one(milestones, {
    fields: [invoices.milestoneId],
    references: [milestones.id]
  }),
  lineItems: many(invoiceLineItems),
  payments: many(payments)
}));

export const supportTicketsRelations = relations(
  supportTickets,
  ({ one, many }) => ({
    project: one(projects, {
      fields: [supportTickets.projectId],
      references: [projects.id]
    }),
    creator: one(users, {
      fields: [supportTickets.createdBy],
      references: [users.id]
    }),
    assignee: one(users, {
      fields: [supportTickets.assignedTo],
      references: [users.id]
    }),
    messages: many(supportMessages)
  })
);
