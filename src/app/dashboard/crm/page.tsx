import { Breadcrumb } from '@/components/breadcrumb';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { LeadsTable } from '@/features/crm/components/leads-table';
import { LeadsStats } from '@/features/crm/components/leads-stats';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getLeads } from '@/lib/actions/leads';

export default async function CRMPage() {
  const { data: leads = [] } = await getLeads();

  return (
    <div className='flex-1 space-y-4 p-4 pt-6 md:p-8'>
      <Breadcrumb
        items={[
          { title: 'Dashboard', link: '/dashboard' },
          { title: 'CRM', link: '/dashboard/crm' }
        ]}
      />

      <div className='flex items-start justify-between'>
        <Heading
          title='CRM - Leads'
          description='Gestão de leads e oportunidades'
        />
        <Link href='/dashboard/crm/new'>
          <Button>
            <Plus className='mr-2 h-4 w-4' />
            Novo Lead
          </Button>
        </Link>
      </div>

      <Separator />

      <LeadsStats />

      <LeadsTable leads={leads} />
    </div>
  );
}
