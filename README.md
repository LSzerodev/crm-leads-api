# CRM Leads API

API backend para gerenciamento de leads em um cenário de CRM, construída com TypeScript, Node.js, Express, MongoDB e Zod. O projeto foi desenvolvido com foco em organização por camadas, validação de dados e clareza de manutenção, servindo como vitrine de backend para portfólio e currículo.

## Visão Geral

O sistema permite:

- cadastro de usuários
- login com validação de credenciais
- listagem e remoção de usuários
- criação de leads vinculados a um usuário
- listagem de leads com filtros
- edição de informações do lead
- atualização de etapa e status do lead
- remoção de leads
- dashboard com distribuição por etapa, status e origem do lead

## Principais Destaques

- arquitetura em camadas com separação entre `routes`, `controllers`, `services`, `models`, `schema`, `interfaces` e `utils`
- validação de entrada com Zod
- persistência com MongoDB via Mongoose
- filtros de leads por nome, etapa, status, indicação e período
- resposta de dashboard agregada com `aggregate` e `facet`
- organização recente de tipos, helpers e exports para facilitar manutenção

## Stack Utilizada

- TypeScript
- Node.js
- Express
- MongoDB
- Mongoose
- Zod
- Dotenv
- TSX

## Estrutura do Projeto

```text
src/
  config/
  controllers/
    lead/
    user/
  interfaces/
    http/
    models/
    services/
  models/
  routes/
  schema/
  services/
    lead/
      dashboard/
      query-builder/
    user/
  utils/
  app.ts
  server.ts
```

## Rotas Principais

| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/users` | Cadastra um usuário |
| `GET` | `/users` | Lista usuários |
| `POST` | `/auth/login` | Realiza login |
| `DELETE` | `/user/:id` | Remove um usuário |
| `POST` | `/users/:userId/lead` | Cria um lead para o usuário |
| `GET` | `/users/:userId/leads` | Lista leads do usuário |
| `GET` | `/users/:userId/leads/dashboard` | Retorna o dashboard dos leads |
| `PUT` | `/users/:userId/leads/:leadId/editInfo` | Edita informações do lead |
| `PUT` | `/users/:userId/leads/:leadId/stage` | Atualiza etapa e status do lead |
| `DELETE` | `/users/:userId/leads/:leadId` | Remove um lead |

## Exemplos de Payload

Criar usuário:

```json
{
  "name": "Ana Clara",
  "email": "ana@gmail.com",
  "password": "Senha@123"
}
```

Criar lead:

```json
{
  "name": "Maria Silva",
  "email": "maria@gmail.com",
  "indication": "Instagram",
  "phone": "(11) 99999-9999",
  "note": "Interessada no plano premium."
}
```

Atualizar etapa do lead:

```json
{
  "stage_actual": "Proposta enviada",
  "stage_status": "em andamento"
}
```

## Como Executar Localmente

1. Clone o repositório:

```bash
git clone https://github.com/LSzerodev/crm-leads-api.git
cd crm-leads-api
```

2. Instale as dependências:

```bash
npm install
```

3. Crie o arquivo de ambiente com base no exemplo:

```powershell
Copy-Item .env.example .env
```

4. Ajuste as variáveis:

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `PORT_SERVER` | Sim | Porta da API |
| `MONGODB_URI` | Sim | String de conexão com MongoDB |
| `JWT_SECRET` | Não | Reservada para evolução da autenticação |

5. Inicie o projeto:

```bash
npm run dev
```

Outros comandos úteis:

```bash
npm run start
npm run typecheck
```

## Processo de Desenvolvimento

Durante a evolução do projeto, utilizei IA como apoio para aumentar a produtividade em tarefas como refatoração estrutural, revisão de organização de arquivos, documentação e melhoria de legibilidade. As decisões finais de implementação, validação e ajuste do código continuaram sob minha responsabilidade.

## Melhorias Futuras

- aplicar hash de senha com `bcrypt`
- gerar tokens JWT e proteger rotas
- adicionar testes unitários e de integração
- incluir paginação nas listagens
- padronizar logs e observabilidade
- adicionar Docker para ambiente local e deploy

## Autor

**LSzerodev**
