import sequelize from '@/../../db/database';

async function getBusinessByUserId(req, res) {
  const { userId } = req.query; // Obtén el userId desde la consulta

  try {
    console.log("UserId recibido:", userId);

    const result = await sequelize.query(
      'SELECT * FROM businesses WHERE userId = :userId',
      {
        replacements: { userId },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    console.log("Resultado de la consulta SQL:", result);

    if (result.length === 0) {
      return res.status(200).json({ business: null });
    }
    
    // Si se encontraron resultados, devuelve los resultados como JSON
    return res.status(200).json(result[0]);
  } catch (error) {
    console.error('Error consultando la base de datos:', error);
    // En caso de error en la consulta, devuelve un 500 Internal Server Error
    return res.status(500).json({ error: 'Error al consultar la base de datos.' });
  }
}

export default getBusinessByUserId;
