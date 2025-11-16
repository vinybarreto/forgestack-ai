'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, TrendingUp, DollarSign, Target } from 'lucide-react';

export function LeadsStats() {
  // TODO: Fetch real stats from database
  const stats = [
    {
      title: 'Total Leads',
      value: '0',
      icon: Users,
      description: 'Todos os leads'
    },
    {
      title: 'Em Negociação',
      value: '0',
      icon: TrendingUp,
      description: 'Ativos no pipeline'
    },
    {
      title: 'Taxa de Conversão',
      value: '0%',
      icon: Target,
      description: 'Leads → Ganhos'
    },
    {
      title: 'Valor Pipeline',
      value: '€0',
      icon: DollarSign,
      description: 'Valor potencial'
    }
  ];

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {stat.title}
              </CardTitle>
              <Icon className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stat.value}</div>
              <p className='text-muted-foreground text-xs'>
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
