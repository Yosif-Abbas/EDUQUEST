import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://szsrenycohgbwvlyieie.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6c3Jlbnljb2hnYnd2bHlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwMDg0MzIsImV4cCI6MjA1NjU4NDQzMn0.VweVHcWqMzgknW9FWoNLTg4VIfyUvdJPBNpqMM2_vrQ';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
