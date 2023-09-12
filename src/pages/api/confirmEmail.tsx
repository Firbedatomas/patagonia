import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/../../models/User';

const confirmEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { token } = req.query;

  // Buscar el usuario por el token de verificación
  const user = await User.findOne({
    where: { verificationToken: token },
  });

  if (!user) {
    return res.status(400).json({ error: 'Token inválido o expirado' });
  }

  // Aquí, podrías actualizar el estado del usuario para marcarlo como verificado
  await User.update(
    { verified: true, verificationToken: null }, // Asume que tienes un campo 'verified'
    { where: { id: user.id } }
  );

  return res.status(200).json({ message: 'Correo electrónico verificado con éxito' });
};

export default confirmEmail;
