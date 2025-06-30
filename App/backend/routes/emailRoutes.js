const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// POST /api/email/send
router.post('/send', async (req, res) => {
  const { invoices } = req.body;

  const approved = invoices.filter(inv => inv.Action === 'PayToday');
  const deferred = invoices.filter(inv => inv.Action === 'Deferred');

  const htmlContent = `
    <h2>✅ Approved Invoices</h2>
    <ul>
      ${approved.map(inv => `<li>${inv.InvoiceNumber}</li>`).join('')}
    </ul>
    <h2>🕒 Deferred Invoices</h2>
    <ul>
      ${deferred.map(inv => `<li>${inv.InvoiceNumber} - ${inv.DeferredDate} - ${inv.Comment || 'No comment'}</li>`).join('')}
    </ul>
  `;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // ⚠️ use App Password from Gmail, not real password
      }
    });

    await transporter.sendMail({
      from: 'shaikkhajahussainr@gmail.com',
      to: 'hussainysas@gmail.com',
      subject: 'Invoice Approval Summary',
      html: htmlContent
    });

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: 'Email failed to send' });
  }
});

module.exports = router;
