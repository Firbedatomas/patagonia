// CommonHeader.tsx

import Image from 'next/image';

interface CommonHeaderProps {
  logoToUse: string | null;
  businessName?: string; // Haciendo que businessName sea opcional
}

const CommonHeader: React.FC<CommonHeaderProps> = ({ logoToUse, businessName }) => {
  return (
    <header className="bg-transparent p-2 mt-2 flex items-center justify-start shadow-md">
      {logoToUse && 
        <img src={logoToUse} alt="Logo de la empresa" style={{ width: '40px', height: 'auto', marginRight: '8px' }} />
      }
      <p className="text-black font-bold text-sm">@{businessName || 'Nombre de negocio no disponible'}</p>
    </header>
  );
};

export default CommonHeader;
