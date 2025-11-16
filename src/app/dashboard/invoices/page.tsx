import { Breadcrumb } from '@/components/breadcrumb';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function InvoicesPage() {
  return (
    <div className='flex-1 space-y-4 p-4 pt-6 md:p-8'>
      <Breadcrumb
        items={[
          { title: 'Dashboard', link: '/dashboard' },
          { title: 'Invoices', link: '/dashboard/invoices' }
        ]}
      />

      <div className='flex items-start justify-between'>
        <Heading
          title='Invoices'
          description='Gestão de faturas e pagamentos'
        />
        <Link href='/dashboard/invoices/new'>
          <Button>
            <Plus className='mr-2 h-4 w-4' />
            Nova Fatura
          </Button>
        </Link>
      </div>

      <Separator />

      <div className='flex h-[400px] flex-col items-center justify-center rounded-lg border border-dashed'>
        <p className='text-muted-foreground'>Nenhuma fatura encontrada</p>
        <Link href='/dashboard/invoices/new'>
          <Button className='mt-4'>Criar Primeira Fatura</Button>
        </Link>
      </div>
    </div>
  );
}
