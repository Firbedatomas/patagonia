import Product from '../../../models/Product'; // Asegúrate de que la ruta sea correcta
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const {  sectionId, productName, description, price } = req.body;

      // Por ejemplo, asegurándote de que existen en la base de datos

      const newProduct = await Product.create({
        sectionId,
        productName,
        description,
        price,
      });

      return res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error al crear producto:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
