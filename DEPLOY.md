# Deploy para Vercel - ForgeStack Internal

## Pré-requisitos

✅ GitHub: https://github.com/vinybarreto/forgestack-ai
✅ Supabase configurado e schema aplicado
✅ Clerk configurado

---

## Passo a Passo do Deploy

### 1. Acessar Vercel

1. Acesse: https://vercel.com
2. Faça login com sua conta
3. Clique em **"Add New..."** → **"Project"**

### 2. Importar do GitHub

1. Selecione o repositório: **vinybarreto/forgestack-ai**
2. Clique em **"Import"**

### 3. Configurar o Projeto

**Framework Preset:** Next.js (detectado automaticamente)

**Root Directory:** `./` (deixe como está)

**Build Command:** `npm run build`

**Output Directory:** `.next` (automático)

### 4. Configurar Variáveis de Ambiente

Clique em **"Environment Variables"** e adicione:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://jmmuqpwovmwqumdkpjrp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptbXVxcHdvdm13cXVtZGtwanJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzMDMyNzIsImV4cCI6MjA3ODg3OTI3Mn0.BXRnNoK3s_fvSP2veW9Dwtbq7OAI-BH0lk4ZbhKTrC4
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptbXVxcHdvdm13cXVtZGtwanJwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzMwMzI3MiwiZXhwIjoyMDc4ODc5MjcyfQ.W00hGqWegMKO4e2pN-6K8lKHJx7_SQz68YR0ht0yiU0

# Database
DATABASE_URL=postgresql://postgres:Fstack@2025@db.jmmuqpwovmwqumdkpjrp.supabase.co:5432/postgres

# Clerk (Auth)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bXV0dWFsLWJsdWVnaWxsLTk0LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_m1uLN8YwsSW5W1176xkQboAczZSlTM9j7WVgMwBgdo

# App Config (atualize com o domínio da Vercel após deploy)
NEXT_PUBLIC_APP_URL=https://seu-projeto.vercel.app
```

**IMPORTANTE:** Após o primeiro deploy, volte e atualize `NEXT_PUBLIC_APP_URL` com a URL real do Vercel.

### 5. Deploy!

1. Clique em **"Deploy"**
2. Aguarde ~2-3 minutos
3. 🎉 Projeto no ar!

---

## Pós-Deploy

### 1. Atualizar URL do Clerk

1. Acesse: https://dashboard.clerk.com
2. Vá em **"Domains"** no seu aplicativo
3. Adicione o domínio da Vercel (ex: `forgestack-internal.vercel.app`)
4. Salve

### 2. Configurar Custom Domain (Opcional)

Se você tem um domínio próprio:

1. Na Vercel, vá em **Settings** → **Domains**
2. Adicione seu domínio (ex: `app.forgestack.com`)
3. Configure DNS conforme instruções da Vercel
4. Atualize `NEXT_PUBLIC_APP_URL` nas variáveis de ambiente

### 3. Testar o Sistema

Acesse sua URL e teste:

✅ Login com Clerk
✅ Página de CRM
✅ Criar um lead
✅ Verificar no Supabase se salvou

---

## Troubleshooting

### Build falha com erro de TypeScript

```bash
# Localmente, rode:
npm run build

# Se der erro, corrija e faça commit:
git add .
git commit -m "fix: build errors"
git push
```

### Erro "DATABASE_URL not defined"

- Verifique se você adicionou TODAS as variáveis de ambiente na Vercel
- Vá em **Settings** → **Environment Variables**
- Clique em **Redeploy** após adicionar

### Clerk mostra erro de domínio

- Adicione o domínio da Vercel no Clerk Dashboard
- Pode levar alguns minutos para propagar

### Supabase Connection Error

- Verifique se o DATABASE_URL está correto
- Teste a conexão no Supabase Dashboard
- Se a senha tiver caracteres especiais, encode na URL

---

## Comandos Úteis

```bash
# Deploy local para teste
npm run build && npm run start

# Ver logs da Vercel
vercel logs [deployment-url]

# Redeploy
git push origin main
```

---

## Domínio Final

Após configurar tudo:

**Produção:** https://forgestack-internal.vercel.app
**Dashboard Vercel:** https://vercel.com/vinybarreto/forgestack-internal
**Supabase:** https://supabase.com/dashboard/project/jmmuqpwovmwqumdkpjrp
**Clerk:** https://dashboard.clerk.com

---

**Deploy feito! 🚀**
