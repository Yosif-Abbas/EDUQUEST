import { createClient } from 'npm:@supabase/supabase-js@2';

// Deno Edge Function entry point
Deno.serve(async (req) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // or "http://localhost:3000" in dev
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') {
    // CORS preflight
    return new Response(null, { headers });
  }

  try {
    const body = await req.json();
    const userId = body.userId;

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Missing userId' }), {
        status: 400,
        headers,
      });
    }

    const supabase = createClient(
      'https://szsrenycohgbwvlyieie.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6c3Jlbnljb2hnYnd2bHlpZWllIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MTAwODQzMiwiZXhwIjoyMDU2NTg0NDMyfQ.GwWGR0YajJYFFLUrCIuplHYgyoq4OcLdDh7GcoLrZm8',
    );

    const { error } = await supabase.auth.admin.deleteUser(userId);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers,
    });
  }
});
