import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ijukyccyuanbqdaztywg.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqdWt5Y2N5dWFuYnFkYXp0eXdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NzUxMzAsImV4cCI6MjA5ODE1MTEzMH0.gVVpWMCoODXIYTS6MzMFqaB33vw47glxE8cQavkYNZ0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
