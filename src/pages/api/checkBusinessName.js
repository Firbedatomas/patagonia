import Business from '@/../../models/Business';

const checkBusinessName = async (req, res) => {
    if (req.method === 'GET') {
        let { name } = req.query;
    
        // Normalizamos a minúsculas
        name = name.toLowerCase();
    

    try {
        const business = await Business.findOne({ where: { businessName: name } });
      
      if (business) {
        return res.status(200).json({ isAvailable: false });
      } else {
        return res.status(200).json({ isAvailable: true });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Error al verificar la disponibilidad del nombre del negocio' });
    }
  } else {
    return res.status(405).end(); // Método no permitido
  }
};

export default checkBusinessName;
