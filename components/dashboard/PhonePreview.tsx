import React, { FC, useEffect, useRef } from 'react';
import { getMenuPreviewContent } from './MenuPreview'; 

interface PhonePreviewProps {
  imageSrc?: string | null;
  businessName?: string;
}

const PhonePreview: FC<PhonePreviewProps> = ({ imageSrc, businessName }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const updateIframeContent = async () => {
      if (iframeRef.current) {
        try {
          const content = await getMenuPreviewContent(imageSrc, businessName);
          const contentWindow = iframeRef.current.contentWindow;
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
  }, [imageSrc, businessName]);

  return (
    <div id="React--Preview" className="preview-wrap">
      <iframe ref={iframeRef} style={{ border: 'none', width: '100%', height: '100%' }} title="Phone Preview"></iframe>
    </div>
  );  
};

export default PhonePreview;
