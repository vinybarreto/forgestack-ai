import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function ClientPortalPage() {
  return (
    <div className='container mx-auto p-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold'>Portal do Cliente</h1>
        <p className='text-muted-foreground'>
          Acompanhe o progresso do seu projeto
        </p>
      </div>

      <Separator className='my-6' />

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <Card>
          <CardHeader>
            <CardTitle>Projeto</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground text-sm'>
              Nenhum projeto ativo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progresso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span className='text-sm'>Milestone Atual</span>
                <Badge>-</Badge>
              </div>
              <div className='flex justify-between'>
                <span className='text-sm'>Progresso</span>
                <span className='font-medium'>0%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documentos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground text-sm'>
              Nenhum documento disponível
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
