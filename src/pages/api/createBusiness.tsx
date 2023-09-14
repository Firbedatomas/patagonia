// pages/api/createBusiness.ts

import { NextApiRequest, NextApiResponse } from 'next';
import Business from '@/../../models/Business';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const businessData = req.body;
      const newBusiness = await Business.create(businessData);
      res.status(200).json({ newBusiness });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(405).json({ message: 'Solo se permiten solicitudes POST' });
  }
};
