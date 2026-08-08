-- Seed Data for YES Academy Attendance System

-- 1. Insert default settings
INSERT INTO settings (id, default_max_students, default_total_classes, default_additional_classes)
VALUES (1, 12, 28, 8)
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Courses
INSERT INTO courses (family, name, default_total_classes, default_additional_classes) VALUES
('PTE', 'PTE', 28, 8),
('PTE', 'PTE Booster', 28, 8),
('IELTS', 'CD IELTS', 28, 8),
('IELTS', 'CD IELTS CRASH', 14, 4),
('Grammar', 'Basic Grammar', 28, 8);

-- 3. Insert Rooms
INSERT INTO rooms (name, capacity) VALUES
('Room 1', 12),
('Room 2', 12),
('Room 3', 12),
('Room 4', 12);

-- Note: We cannot insert auth.users directly via SQL easily without bypassing Supabase Auth's hashing.
-- In a real setup, you should invite these users via the Supabase dashboard or API, and a trigger 
-- should create their profile entries. For now, we will create dummy profile entries assuming auth.users exist
-- or will be linked later. (Since profiles has a foreign key to auth.users, this won't work unless auth.users exist).

-- To properly seed users, we recommend using the Supabase CLI: 
-- supabase db reset (with seed.sql) if you mock auth users, 
-- or signing up via the app UI and manually changing roles in the database for the first admin.
