# ForgeStack Internal System - Setup Guide

## Requisitos
- Node.js 18+
- Conta Supabase (https://supabase.com)
- Conta Clerk (https://clerk.com) - já configurado no template

## 1. Configuração do Supabase

### 1.1. Criar Projeto no Supabase
1. Acesse https://supabase.com e faça login
2. Clique em "New Project"
3. Escolha uma região (Europa - Frankfurt ou Ireland para RGPD)
4. Copie as credenciais:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon/public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role key` → `SUPABASE_SERVICE_ROLE_KEY`

### 1.2. Obter a Connection String
1. No Supabase, vá em "Settings" → "Database"
2. Copie a "Connection string" (URI format)
3. Substitua `[YOUR-PASSWORD]` pela senha do banco
4. Cole em `DATABASE_URL` no `.env`

## 2. Configuração Local

### 2.1. Instalar Dependências
```bash
npm install
```

### 2.2. Configurar Variáveis de Ambiente
Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

Preencha as variáveis:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key

# Database
DATABASE_URL=postgresql://postgres:[password]@db.seu-projeto.supabase.co:5432/postgres

# Clerk (já configurado no template)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
```

### 2.3. Criar o Schema do Banco de Dados
```bash
# Gerar as migrations
npm run db:generate

# Aplicar no banco
npm run db:push
```

### 2.4. (Opcional) Abrir Drizzle Studio
Para visualizar e editar dados:
```bash
npm run db:studio
```

## 3. Rodar o Projeto

```bash
npm run dev
```

Acesse http://localhost:3000

## 4. Estrutura de Pastas

```
forgestack-internal/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── dashboard/          # Dashboard principal
│   │   │   ├── crm/           # Módulo CRM
│   │   │   ├── projects/      # Módulo Projects
│   │   │   ├── invoices/      # Módulo Invoices
│   │   │   ├── time/          # Módulo Time Tracking
│   │   │   └── analytics/     # Módulo Analytics
│   │   └── client-portal/     # Portal do Cliente
│   ├── components/            # Componentes reutilizáveis
│   │   └── ui/               # shadcn/ui components
│   ├── lib/
│   │   ├── db/               # Drizzle schema e config
│   │   └── supabase/         # Supabase client/server
│   └── features/             # Features por módulo
│       ├── crm/
│       ├── projects/
│       ├── invoices/
│       └── time-tracking/
└── drizzle/                  # Migrations geradas
```

## 5. Próximos Passos

- [ ] Configurar autenticação Clerk
- [ ] Implementar módulo CRM
- [ ] Implementar módulo Project Management
- [ ] Configurar Stripe para pagamentos
- [ ] Configurar Resend para emails

## 6. Scripts Úteis

```bash
npm run dev              # Rodar em desenvolvimento
npm run build            # Build para produção
npm run start            # Rodar produção
npm run db:generate      # Gerar migrations
npm run db:push          # Aplicar schema no banco
npm run db:studio        # Abrir Drizzle Studio
```

## 7. Troubleshooting

### Erro: "DATABASE_URL is not set"
- Verifique se o arquivo `.env` existe
- Confirme que a variável `DATABASE_URL` está preenchida

### Erro de conexão com Supabase
- Verifique se a Connection String está correta
- Teste a conexão no Supabase Studio
- Confirme que sua senha não tem caracteres especiais não-encoded

### Erro ao rodar migrations
```bash
# Reset e recrie o schema
npm run db:push
```
