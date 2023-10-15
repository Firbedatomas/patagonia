import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import Business from '@/../../models/Business'; // Asegúrate de que esta ruta es correcta
import fs from 'fs';
import path from 'path';
import sharp from 'sharp'; // Importa la biblioteca sharp

interface ExtendedRequest extends NextApiRequest {
  files: any[];
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const businessName = req.body.businessName; 
    const businessNameSlug = businessName.replace(/\s+/g, '-').toLowerCase();
    const destPath = path.join('uploads', 'businesses', businessNameSlug, 'logo');
    
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
    }
    
    cb(null, destPath);
  },
  filename: function (req, file, cb) {
    const businessName = req.body.businessName;
    const businessNameSlug = businessName.replace(/\s+/g, '-').toLowerCase();
    const destPath = path.join('uploads', 'businesses', businessNameSlug, 'logo', file.originalname);
    
    cb(null, file.originalname);

    // Asignar la ruta al objeto file para poder acceder a ella más tarde
    file.path = destPath;
  },
});

const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: ExtendedRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    upload.any()(req as any, res as any, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      try {
        const { userId, businessName, businessType, address, imageSrc } = req.body;
      
        const businessData = { userId, businessName, businessType, address, imageSrc };
        const newBusiness = await Business.create(businessData);
      
        // Usamos businessName en lugar de businessId
        const businessNameSlug = businessName.replace(/\s+/g, '-').toLowerCase();
        const logoFile = req.files?.find(file => file.fieldname === 'logo');
        if (logoFile) {
          const destPath = path.join('uploads', 'businesses', businessNameSlug, 'logo');
          if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath, { recursive: true });
          }
      
          // Aquí agrega la lógica de procesamiento de imágenes
          const processedImagePath = await processAndStoreImage(logoFile, businessNameSlug);
          await newBusiness.update({ logo: processedImagePath }); // Actualiza la ruta de la imagen procesada
        }
      
        res.status(200).json({ newBusiness });
      } catch (error: any) {
        console.error('Error al crear el negocio:', error);
        res.status(500).json({ error: error.message });
      }
    });
  } else {
    res.status(405).json({ message: 'Solo se permiten solicitudes POST' });
  }
};

// Función para procesar y almacenar imágenes
async function processAndStoreImage(logoFile: any, businessNameSlug: any) {
  const inputPath = logoFile.path; // Ruta de la imagen original
  const outputPath = path.join('uploads', 'businesses', businessNameSlug, 'logo', 'businesslogo.webp'); // Ruta de la imagen procesada

  // Procesa la imagen original, elimina metadatos y guárdala en formato WebP
  await sharp(inputPath)
    .metadata() // Obtén metadatos (opcional)
    .then(metadata => {
      // Elimina todos los metadatos de la imagen (EXIF, IPTC, etc.)
      return sharp(inputPath)
        .webp({ quality: 80 }) // Ajusta la calidad según tus preferencias (0-100)
        .toFile(outputPath);
    })
    .catch(error => {
      console.error('Error al procesar la imagen:', error);
      // Maneja el error de metadatos aquí
    });

  // Elimina la imagen original si es necesario
  fs.unlinkSync(inputPath);

  // Devuelve la ruta de la imagen procesada
  return `/${outputPath}`;
}
