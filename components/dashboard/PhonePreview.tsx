import React, { FC, useEffect, useRef, useState } from 'react';
import { getMenuPreviewContent } from './MenuPreview';
import CommonHeader from './CommonHeader';
import { BusinessInfoType } from './BusinessType'; // Asegúrate de que la ruta sea correcta

export interface PhonePreviewProps {
  imageSrc?: string | null;
  businessName?: string;
  logo?: string | null;
  dbLogoUrl?: string | null;
  businessInfo?: BusinessInfoType | null;
  currentStep: string;
  sectionName: string; 
}

const PhonePreview: FC<PhonePreviewProps> = ({
  imageSrc,
  businessName,
  logo,
  dbLogoUrl,
  businessInfo,
  currentStep,
  sectionName, // Usa directamente esta prop
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const logoToDisplay = logo ?? businessInfo?.logo ?? dbLogoUrl ?? null;

  useEffect(() => {
    const updateIframeContent = async () => {
      if (iframeRef.current) {
        try {
          let content = '';

          if (currentStep === '01') {
            // Muestra el contenido completo (incluyendo QR y nombre de la empresa) en el paso 1
            content = await getMenuPreviewContent(imageSrc, businessName, logoToDisplay);
          } else {
            // Muestra solo el logo de la empresa y el nombre de la sección en otros pasos
            content = `
              <html>
              <head>
                <link href="/tailwind.css" rel="stylesheet">
              </head>
              <body style="display: flex; flex-direction: column; height: 100vh; justify-content: flex-start;">
                <main class="shadow-md rounded-md p-4 flex flex-col items-center justify-center mt-auto">
                  <div class="text-center flex flex-col items-center">
                    <div style="position: relative; width: 100%; minHeight: 35px;">
                      <p class="text-black font-bold text-sm mb-2">@${businessName}</p>
                      <p className="text-black font-bold text-sm mb-2">{sectionName}</p>
                    </div>
                  </div>
                </main>
              </body>
              </html>
            `;
          }

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
  }, [imageSrc, businessName, logoToDisplay, currentStep, sectionName]);

  return (
    <div id="React--Preview" className="preview-wrap">
      <CommonHeader logoToUse={logoToDisplay} />
      <iframe ref={iframeRef} style={{ border: 'none', width: '100%', height: '100%' }} title="Phone Preview"></iframe>
    </div>
  );
};

export default PhonePreview;
