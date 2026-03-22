import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS configuration for Vercel
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { city, region, country_name, ip, userAgent, language, screenRes } = req.body || {};
    
    let textContent = `Great news! Someone just viewed your portfolio picture.\n\n`;
    textContent += `📍 Location: ${city || 'Unknown'}, ${region || ''} ${country_name || 'Unknown'} (IP: ${ip || 'Unknown'})\n`;
    textContent += `🖥️ Device/Browser: ${userAgent || 'Unknown'}\n`;
    textContent += `📏 Screen Resolution: ${screenRes || 'Unknown'}\n`;
    textContent += `🌐 Language: ${language || 'Unknown'}\n`;
    // We use a generic Date for the timestamp since Vercel might execute in different regions
    textContent += `⏰ Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n\n`;
    textContent += `You are getting noticed! Keep up the great work!`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // The authenticated sender (must match to avoid spam filters)
      to: process.env.EMAIL_USER,
      subject: `[Portfolio Insight] New Visitor from ${city || 'Someone'}!`,
      text: textContent,
    };
    
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('[Visit Log Error]', error);
    return res.status(500).json({ error: 'Failed to log visit.' });
  }
}
