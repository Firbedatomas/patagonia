// CommonHeader.tsx

import Image from 'next/image';

interface CommonHeaderProps {
  logoToUse: string | null;
}


const CommonHeader: React.FC<CommonHeaderProps> = ({ logoToUse }) => {
  return (
    <header className="bg-transparent p-2 mt-2 flex items-center justify-center shadow-md">
      <div className="text-center">
        {logoToUse ? 
          // Utiliza etiqueta img para URLs locales
          <div style={{ position: 'relative', width: '100%', minHeight: '35px' }}>
          <img src={logoToUse} alt="Logo de la empresa" style={{ width: '60px', height: 'auto' }} />
          </div> 

          : 
          <div className="text-gray-500 font-bold text-xl">Logo</div>}
      </div>
    </header>
  );
};
export default CommonHeader;
