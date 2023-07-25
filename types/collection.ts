import { Database } from './supabase';

export type Cabins = Database['public']['Tables']['cabins']['Row'];
