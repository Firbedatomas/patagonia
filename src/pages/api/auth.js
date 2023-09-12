import User from '@/../../models/User';
import bcrypt from 'bcryptjs';

const auth = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Encuentra al usuario por su email
    const user = await User.findOne({ where: { email } });

    // Si no se encuentra el email o la contraseña no coincide, devuelve un error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Elimina la contraseña hasheada y otros datos sensibles del objeto de respuesta
    const { password: _, role, isActive, multipleBusinesses, languagePreference, timezone, ...safeUser } = user.get();

    // Devuelve los datos del usuario seguros (sin la contraseña)
    res.status(200).json(safeUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al iniciar sesión' });
  }
};

export default auth;
