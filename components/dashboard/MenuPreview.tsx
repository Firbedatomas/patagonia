import { generateSafeBusinessName } from "./qr/QrCodeComponent";
import { generateQRCodeAsDataURL } from './qr/QrCodeComponent';
import Image from 'next/image';

interface MenuPreviewProps {
    imageSrc?: string | null;
  }
  
  export async function getMenuPreviewContent(imageSrc?: string | null, businessName?: string): Promise<string> {
    const safeBusinessName = businessName ? generateSafeBusinessName(businessName) : '';
    const qrCodeUrl = businessName ? await generateQRCodeAsDataURL(businessName) : '';
    
    return `
      <html>
      <head>
        <link href="/tailwind.css" rel="stylesheet">
      </head>
      <body class="flex flex-col min-h-screen p-0">
        <header class="bg-gradient-to-r from-purple-600 to-cyan-400 p-4 flex items-center justify-center shadow-md">
          <div class="text-center">
            ${imageSrc ? `<Image  width="100"
            height="100"
            layout="responsive" src="${imageSrc}" alt="Logo de la empresa" class="w-auto h-11 mx-auto" />` : '<div class="text-gray-500 font-bold text-xl">Logo</div>'}

          </div>
        </header>
        <main class=" shadow-md rounded-md p-4  flex flex-col items-center justify-center">
      
          <div class="text-center">
            <p class="text-black font-bold text-lg mb-2">@${businessName ?? ''}</p>
            ${qrCodeUrl ? `<Image  width="100"
            height="100"
            layout="responsive" src="${qrCodeUrl}" alt="QR Code" class="w-9 h-9" />` : ''}
          </div>
        </main>
      </body>
      </html>
      `;
  }
  
  export default getMenuPreviewContent; 
  