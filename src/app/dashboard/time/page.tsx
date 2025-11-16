import { Breadcrumb } from '@/components/breadcrumb';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';

export default function TimeTrackingPage() {
  return (
    <div className='flex-1 space-y-4 p-4 pt-6 md:p-8'>
      <Breadcrumb
        items={[
          { title: 'Dashboard', link: '/dashboard' },
          { title: 'Time Tracking', link: '/dashboard/time' }
        ]}
      />

      <Heading
        title='Time Tracking'
        description='Controle de horas e análise de rentabilidade'
      />

      <Separator />

      <div className='grid gap-4 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Timer</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='text-center'>
              <div className='text-4xl font-bold'>00:00:00</div>
              <p className='text-muted-foreground text-sm'>
                Nenhuma task ativa
              </p>
            </div>
            <Button className='w-full' disabled>
              <Play className='mr-2 h-4 w-4' />
              Iniciar Timer
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumo Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span className='text-sm'>Total de horas</span>
                <span className='font-medium'>0h</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-sm'>Horas faturáveis</span>
                <span className='font-medium'>0h</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-sm'>Taxa de utilização</span>
                <span className='font-medium'>0%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
