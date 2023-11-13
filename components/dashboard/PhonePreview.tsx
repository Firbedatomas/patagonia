// PhonePreview.tsx
import React, { FC, useEffect, useRef } from 'react';
import { getMenuPreviewContent } from './MenuPreview'; 
import CommonHeader from './CommonHeader';

export interface BusinessInfoType {
  businessId?: string;
  businessName?: string;
  address?: string;
  logo?: string;
}

interface PhonePreviewProps {
  imageSrc?: string | null;
  businessName?: string;
  logo?: string | null;
  dbLogoUrl?: string | null;
  businessInfo?: BusinessInfoType | null;
}

const PhonePreview: FC<PhonePreviewProps> = ({ imageSrc, businessName, logo, dbLogoUrl, businessInfo }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Simplificado a una sola línea utilizando operador de coalescencia nula.
  const logoToDisplay = logo ?? businessInfo?.logo ?? dbLogoUrl ?? null;

  useEffect(() => {
    const updateIframeContent = async () => {
      if (iframeRef.current) {
        try {
          const content = await getMenuPreviewContent(imageSrc, businessName, logoToDisplay);
          const { contentWindow } = iframeRef.current;

          if (contentWindow) {
            contentWindow.document.open();
            contentWindow.document.write(content);
            contentWindow.document.close();
          } else {
            console.error('Error updating iframe content: contentWindow is null');
          }
        } catch (error) {
          console.error('Error updating iframe content:', error);
        }
      }
    };

    updateIframeContent();
  }, [imageSrc, businessName, logoToDisplay]);

  return (
    <div id="React--Preview" className="preview-wrap">
      <CommonHeader logoToUse={logoToDisplay} />
      <iframe ref={iframeRef} style={{ border: 'none', width: '100%', height: '100%' }} title="Phone Preview"></iframe>
    </div>
  );
};

export default PhonePreview;
