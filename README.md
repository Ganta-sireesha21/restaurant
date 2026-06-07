# Restaurant Reservation System

Full-stack restaurant reservation system built with React, Tailwind CSS, Express, Node.js, and Supabase.

## Project Structure

- `backend/` - Express API server
- `frontend/` - React + Vite + Tailwind application
- `backend/supabase-schema.sql` - Supabase SQL schema definitions

## Setup Instructions

### 1. Configure Supabase

1. Create a Supabase project.
2. Create the following tables using `backend/supabase-schema.sql` or Supabase SQL editor.
3. Retrieve your Supabase project URL and Service Role Key.

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and set:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`
- `FRONTEND_URL=http://localhost:5173`

Then run:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file with:

```env
VITE_API_URL=http://localhost:4000/api
```

Then run:

```bash
npm run dev
```

### 4. Available Backend Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/restaurants`
- `GET /api/restaurants/:id`
- `POST /api/restaurants`
- `PUT /api/restaurants/:id`
- `DELETE /api/restaurants/:id`
- `GET /api/menus`
- `GET /api/menus/:restaurantId`
- `POST /api/menus`
- `PUT /api/menus/:id`
- `DELETE /api/menus/:id`
- `POST /api/reservations`
- `GET /api/reservations`
- `GET /api/reservations/user/:userId`
- `PUT /api/reservations/:id`
- `DELETE /api/reservations/:id`

### 5. Notes

- Protected routes require a `Bearer <token>` header.
- Authentication is handled via JWT issued at login/register.
- The frontend stores user and token in `localStorage`.

## Troubleshooting

- If the frontend cannot reach the backend, ensure `VITE_API_URL` is correct and the backend is running.
- If Supabase returns permission errors, verify the service role key and table permissions.
