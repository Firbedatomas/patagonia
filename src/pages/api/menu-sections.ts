import { NextApiRequest, NextApiResponse } from 'next';
import MenuSection from '../../../models/MenuSection'; // Ajusta la ruta según sea necesario

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { businessId, sectionName, description } = req.body;
  
  // Valida los campos requeridos aquí (ejemplo básico)
  if (!businessId || !sectionName) {
    return res.status(400).json({ message: 'businessId and sectionName are required' });
  }

  try {
    const newSection = await MenuSection.create({
      sectionName,
      description,
      businessId
    });

    return res.status(201).json(newSection);
  } catch (error) {
    console.error('Error in /api/menu-sections:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
