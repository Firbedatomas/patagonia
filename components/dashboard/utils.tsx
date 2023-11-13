// utils.ts
import QRCode from 'qrcode';

export const generateSafeBusinessName = (name: string) => {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_')
    .replace(/[^\w-]/g, '')
    .toLowerCase();
};

export const generateQRCodeAsDataURL = async (businessName: string) => {
  const safeBusinessName = generateSafeBusinessName(businessName);
  const qrCodeUrl = `http://localhost:3000/${safeBusinessName}`;

  try {
    const url = await QRCode.toDataURL(qrCodeUrl);
    return url;
  } catch (err) {
    console.error(err);
    return '';
  }
};
