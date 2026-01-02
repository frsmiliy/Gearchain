import { Resend } from 'resend';

// Aktualisierter API-Key
const resend = new Resend('re_FRW4ie1U_NNgJiydEd3H5EfYtzGMUC1yZ');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name, gcCode, product } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'GearChain <robert.vogt@mailbox.org>',
      to: [email],
      subject: 'Deine GearChain Reservierung',
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: auto; padding: 40px; color: #1d1d1f;">
          <h1 style="font-size: 24px; font-weight: 600;">Vielen Dank, ${name}.</h1>
          <p style="font-size: 17px; color: #424245;">Deine Reservierung für die <strong>GearChain ${product} Edition</strong> ist bestätigt.</p>
          <div style="background-color: #f5f5f7; border-radius: 18px; padding: 30px; margin: 32px 0; text-align: center;">
            <p style="text-transform: uppercase; font-size: 12px; color: #86868b;">Zertifikat-ID</p>
            <p style="font-size: 32px; font-weight: 700; color: #0071e3; font-family: monospace;">${gcCode}</p>
          </div>
          <p style="font-size: 12px; color: #86868b;">© 2026 GearChain – Precision Engineering.</p>
        </div>
      `,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
