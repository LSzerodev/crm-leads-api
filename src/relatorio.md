# Lead Validation Report / Relatorio de Validacao de Lead

## PT-BR

### O que foi alterado
- Foi criado o arquivo `src/schema/lead.schema.ts`.
- O contrato do lead agora ficou centralizado com Zod para criacao, edicao parcial, troca de estagio e validacao de IDs.
- Os controllers de lead agora validam `req.params` e `req.body` antes de chamar os services.
- O model `Lead` passou a reutilizar os mesmos enums do schema para evitar divergencia.
- Os services de lead passaram a usar tipos derivados do schema, reduzindo duplicacao.

### Onde essa validacao pode ser usada
- `POST /users/:userId/lead`
- `PUT /users/:userId/leads/:leadId/editInfo`
- `PUT /users/:userId/leads/:leadId/stage`
- `GET /users/:userId/leads`
- `DELETE /users/:userId/leads/:leadId`
- Em testes de integracao para garantir o contrato da API.
- Em front-end, para espelhar o mesmo contrato antes de enviar dados ao backend.

### Schemas criados

#### 1. `leadCreateBodySchema`
Usado para criar lead.

Exemplo valido:

```json
{
  "name": "Maria Silva",
  "email": "maria@gmail.com",
  "indication": "Instagram",
  "phone": "(11) 99999-9999",
  "note": "Cliente pediu retorno na sexta."
}
```

Exemplos com erro:

```json
{
  "name": "M",
  "email": "email-invalido",
  "indication": "TikTok"
}
```

Erros esperados:
- `name`: precisa ter pelo menos 2 caracteres.
- `email`: precisa ser um email valido.
- `indication`: precisa ser um dos valores permitidos.

#### 2. `leadEditBodySchema`
Usado para editar informacoes do lead.

Exemplo valido:

```json
{
  "phone": "+55 11 98888-7777",
  "note": "Contato remarcado."
}
```

Exemplos com erro:

```json
{}
```

Erro esperado:
- precisa enviar pelo menos um campo para atualizar.

#### 3. `leadStageBodySchema`
Usado para atualizar estagio e status do lead.

Exemplo valido:

```json
{
  "stage_actual": "Proposta enviada",
  "stage_status": "em andamento"
}
```

Exemplos com erro:

```json
{
  "stage_actual": "Fechado",
  "stage_status": "andando"
}
```

Erros esperados:
- `stage_actual`: precisa ser um dos estagios definidos.
- `stage_status`: precisa ser um dos status definidos.

#### 4. `leadUserParamsSchema` e `leadParamsSchema`
Usados para validar `userId` e `leadId` como ObjectId do MongoDB.

Exemplo valido:

```json
{
  "userId": "507f1f77bcf86cd799439011",
  "leadId": "507f191e810c19729de860ea"
}
```

Exemplo com erro:

```json
{
  "userId": "123",
  "leadId": "abc"
}
```

### Casos de erro mais comuns
- Enviar campos extras no body, como `stage_actual` na rota de criacao.
- Tentar editar lead com body vazio.
- Enviar `leadId` ou `userId` que nao parecem ObjectId.
- Passar `indication` fora da lista permitida.
- Passar telefone com caracteres invalidos.

### Como eu ensinaria isso ate para um bebe
Pensa no Zod como um porteiro muito esperto.

Antes do dado entrar na festa:
- ele olha o nome;
- ele olha o email;
- ele olha o telefone;
- ele olha se o ID tem formato certo;
- e se alguma coisa estiver estranha, ele nao deixa passar.

Na pratica, isso significa:
- o controller recebe a requisicao;
- o Zod confere se tudo esta certo;
- so depois o service mexe no banco.

Regra simples para decorar:
- controller valida;
- service executa;
- model persiste.

### Exemplo pratico no controller

```ts
const { userId } = leadUserParamsSchema.parse(req.params);
const body = leadCreateBodySchema.parse(req.body);

await leadService.exec({
  userId,
  ...body,
});
```

