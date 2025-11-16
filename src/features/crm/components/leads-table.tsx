'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Eye, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

const statusColors = {
  new: 'bg-blue-500',
  discovery_scheduled: 'bg-purple-500',
  discovery_in_progress: 'bg-yellow-500',
  proposal_sent: 'bg-orange-500',
  negotiation: 'bg-pink-500',
  won: 'bg-green-500',
  lost: 'bg-red-500'
};

const statusLabels = {
  new: 'Novo',
  discovery_scheduled: 'Discovery Agendado',
  discovery_in_progress: 'Discovery em Progresso',
  proposal_sent: 'Proposta Enviada',
  negotiation: 'Negociação',
  won: 'Ganho',
  lost: 'Perdido'
};

interface Lead {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  source: string;
  status: keyof typeof statusLabels;
  budgetRange: string | null;
  createdAt: Date;
}

interface LeadsTableProps {
  leads: Lead[];
}

export function LeadsTable({ leads }: LeadsTableProps) {
  if (leads.length === 0) {
    return (
      <div className='flex h-[400px] flex-col items-center justify-center rounded-lg border border-dashed'>
        <p className='text-muted-foreground'>Nenhum lead encontrado</p>
        <Link href='/dashboard/crm/new'>
          <Button className='mt-4'>Criar Primeiro Lead</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead>Contato</TableHead>
            <TableHead>Fonte</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Criado</TableHead>
            <TableHead className='text-right'>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell className='font-medium'>{lead.name}</TableCell>
              <TableCell>{lead.company || '-'}</TableCell>
              <TableCell>
                <div className='flex flex-col gap-1'>
                  {lead.email && (
                    <div className='flex items-center gap-1 text-sm'>
                      <Mail className='h-3 w-3' />
                      <span className='text-muted-foreground'>
                        {lead.email}
                      </span>
                    </div>
                  )}
                  {lead.phone && (
                    <div className='flex items-center gap-1 text-sm'>
                      <Phone className='h-3 w-3' />
                      <span className='text-muted-foreground'>
                        {lead.phone}
                      </span>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className='capitalize'>
                {lead.source.replace('_', ' ')}
              </TableCell>
              <TableCell>{lead.budgetRange || '-'}</TableCell>
              <TableCell>
                <Badge
                  className={statusColors[lead.status]}
                  variant='secondary'
                >
                  {statusLabels[lead.status]}
                </Badge>
              </TableCell>
              <TableCell className='text-muted-foreground'>
                {formatDistanceToNow(new Date(lead.createdAt), {
                  addSuffix: true,
                  locale: ptBR
                })}
              </TableCell>
              <TableCell className='text-right'>
                <Link href={`/dashboard/crm/${lead.id}`}>
                  <Button variant='ghost' size='sm'>
                    <Eye className='h-4 w-4' />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
