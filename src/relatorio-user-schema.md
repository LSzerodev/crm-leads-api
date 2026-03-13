# User Schema Report / Relatorio do User Schema

## PT-BR

### O que foi melhorado
- `name` agora passa por `trim`, tamanho minimo e tamanho maximo.
- `email` agora e normalizado para lowercase, validado como email real e restrito aos dominios aceitos.
- `password` agora exige letra maiuscula, letra minuscula, numero, simbolo, minimo de 8 e maximo de 64 caracteres.
- O controller de criacao de usuario agora valida o `req.body` inteiro, inclusive campos extras.

### Exemplo valido

```json
{
  "name": "Ana Clara",
  "email": "ANA@GMAIL.COM",
  "password": "Senha@123"
}
```

Resultado esperado apos parse:

```json
{
  "name": "Ana Clara",
  "email": "ana@gmail.com",
  "password": "Senha@123"
}
```

### Casos de erro

Exemplo 1:

```json
{
  "name": "Al",
  "email": "ana@gmail.com",
  "password": "Senha@123"
}
```

Erro:
- nome curto demais.

Exemplo 2:

```json
{
  "name": "Ana Clara",
  "email": "ana@empresa.com",
  "password": "Senha@123"
}
```

Erro:
- dominio de email nao permitido pelo schema atual.

Exemplo 3:

```json
{
  "name": "Ana Clara",
  "email": "ana@gmail.com",
  "password": "senhafraca"
}
```

Erros:
- sem maiuscula;
- sem numero;
- sem simbolo.

### Onde usar
- Cadastro de usuario.
- Formulario de signup no front-end.
- Validacao antes de criar usuario em testes.
- Reaproveitamento em outros fluxos que precisem do mesmo padrao de email e senha.

### Como explicar de forma muito simples
Se o user schema fosse um brinquedo de encaixe:
- nome entra no buraco do nome;
- email entra no buraco do email;
- senha entra no buraco da senha.

Se a pecinha vier errada, nao encaixa.

No codigo acontece a mesma coisa:
- se os dados batem com o formato certo, passam;
- se nao batem, o Zod devolve erro.

### Mini guia para sair usando
1. Crie um `z.object`.
2. Escreva regra por regra.
3. Rode `schema.parse(req.body)`.
4. Se passar, continue.
5. Se falhar, devolva os erros.

## EN

### What was improved
- `name` now uses `trim`, minimum length, and maximum length.
- `email` is now normalized to lowercase, validated as a real email, and restricted to accepted domains.
- `password` now requires uppercase, lowercase, number, symbol, a minimum of 8, and a maximum of 64 characters.
- The user create controller now validates the full `req.body`, including extra fields.

### Valid example

```json
{
  "name": "Ana Clara",
  "email": "ANA@GMAIL.COM",
  "password": "Senha@123"
}
```

Expected parsed result:

```json
{
  "name": "Ana Clara",
  "email": "ana@gmail.com",
  "password": "Senha@123"
}
```

### Error cases

Example 1:

```json
{
  "name": "Al",
  "email": "ana@gmail.com",
  "password": "Senha@123"
}
```

Error:
- name is too short.

Example 2:

```json
{
  "name": "Ana Clara",
  "email": "ana@company.com",
  "password": "Senha@123"
}
```

Error:
- email domain is not allowed by the current schema.

Example 3:

```json
{
  "name": "Ana Clara",
  "email": "ana@gmail.com",
  "password": "weakpassword"
}
```

Errors:
- no uppercase letter;
- no number;
- no symbol.

### Where to use it
- User registration.
- Front-end signup forms.
- Validation before creating users in tests.
- Reuse in any flow that needs the same email and password policy.

### How to explain it in a very simple way
If the user schema were a shape-sorting toy:
- the name goes into the name hole;
- the email goes into the email hole;
- the password goes into the password hole.

If the piece has the wrong shape, it does not fit.

Code works the same way:
- if the data matches the expected shape, it passes;
- if it does not, Zod returns an error.

### Mini guide to start using it
1. Create a `z.object`.
2. Write one rule at a time.
3. Run `schema.parse(req.body)`.
4. If it passes, continue.
5. If it fails, return the errors.
