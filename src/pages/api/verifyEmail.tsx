import crypto from 'crypto';
import User from '@/../../models/User';
import { NextApiRequest, NextApiResponse } from 'next';
import { sendVerificationEmail } from '@/../utils/email';

const verifyEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { email } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({ error: 'El correo electrónico no está registrado' });
  }

  const verificationToken = crypto.randomBytes(32).toString('hex');

  await User.update(
    { verificationToken },
    { where: { id: user.id } }
  );

  const emailResult = await sendVerificationEmail(email, verificationToken);

  if (emailResult.success) {
    return res.status(200).json({ message: 'Correo de verificación enviado con éxito' });
  } else {
    return res.status(500).json({ error: 'No se pudo enviar el correo de verificación' });
  }
};

export default verifyEmail;
