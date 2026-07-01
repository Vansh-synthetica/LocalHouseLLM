import { createClient } from 'npm:@supabase/supabase-js@2';
import { z } from 'npm:zod@3.23.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const schema = z.object({
  full_name: z.string().trim().min(1).max(120),
  company_name: z.string().trim().min(1).max(160),
  role_title: z.string().trim().max(160).optional().default(''),
  email: z.string().trim().email().max(255),
  website_or_linkedin: z.string().trim().max(400).optional().default(''),
  help_needed: z.string().trim().min(1).max(4000),
  budget_range: z.string().trim().max(120).optional().default(''),
  timeline: z.string().trim().max(120).optional().default(''),
  additional_notes: z.string().trim().max(4000).optional().default(''),
});

const NOTIFY_TO = 'bukkarwalvansh@gmail.com';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const data = parsed.data;

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: inserted, error: insertErr } = await supabase
      .from('work_requests')
      .insert(data)
      .select('id')
      .single();

    if (insertErr) {
      console.error('insert error', insertErr);
      return new Response(JSON.stringify({ error: 'Failed to save request' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Email notification (best-effort — request is already stored)
    const resendKey = Deno.env.get('RESEND_API_KEY');
    if (resendKey) {
      const subject = `New LocalHouseLLM Work With Us Request — ${data.company_name}`;
      const html = `
        <div style="font-family:Arial,sans-serif;color:#111;max-width:640px">
          <h2 style="margin:0 0 12px">New Work With Us Request</h2>
          <p style="color:#555;margin:0 0 20px">Submitted via localhousellm.com</p>
          <table cellpadding="8" style="border-collapse:collapse;width:100%;font-size:14px">
            ${[
              ['Full Name', data.full_name],
              ['Company', data.company_name],
              ['Role / Title', data.role_title],
              ['Email', data.email],
              ['Website / LinkedIn', data.website_or_linkedin],
              ['Budget Range', data.budget_range],
              ['Timeline', data.timeline],
            ]
              .map(
                ([k, v]) =>
                  `<tr><td style="border-bottom:1px solid #eee;color:#666;width:180px"><b>${k}</b></td><td style="border-bottom:1px solid #eee">${(v || '—').toString().replace(/</g, '&lt;')}</td></tr>`,
              )
              .join('')}
          </table>
          <h3 style="margin:24px 0 6px">What they need help with</h3>
          <p style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:6px">${data.help_needed.replace(/</g, '&lt;')}</p>
          ${
            data.additional_notes
              ? `<h3 style="margin:20px 0 6px">Additional notes</h3>
                 <p style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:6px">${data.additional_notes.replace(/</g, '&lt;')}</p>`
              : ''
          }
          <p style="color:#888;font-size:12px;margin-top:24px">Request ID: ${inserted.id}</p>
        </div>`;
      try {
        const r = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: 'LocalHouseLLM <onboarding@resend.dev>',
            to: [NOTIFY_TO],
            reply_to: data.email,
            subject,
            html,
          }),
        });
        if (!r.ok) console.error('resend failed', r.status, await r.text());
      } catch (e) {
        console.error('resend threw', e);
      }
    } else {
      console.warn('RESEND_API_KEY not set — request stored but email not sent');
    }

    return new Response(JSON.stringify({ ok: true, id: inserted.id }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: 'Unexpected error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