### Como sair codando Zod daqui
Passo mental:
1. Descubra quais campos existem.
2. Defina o que e obrigatorio e o que e opcional.
3. Liste enums e formatos especiais.
4. Crie um schema Zod.
5. Use `.parse()` ou `.safeParse()` no controller.
6. So chame service se a validacao passar.

### Resumo direto
Agora o lead tem uma porta de entrada clara. Se o payload vier quebrado, ele para no controller. Se vier certo, chega limpo no service.

## EN

### What changed
- A new file named `src/schema/lead.schema.ts` was created.
- The lead contract is now centralized with Zod for creation, partial update, stage update, and id validation.
- Lead controllers now validate `req.params` and `req.body` before calling services.
- The `Lead` model now reuses the same enums from the schema to avoid drift.
- Lead services now use types inferred from the schema, reducing duplication.

### Where this validation can be used
- `POST /users/:userId/lead`
- `PUT /users/:userId/leads/:leadId/editInfo`
- `PUT /users/:userId/leads/:leadId/stage`
- `GET /users/:userId/leads`
- `DELETE /users/:userId/leads/:leadId`
- Integration tests that need to assert the API contract.
- Front-end forms that want to mirror the backend contract before submitting data.

### Schemas created

#### 1. `leadCreateBodySchema`
Used to create a lead.

Valid example:

```json
{
  "name": "Maria Silva",
  "email": "maria@gmail.com",
  "indication": "Instagram",
  "phone": "(11) 99999-9999",
  "note": "Client asked for a follow-up on Friday."
}
```

Invalid example:

```json
{
  "name": "M",
  "email": "invalid-email",
  "indication": "TikTok"
}
```

Expected errors:
- `name`: must have at least 2 characters.
- `email`: must be a valid email.
- `indication`: must be one of the allowed values.

#### 2. `leadEditBodySchema`
Used to edit lead information.

Valid example:

```json
{
  "phone": "+55 11 98888-7777",
  "note": "Contact rescheduled."
}
```

Invalid example:

```json
{}
```

Expected error:
- at least one field must be sent for update.

#### 3. `leadStageBodySchema`
Used to update lead stage and status.

Valid example:

```json
{
  "stage_actual": "Proposta enviada",
  "stage_status": "em andamento"
}
```

Invalid example:

```json
{
  "stage_actual": "Closed",
  "stage_status": "moving"
}
```

Expected errors:
- `stage_actual`: must be one of the defined stages.
- `stage_status`: must be one of the defined statuses.

#### 4. `leadUserParamsSchema` and `leadParamsSchema`
Used to validate `userId` and `leadId` as MongoDB ObjectIds.

Valid example:

```json
{
  "userId": "507f1f77bcf86cd799439011",
  "leadId": "507f191e810c19729de860ea"
}
```

Invalid example:

```json
{
  "userId": "123",
  "leadId": "abc"
}
```

### Common error cases
- Sending extra fields in the body, such as `stage_actual` on the create route.
- Trying to edit a lead with an empty body.
- Sending `leadId` or `userId` values that do not look like MongoDB ObjectIds.
- Sending an `indication` value outside the allowed list.
- Sending a phone number with invalid characters.

### How I would teach this to a baby
Think about Zod like a very smart door guard.

Before the data gets into the party:
- it checks the name;
- it checks the email;
- it checks the phone;
- it checks whether the id looks right;
- and if something looks wrong, it stops the entry.

In practice, this means:
- the controller receives the request;
- Zod checks if the data is valid;
- only then the service touches the database.

Simple rule to remember:
- controller validates;
- service executes;
- model persists.

### Practical controller example

```ts
const { userId } = leadUserParamsSchema.parse(req.params);
const body = leadCreateBodySchema.parse(req.body);

await leadService.exec({
  userId,
  ...body,
});
```

### How to start coding Zod from here
Mental checklist:
1. Discover which fields exist.
2. Decide which ones are required and optional.
3. List enums and special formats.
4. Create a Zod schema.
5. Use `.parse()` or `.safeParse()` in the controller.
6. Only call the service if validation passes.

### Direct summary
Lead input now has a clear gate. Broken payloads stop in the controller. Valid payloads reach the service already clean.
