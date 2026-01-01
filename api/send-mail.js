export default async function handler(req, res) {
  // CORS erlauben, damit deine Website die API aufrufen darf
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { email, name, gcCode, product } = req.body;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer re_deFWHWSm_AxHSzRiYuGucdSqvRj4LJCcF`, // Dein Key aus dem Screenshot
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'GearChain <onboarding@resend.dev>',
        to: [email],
        subject: `Zertifikat reserviert: ${gcCode}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #0071e3;">Hallo ${name},</h2>
            <p>Deine Reservierung für das <b>${product}</b> war erfolgreich.</p>
            <p>Dein Zertifikat-Code: <span style="font-family: monospace; font-size: 1.2em; font-weight: bold;">${gcCode}</span></p>
            <p>Bewahre diesen Code gut auf.</p>
          </div>`
      }),
    });

    const data = await response.json();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
