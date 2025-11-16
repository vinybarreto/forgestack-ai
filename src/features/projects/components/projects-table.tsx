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
import { Eye } from 'lucide-react';
import Link from 'next/link';

const statusColors = {
  discovery: 'bg-blue-500',
  in_progress: 'bg-yellow-500',
  on_hold: 'bg-orange-500',
  completed: 'bg-green-500',
  cancelled: 'bg-red-500'
};

const statusLabels = {
  discovery: 'Discovery',
  in_progress: 'Em Progresso',
  on_hold: 'Pausado',
  completed: 'Concluído',
  cancelled: 'Cancelado'
};

interface Project {
  id: string;
  name: string;
  description: string | null;
  packageTier: string;
  totalValue: string;
  status: keyof typeof statusLabels;
  startDate: string;
  estimatedEndDate: string | null;
  createdAt: Date;
  clientName: string | null;
  clientCompany: string | null;
}

interface ProjectsTableProps {
  projects: Project[];
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  if (projects.length === 0) {
    return (
      <div className='flex h-[400px] flex-col items-center justify-center rounded-lg border border-dashed'>
        <p className='text-muted-foreground'>Nenhum projeto encontrado</p>
        <Link href='/dashboard/projects/new'>
          <Button className='mt-4'>Criar Primeiro Projeto</Button>
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
            <TableHead>Cliente</TableHead>
            <TableHead>Pacote</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Início</TableHead>
            <TableHead className='text-right'>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className='font-medium'>{project.name}</TableCell>
              <TableCell>
                {project.clientName || project.clientCompany || '-'}
              </TableCell>
              <TableCell className='capitalize'>
                {project.packageTier}
              </TableCell>
              <TableCell>€{project.totalValue}</TableCell>
              <TableCell>
                <Badge
                  className={statusColors[project.status]}
                  variant='secondary'
                >
                  {statusLabels[project.status]}
                </Badge>
              </TableCell>
              <TableCell className='text-muted-foreground'>
                {formatDistanceToNow(new Date(project.startDate), {
                  addSuffix: true,
                  locale: ptBR
                })}
              </TableCell>
              <TableCell className='text-right'>
                <Link href={`/dashboard/projects/${project.id}`}>
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
