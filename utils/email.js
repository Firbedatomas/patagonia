import nodemailer from 'nodemailer';

export const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 587,
    secure: false,
    auth: {
      user: 'hola@bonafideargentina.com',
      pass: 'Sanandres1.',
    },
  });

  const mailOptions = {
    from: 'hola@bonafideargentina.com',
    to,
    subject,
    text,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return { success: false };
  }
};

export const sendVerificationEmail = async (to, verificationToken) => {
  const subject = 'Verificación de correo electrónico';
  const text = `Haz clic en el siguiente enlace para verificar tu correo electrónico: http://localhost:3000/api/verify-email?token=${verificationToken}`;
  const html = `
    <div style="background-color: #f2f2f2; padding: 20px; text-align: center;">
      <div style="max-width: 600px; margin: auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h1 style="font-size: 24px; margin-bottom: 20px;">Verifica tu correo electrónico</h1>
        <p style="font-size: 16px; margin-bottom: 30px;">Gracias por registrarte. Haz clic en el botón de abajo para verificar tu correo electrónico.</p>
        <a href="http://localhost:3000/verify-email?token=${verificationToken}" style="background-color: #4CAF50; color: white; padding: 14px 20px; margin: 8px 0; border: none; cursor: pointer; width: 100%; opacity: 0.9; border-radius: 4px; text-decoration: none;">
          Verificar correo electrónico
        </a>
      </div>
    </div>
  `;

  return sendEmail({ to, subject, text, html });
};
