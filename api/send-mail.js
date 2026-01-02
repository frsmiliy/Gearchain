import { Resend } from 'resend';

const resend = new Resend('re_FRW4ie1U_NNgJiydEd3H5EfYtzGMUC1yZ');

export default async function handler(req, res) {
  // Erlaubt deiner Webseite, auf diese Funktion zuzugreifen
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'POST') return res.status(405).json({ error: 'Nur POST erlaubt' });

  const { email, name, gcCode, product } = req.body;

  try {
    await resend.emails.send({
      from: 'GearChain <onboarding@resend.dev>',
      to: [email],
      subject: 'Bestätigung deiner GearChain',
      // WICHTIG: Erstelle ein Template in Resend mit diesem Namen:
      template_id: 'gearchain-confirm', 
      parameters: {
        name: name,
        code: gcCode,
        product: product
      }
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
