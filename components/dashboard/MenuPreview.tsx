// MenuPreview.tsx
import { generateSafeBusinessName, generateQRCodeAsDataURL } from './utils';

interface MenuPreviewProps {
    imageSrc?: string | null;
}

export async function getMenuPreviewContent(imageSrc?: string | null, businessName?: string, serverImageSrc?: string | null): Promise<string> {
    const safeBusinessName = businessName ? generateSafeBusinessName(businessName) : '';
    const qrCodeUrl = businessName ? await generateQRCodeAsDataURL(businessName) : '';
    const logoToUse = serverImageSrc || imageSrc;

    // Crear contenido del QR Code si es aplicable
    const qrCodeContent = qrCodeUrl ? `<img src="${qrCodeUrl}" alt="QR Code" class="w-1/2 h-1/2 rounded-lg" />` : '';

    return `
    <html>
    <head>
      <link href="/tailwind.css" rel="stylesheet">
    </head>
    <body style="display: flex; flex-direction: column; height: 100vh; justify-content: flex-start;">
      <!-- Aquí deberías renderizar CommonHeader, pero como es un componente React, no se puede usar directamente en este contexto -->
      <main class="shadow-md rounded-md p-4 flex flex-col items-center justify-center mt-auto">
        <div class="text-center flex flex-col items-center">
          ${qrCodeContent}
          <p class="text-black font-bold text-sm mb-2">@${safeBusinessName}</p>
        </div>
      </main>
    </body>
    </html>
    `;
}

export default getMenuPreviewContent;
