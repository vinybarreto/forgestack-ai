'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { createLead } from '@/lib/actions/leads';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  company: z.string().optional(),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  source: z.enum([
    'cold_email',
    'linkedin',
    'referral',
    'networking',
    'calendly'
  ]),
  budgetRange: z.enum(['0-5k', '5-10k', '10-15k', '15k+']).optional()
});

export function NewLeadForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      source: 'linkedin',
      budgetRange: '5-10k'
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await createLead(values);

    if (result.success) {
      toast.success('Lead criado com sucesso!');
      router.push('/dashboard/crm');
    } else {
      toast.error(result.error || 'Erro ao criar lead');
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações do Lead</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='grid gap-4 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome *</FormLabel>
                    <FormControl>
                      <Input placeholder='João Silva' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='company'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder='Empresa Lda' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='joao@empresa.pt'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder='+351 912 345 678' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='source'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fonte *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Selecione a fonte' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='cold_email'>Cold Email</SelectItem>
                        <SelectItem value='linkedin'>LinkedIn</SelectItem>
                        <SelectItem value='referral'>Referência</SelectItem>
                        <SelectItem value='networking'>Networking</SelectItem>
                        <SelectItem value='calendly'>Calendly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='budgetRange'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Estimado</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Selecione o budget' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='0-5k'>€0 - €5.000</SelectItem>
                        <SelectItem value='5-10k'>€5.000 - €10.000</SelectItem>
                        <SelectItem value='10-15k'>
                          €10.000 - €15.000
                        </SelectItem>
                        <SelectItem value='15k+'>€15.000+</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex gap-4'>
              <Button
                type='button'
                variant='outline'
                onClick={() => router.back()}
              >
                Cancelar
              </Button>
              <Button type='submit' disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Criando...' : 'Criar Lead'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
