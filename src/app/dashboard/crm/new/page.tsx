import { PageBreadcrumb } from '@/components/page-breadcrumb';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { NewLeadForm } from '@/features/crm/components/new-lead-form';

export default function NewLeadPage() {
  return (
    <div className='flex-1 space-y-4 p-4 pt-6 md:p-8'>
      <PageBreadcrumb
        items={[
          { title: 'Dashboard', link: '/dashboard' },
          { title: 'CRM', link: '/dashboard/crm' },
          { title: 'Novo Lead', link: '/dashboard/crm/new' }
        ]}
      />

      <Heading
        title='Novo Lead'
        description='Adicionar novo lead ao pipeline'
      />

      <Separator />

      <div className='mx-auto max-w-2xl'>
        <NewLeadForm />
      </div>
    </div>
  );
}
