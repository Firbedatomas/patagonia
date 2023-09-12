import Business from '@/../../models/Business';  

const businesses = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const userId = req.query.userId;  // Obteniendo el userId desde el query string
      if (!userId) {
        return res.status(400).json({ error: 'Se requiere userId' });
      }
      const businesses = await Business.findAll({ where: { userId } });
      return res.status(200).json(businesses);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener los negocios' });
    }
  } else if (req.method === 'POST') {
    try {
      const newBusiness = req.body;
      const createdBusiness = await Business.create(newBusiness);
      return res.status(201).json(createdBusiness);
    } catch (error) {
      return res.status(500).json({ error: 'Error al crear el negocio' });
    }
  } else {
    return res.status(405).end();  // Método no permitido
  }
};

export default businesses;
