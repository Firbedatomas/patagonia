import React from 'react';
import Image from 'next/image';
import { generateSafeBusinessName } from '../utils';  
interface QrCodeComponentProps {
  businessName: string;
}

export const QrCodeComponent: React.FC<QrCodeComponentProps> = ({ businessName }) => {
  const safeBusinessName = generateSafeBusinessName(businessName);
  const qrCodeDataUrl = `http://localhost:3000/${safeBusinessName}`; 
  return (
    <div className="flex flex-col items-center justify-end" style={{ minWidth: '100px' }}>
      <div className="flex-shrink-0">
        <Image src={qrCodeDataUrl}  width={10} height={10} alt="QR Code" className="mx-auto rounded-xl" />
      </div>
      <p className="text-sm mr-2 truncate" style={{ color: 'black', fontSize: '0.875rem', fontWeight: 'bold', maxWidth: '165px' }}>
        @{businessName}
      </p>
    </div>
  );
};

export default QrCodeComponent;
