# ForgeStack Internal System

Sistema interno de gestão para ForgeStack - CRM, Project Management, Invoicing, Time Tracking e Client Portal.

## Visão Geral

Sistema all-in-one para gerenciar operações de consultoria:
- **CRM** - Gestão de leads com pipeline e BANT scoring
- **Projects** - Gestão de projetos, milestones e tasks
- **Invoices** - Geração de faturas portuguesas (Recibo Verde)
- **Time Tracking** - Controle de horas e análise de rentabilidade
- **Client Portal** - Portal self-service para clientes
- **Analytics** - Dashboards e métricas de negócio

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + React 19 + TypeScript
- **UI**: shadcn/ui + Tailwind CSS
- **Database**: Supabase PostgreSQL
- **ORM**: Drizzle ORM
- **Auth**: Clerk
- **Deploy**: Vercel

## Quick Start

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Copie `.env.example` para `.env`:
```bash
cp .env.example .env
```

Preencha as variáveis necessárias:
- Supabase URL e keys
- Database URL (PostgreSQL)
- Clerk keys (auth)

### 3. Setup do Banco de Dados

```bash
# Gerar e aplicar schema
npm run db:push

# (Opcional) Abrir Drizzle Studio
npm run db:studio
```

### 4. Rodar o Projeto

```bash
npm run dev
```

Acesse: http://localhost:3000

## Estrutura do Projeto

```
forgestack-internal/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── dashboard/
│   │   │   ├── crm/           # Módulo CRM
│   │   │   ├── projects/      # Módulo Projects
│   │   │   ├── invoices/      # Módulo Invoices
│   │   │   ├── time/          # Módulo Time Tracking
│   │   │   └── overview/      # Dashboard principal
│   │   └── client-portal/     # Portal do Cliente (público)
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   └── layout/            # Layout components
│   ├── features/              # Features organizadas por módulo
│   │   ├── crm/
│   │   ├── projects/
│   │   ├── invoices/
│   │   └── time-tracking/
│   └── lib/
│       ├── db/                # Drizzle schema e config
│       ├── actions/           # Server Actions
│       └── supabase/          # Supabase clients
└── drizzle/                   # Migrations
```

## Módulos Implementados (MVP)

### CRM
- ✅ Listagem de leads
- ✅ Criação de leads
- ✅ Pipeline Kanban (estrutura)
- ✅ BANT scoring (schema)
- ⏳ Edição de leads
- ⏳ Automated follow-ups

### Projects
- ✅ Listagem de projetos
- ✅ Estrutura de milestones
- ⏳ Criação de projetos
- ⏳ Tasks e subtasks
- ⏳ Kanban board de tasks

### Invoices
- ✅ Estrutura básica
- ⏳ Geração de faturas
- ⏳ PDF export (Recibo Verde)
- ⏳ Payment tracking

### Time Tracking
- ✅ UI básica
- ⏳ Timer funcional
- ⏳ Integração com tasks
- ⏳ Relatórios de rentabilidade

### Client Portal
- ✅ Estrutura básica
- ⏳ Token-based access
- ⏳ Project progress view
- ⏳ Document repository

## Scripts Disponíveis

```bash
npm run dev              # Rodar em desenvolvimento
npm run build            # Build para produção
npm run start            # Rodar produção
npm run lint             # Lint código
npm run format           # Format código com Prettier

# Database
npm run db:generate      # Gerar migrations
npm run db:push          # Aplicar schema no banco
npm run db:studio        # Abrir Drizzle Studio
```

## Setup Completo

Para instruções detalhadas de setup, consulte [SETUP.md](./SETUP.md)

## Roadmap

### Phase 1: MVP (Current)
- [x] Setup projeto
- [x] Database schema completo
- [x] Estrutura de todos os módulos
- [ ] CRM funcional
- [ ] Projects funcional
- [ ] Basic invoicing

### Phase 2: Core Features
- [ ] Email automation
- [ ] Time tracking completo
- [ ] Client portal funcional
- [ ] Analytics dashboard

### Phase 3: Advanced
- [ ] Stripe integration
- [ ] PDF generation (invoices)
- [ ] Multi-tenant
- [ ] API pública

## Deployment

### Vercel (Recomendado)

1. Push para GitHub
2. Conectar repositório no Vercel
3. Configurar variáveis de ambiente
4. Deploy!

### Manual

```bash
npm run build
npm run start
```

## Contribuindo

Este é um projeto interno da ForgeStack. Para contribuir:

1. Crie uma branch: `git checkout -b feature/nome-da-feature`
2. Commit suas mudanças: `git commit -m 'Add some feature'`
3. Push para a branch: `git push origin feature/nome-da-feature`
4. Abra um Pull Request

## Licença

Propriedade da ForgeStack. Todos os direitos reservados.

## Suporte

Para questões ou suporte, contacte: vinicius@forgestack.com

---

**Desenvolvido com ❤️ pela equipe ForgeStack**
