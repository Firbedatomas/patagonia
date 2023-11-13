import { NextApiRequest, NextApiResponse } from 'next';
import Business from '@/../../models/Business';
import { Op } from 'sequelize';

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {  // Agregado async aquí
 
  const { businessId, userId } = req.query;

  try {
    // Lógica condicional para construir la consulta
    let whereCondition;
    if (businessId && userId) {
      whereCondition = { [Op.or]: [{ businessId }, { userId }] };
    } else if (businessId) {
      whereCondition = { businessId };
    } else if (userId) {
      whereCondition = { userId };
    }

    if (!whereCondition) {
      return res.status(400).json({ error: 'Faltan parámetros para la consulta' });
    }

    const business = await Business.findOne({ where: whereCondition });

    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }

    return res.status(200).json(business);

  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handleRequest;  // Exportando la función
