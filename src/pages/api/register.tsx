import User from '@/../../models/User';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { Op } from 'sequelize';
import { sendVerificationEmail } from '@/../../utils/email';
import { generateVerificationToken } from '@/../utils/generateToken';

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { businessName, fullName, phoneNumber, email, password, timezone, languagePreference } = req.body;

  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ email }],
    },
  });
  // Verificar si los valores son nulos o indefinidos
if (!timezone || !languagePreference) {
  return res.status(400).json({ error: 'Los campos de zona horaria y preferencia de idioma son obligatorios' });
}
  if (existingUser) {
    return res.status(400).json({ error: 'El correo electrónico o nombre de usuario ya están en uso' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generar un token de verificación
    const verificationToken = generateVerificationToken();

    const newUser = await User.create({
      businessName,
      fullName,
      phoneNumber,
      email,
      password: hashedPassword,
      timezone,
      languagePreference,
      verificationToken  // Asegurarse de que este valor se está guardando
    });

    // Enviar correo electrónico de verificación
    await sendVerificationEmail(email, verificationToken);

    const { password: _, ...safeUser } = newUser.toJSON();
    res.status(201).json(safeUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo registrar al usuario' });
  }
};

export default register;
