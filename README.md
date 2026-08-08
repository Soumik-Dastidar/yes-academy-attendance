# YES Academy — Attendance & Batch Management Web App

A modern, role-based, real-time web application to replace the old Google Sheets attendance system. Built with Next.js (App Router), Tailwind CSS, and Supabase.

## Features

- **Role-Based Access**: Secure routing and row-level database security (RLS) for Admins, HR, and Faculty.
- **Live Dashboard**: Real-time stats, "happening right now" classes, and missed attendance alerts.
- **Mobile-First Attendance Register**: Optimistic UI updates for ultra-fast attendance marking directly from a phone in the classroom.
- **Academic Timetable**: Auto-generated weekly grid showing room utilization.
- **Permanent Archive**: Read-only historical storage for completed batches.
- **Centralized Settings**: Easy management of default class counts, room capacities, and global variables.

## Getting Started

### 1. Supabase Setup
1. Create a new project on [Supabase](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Open `supabase/migrations/20240101000000_initial_schema.sql` and run it to create all tables, enums, views, and RLS policies.
4. Open `supabase/seed.sql` and run it to populate initial courses, rooms, and default settings.
5. Setup Authentication: Go to Authentication -> Providers and enable Email auth.

### 2. Vercel Deployment
1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com) and import the GitHub repository.
3. In the Vercel project settings, add the following Environment Variables (found in your Supabase project under Settings -> API):
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon public key
4. Click **Deploy**.

### 3. Creating the First Admin
Since the app relies on Role-Based Access Control:
1. Go to the live Vercel URL and sign up a new user via the `/login` page (or invite a user via the Supabase Auth dashboard).
2. Go to the Supabase **Table Editor**, open the `profiles` table.
3. Find the newly created user and change their `role` column to `Admin`.
4. This user can now access the Batch Manager and Settings modules.

## Tech Stack
- **Frontend**: Next.js 14+ (App Router), React, TypeScript, Tailwind CSS, Lucide Icons, React Hook Form, Zod.
- **Backend & Auth**: Supabase (Postgres, GoTrue Auth).
- **Hosting**: Vercel.
