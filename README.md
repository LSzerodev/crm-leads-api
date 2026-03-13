# crm-leads-api

Backend CRM API built with TypeScript, Node.js, Express, MongoDB, and Zod. The project demonstrates a layered backend architecture with user flows and lead management in a realistic CRM-style scenario.

## Overview

This API supports:
- user creation
- user login
- user listing and deletion
- lead creation per user
- lead listing by user
- lead information updates
- lead stage and status updates
- lead deletion

The codebase is organized around `routes`, `controllers`, `services`, `models`, and `schema`, making the business flow easy to follow and extend.

## Main Features

- Layered backend architecture
- MongoDB persistence with Mongoose
- Request validation with Zod
- Lead ownership through `userId`
- Separate flows for editing lead info and changing lead stage/status
- Clear route structure for CRM operations

## Tech Stack

- TypeScript
- Node.js
- Express
- MongoDB
- Mongoose
- Zod
- Dotenv
- TSX

## Project Structure

```text
src/
  config/
    db.ts
  controllers/
    lead/
    user/
  models/
    Lead.ts
    User.ts
  routes/
    routes.ts
  schema/
    lead.schema.ts
    user.schema.ts
  services/
    lead/
    user/
  app.ts
  server.ts
```

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/LSzerodev/crm-leads-api.git
cd crm-leads-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local `.env` file based on `.env.example`.

```bash
cp .env.example .env
```

If you are on Windows PowerShell, you can use:

```powershell
Copy-Item .env.example .env
```

### 4. Start MongoDB

Make sure a MongoDB instance is available locally or update `MONGODB_URI` to point to your database server.

### 5. Run the API

Development mode:

```bash
npm run dev
```

Single-run mode:

```bash
npm run start
```

Type check:

```bash
npm run typecheck
```

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `PORT_SERVER` | Yes | Port used by the Express server |
| `MONGODB_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Optional for now | Reserved for token-based auth improvements |

## Main Routes

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/users` | Create a new user |
| `GET` | `/users` | List users from the database |
| `POST` | `/auth/login` | Login with email and password |
| `DELETE` | `/user/:id` | Delete a user |
| `POST` | `/users/:userId/lead` | Create a lead for a user |
| `GET` | `/users/:userId/leads` | List leads for a user |
| `PUT` | `/users/:userId/leads/:leadId/editInfo` | Update lead information |
| `PUT` | `/users/:userId/leads/:leadId/stage` | Update lead stage and status |
| `DELETE` | `/users/:userId/leads/:leadId` | Delete a lead |

### Example Payloads

Create user:

```json
{
  "name": "Ana Clara",
  "email": "ana@gmail.com",
  "password": "Senha@123"
}
```

Create lead:

```json
{
  "name": "Maria Silva",
  "email": "maria@gmail.com",
  "indication": "Instagram",
  "phone": "(11) 99999-9999",
  "note": "Interested in premium plan."
}
```

Update lead stage:

```json
{
  "stage_actual": "Proposta enviada",
  "stage_status": "em andamento"
}
```

## Future Improvements

- Add password hashing with `bcrypt`
- Implement JWT token generation and protected routes
- Add unit and integration tests
- Add pagination and filtering for lead listing
- Add request logging and centralized error handling
- Add Docker support
- Standardize response messages and language

## Author

**LSzerodev**
