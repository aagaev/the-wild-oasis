import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://kuivfpphfslexueeswug.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1aXZmcHBoZnNsZXh1ZWVzd3VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ0Mjc1NzcsImV4cCI6MjA0MDAwMzU3N30.nEn22zDcPYRliiCeuo6ulo6zZ5W3HCNbZHfVOv4AJww";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
