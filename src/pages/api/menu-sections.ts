//menu-sections.ts
import { NextApiRequest, NextApiResponse } from 'next';
import MenuSection from '../../../models/MenuSection'; // Ajusta la ruta según sea necesario

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Manejar solicitudes POST
  if (req.method === 'POST') {
    const { businessId, sectionName, description } = req.body;

    // Valida los campos requeridos
    if (!businessId || !sectionName) {
      return res.status(400).json({ message: 'businessId and sectionName are required' });
    }

    try {
      // Crear una nueva sección
      const newSection = await MenuSection.create({
        sectionName,
        description,
        businessId
      });

      return res.status(201).json(newSection);
    } catch (error) {
      console.error('Error in /api/menu-sections POST:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // Manejar solicitudes GET
  else if (req.method === 'GET') {
    const { businessId } = req.query;

    // Valida que se proporcionó el businessId
    if (!businessId) {
      return res.status(400).json({ message: 'businessId is required' });
    }

    try {
      // Buscar secciones asociadas con el businessId
      const sections = await MenuSection.findAll({
        where: { businessId: businessId }
      });
      
      // Si no se encuentran secciones, devuelve un estado 404
      if (!sections || sections.length === 0) {
        return res.status(404).json({ message: 'No sections found for this businessId' });
      }

      // Se encontraron secciones, devolver los datos
      return res.status(200).json(sections);
    } catch (error) {
      console.error('Error in /api/menu-sections GET:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // Método no soportado
  else {
    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
