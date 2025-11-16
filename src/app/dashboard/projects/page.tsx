import { PageBreadcrumb } from '@/components/page-breadcrumb';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { getProjects } from '@/lib/actions/projects';
import { ProjectsTable } from '@/features/projects/components/projects-table';

export default async function ProjectsPage() {
  const { data: projects = [] } = await getProjects();

  return (
    <div className='flex-1 space-y-4 p-4 pt-6 md:p-8'>
      <PageBreadcrumb
        items={[
          { title: 'Dashboard', link: '/dashboard' },
          { title: 'Projects', link: '/dashboard/projects' }
        ]}
      />

      <div className='flex items-start justify-between'>
        <Heading
          title='Projects'
          description='Gestão de projetos e milestones'
        />
        <Link href='/dashboard/projects/new'>
          <Button>
            <Plus className='mr-2 h-4 w-4' />
            Novo Projeto
          </Button>
        </Link>
      </div>

      <Separator />

      <ProjectsTable projects={projects} />
    </div>
  );
}
