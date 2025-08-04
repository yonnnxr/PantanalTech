# Comandos de Build - Rota Serra Paxixi

## Comandos Principais

### Desenvolvimento
```bash
# Iniciar servidor de desenvolvimento
npm run dev
# ou
bun run dev
```

### Build para Produção
```bash
# Build padrão
npm run build
# ou
bun run build

# Build para desenvolvimento (com sourcemaps)
npm run build:dev

# Build para produção (otimizado)
npm run build:prod

# Build com análise de bundle
npm run build:analyze
```

### Preview e Servir
```bash
# Preview do build
npm run preview

# Preview em porta específica
npm run preview:build

# Servir build em produção
npm run start

# Servir build com host externo
npm run serve
```

### Limpeza e Reinstalação
```bash
# Limpar arquivos de build
npm run clean

# Limpar tudo (incluindo node_modules)
npm run clean:all

# Reinstalar dependências (npm)
npm run reinstall

# Reinstalar dependências (bun)
npm run reinstall:bun
```

## Configurações de Build

### Otimizações Aplicadas
- **Code Splitting**: Separação automática de chunks
- **Tree Shaking**: Remoção de código não utilizado
- **Minificação**: Terser para otimização de código
- **Chunk Optimization**: Separação de vendor, leaflet e router

### Estrutura de Saída
```
dist/
├── assets/
│   ├── index-[hash].js
│   ├── vendor-[hash].js
│   ├── leaflet-[hash].js
│   ├── router-[hash].js
│   └── index-[hash].css
└── index.html
```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
NODE_ENV=production
VITE_APP_TITLE=Rota Serra Paxixi
VITE_API_URL=https://api.exemplo.com
```

## Deploy

### Cloudflare Pages
O projeto está configurado para deploy no Cloudflare Pages.

**Comando de build:** `bun run build`

**Configuração:**
- Arquivo `wrangler.toml` configurado para deploy
- Arquivo `public/_headers` para cache e segurança
- Arquivo `public/_redirects` para SPA routing
- Build otimizado para produção

**Deploy via Web Interface:**
1. Acesse [Cloudflare Pages](https://dash.cloudflare.com/pages)
2. Clique em "Create a project"
3. Conecte seu repositório GitHub/GitLab
4. Configure:
   - **Framework preset:** None
   - **Build command:** `bun run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (deixe vazio)
   - **Environment variables:** (opcional) NODE_ENV=production
   - **Deploy command:** (deixe vazio - não configure)
5. Clique em "Save and Deploy"

**IMPORTANTE:** Você precisa remover o comando de deploy personalizado na interface web do Cloudflare Pages.

**Deploy via CLI (opcional):**
```bash
# Instalar Wrangler
npm install -g wrangler

# Login no Cloudflare
wrangler login

# Deploy
wrangler pages deploy dist --project-name=rota-serra-paxixi
```

### Vercel/Netlify
O comando de build padrão é `npm run build`

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 4173
CMD ["npm", "run", "serve"]
```

### Build Manual
```bash
# 1. Instalar dependências
npm install

# 2. Build para produção
npm run build

# 3. Servir build
npm run serve
```

## Troubleshooting

### Erro de memória no build
```bash
# Aumentar memória do Node
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

### Limpar cache
```bash
# Limpar cache do Vite
rm -rf node_modules/.vite

# Limpar cache do npm
npm cache clean --force

# Limpar cache do bun
bun cache rm
``` 