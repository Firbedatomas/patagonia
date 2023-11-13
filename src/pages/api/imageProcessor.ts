// imageProcessor.ts
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';


export const generateBusinessNameSlug = (businessName: string): string => {
    return businessName.replace(/\s+/g, '-').toLowerCase();
};

export async function processAndStoreImage(logoFile: any, businessNameSlug: string) {
    const inputPath = logoFile.path;
    const outputPath = path.join(
      'public', 
      'uploads', 
      'businesses', 
      businessNameSlug, 
      'logo', 
      'businesslogo.webp'
    );
  
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
  
    fs.unlinkSync(inputPath);
  
    return outputPath.replace('public', '');
  }
  
