import React, { FC, useEffect, useRef, useState } from 'react';
import CommonHeader from './CommonHeader';
import { BusinessInfoType } from './BusinessType';
import { getMenuPreviewContent } from './MenuPreview';

export interface PhonePreviewProps {
  imageSrc?: string | null;
  businessName?: string;
  logo?: string | null;
  dbLogoUrl?: string | null;
  businessInfo?: BusinessInfoType | null;
  currentStep: string;
  sectionName: string; // Esto será un array en el futuro
}

const PhonePreview: FC<PhonePreviewProps> = ({
  imageSrc,
  businessName,
  logo,
  dbLogoUrl,
  businessInfo,
  currentStep,
  sectionName,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const logoToDisplay = logo ?? businessInfo?.logo ?? dbLogoUrl ?? null;

  const [hasContent, setHasContent] = useState(false);

  useEffect(() => {
    const updateIframeContent = async () => {
      if (iframeRef.current && sectionName.trim() !== '') {
        let content = '';
        if (currentStep === '01') {
          content = await getMenuPreviewContent(imageSrc, businessName, logoToDisplay);
        } else {
          content = `
            <html>
              <head>
                <link href="/tailwind.css" rel="stylesheet">
              </head>
              <body class="bg-gray-100">
                <div class="container mx-auto p-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-white p-3 text-center flex justify-center items-center rounded-lg shadow-lg ${
                      hasContent ? 'animate-fadeIn' : ''
                    }">
                      <p class="text-black font-light text-sm">${sectionName}</p>
                    </div>
                  </div>
                </div>
              </body>
            </html>
          `;
        }

        const contentDocument = iframeRef.current.contentDocument;
        if (contentDocument) {
          contentDocument.open();
          contentDocument.write(content);
          contentDocument.close();
        }

        if (sectionName.trim() !== '') {
          setHasContent(true);
        } else {
          setHasContent(false);
        }
      }
    };

    updateIframeContent();
  }, [imageSrc, businessName, logoToDisplay, currentStep, sectionName, hasContent]);

  return (
    <div id="React--Preview" className="preview-wrap">
      <CommonHeader logoToUse={logoToDisplay} businessName={businessName || 'Nombre de negocio no disponible'} />
      <iframe ref={iframeRef} style={{ border: 'none', width: '100%', height: '100%' }} title="Phone Preview" />
    </div>
  );
};

export default React.memo(PhonePreview);
