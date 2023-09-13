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
    <div className="flex items-center justify-between" style={{ minWidth: '200px' }}>
      <p className="text-lg mr-2 truncate" style={{ color: 'black', fontSize: '1.25rem', fontWeight: 'bold', maxWidth: '165px' }}>
        @{businessName}
      </p>
      <div className="flex-shrink-0">
        <Image src={qrCodeUrl}  width={35} height={35} alt="QR Code" className="mx-auto" />
      </div>
    </div>
  );
};


export default QrCodeComponent;
