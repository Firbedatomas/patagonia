import QRCode from 'qrcode';
import Image from 'next/image';

interface QrCodeComponentProps {
  businessName: string;
}

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

export const QrCodeComponent: React.FC<QrCodeComponentProps> = ({ businessName }) => {
  const safeBusinessName = generateSafeBusinessName(businessName);
  const qrCodeUrl = `http://localhost:3000/${safeBusinessName}`;

  return (
    <div>
      <p className="text-lg mr-2" style={{ color: 'black', fontSize: '1.25rem', fontWeight: 'bold' }}>
        @{businessName}
      </p>
      <Image src={qrCodeUrl}  width="100"
            height="100"
            layout="responsive" alt="QR Code" style={{ width: 35, height: 35 }} />
    </div>
  );
};

export default QrCodeComponent;
