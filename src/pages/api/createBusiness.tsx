// createBusiness.tsx
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import Business from '@/../../models/Business'; // Ajusta esta importación según tu estructura de carpetas
import { processAndStoreImage, generateBusinessNameSlug } from './imageProcessor';
import fs from 'fs';
import path from 'path';

interface MulterRequest extends NextApiRequest {
  files: any[]; // Aquí defines la propiedad files
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const businessNameSlug = generateBusinessNameSlug(req.body.businessName);
    const destPath = path.join('public', 'uploads', 'businesses', businessNameSlug, 'logo');
    fs.mkdirSync(destPath, { recursive: true });
    cb(null, destPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});


const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handleRequest = async (req: MulterRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Solo se permiten solicitudes POST' });
  }

  upload.any()(req as any, res as any, async (err: any) => {
    if (err) return res.status(500).json({ error: err.message });

    try {
      const { userId, businessName, businessType, address } = req.body;
      const businessData = { userId, businessName, businessType, address };
      const newBusiness = await Business.create(businessData);

      const logoFile = req.files?.find(file => file.fieldname === 'logo');
      if (logoFile) {
        const processedImagePath = await processAndStoreImage(logoFile, generateBusinessNameSlug(businessName));
        await newBusiness.update({ logo: processedImagePath.replace('public/', '') });
      }

      res.status(200).json({ newBusiness });
    } catch (error) {
      console.error('Error al crear el negocio:', error);
      res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
  });
};

export default handleRequest;
