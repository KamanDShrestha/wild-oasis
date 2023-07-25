import { createClient } from '@supabase/supabase-js';
import { Database } from '../../types/supabase.ts';
export const supabaseUrl = 'https://ljvqtkgvzrfccynqhhtv.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqdnF0a2d2enJmY2N5bnFoaHR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAxODEyNTUsImV4cCI6MjAwNTc1NzI1NX0.BRg1cN_zBoorTcrebxWqE-s3UL_OnGtf3M1lyggAxpk';
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
