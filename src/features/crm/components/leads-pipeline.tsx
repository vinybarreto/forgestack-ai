'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const columns = [
  { id: 'new', title: 'Novo', color: 'bg-blue-500' },
  {
    id: 'discovery_scheduled',
    title: 'Discovery Agendado',
    color: 'bg-purple-500'
  },
  { id: 'proposal_sent', title: 'Proposta Enviada', color: 'bg-orange-500' },
  { id: 'negotiation', title: 'Negociação', color: 'bg-pink-500' },
  { id: 'won', title: 'Ganho', color: 'bg-green-500' }
];

export function LeadsPipeline() {
  // TODO: Fetch leads and group by status
  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold'>Pipeline Kanban</h3>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5'>
        {columns.map((column) => (
          <Card key={column.id}>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-sm font-medium'>
                  {column.title}
                </CardTitle>
                <Badge variant='secondary' className={column.color}>
                  0
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <p className='text-muted-foreground text-sm'>
                  Nenhum lead nesta etapa
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
