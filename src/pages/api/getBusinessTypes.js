import sequelize from '@/../../db/database';  

const getBusinessTypes = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const [results] = await sequelize.query("SHOW COLUMNS FROM `businesses` LIKE 'businessType'");
      const enumValues = results[0].Type.match(/enum\(\'(.*)\'\)/)[1].split("','");
      res.status(200).json(enumValues);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los tipos de negocio' });
    }
  } else {
    res.status(405).end(); // Método no permitido
  }
};

export default getBusinessTypes;
