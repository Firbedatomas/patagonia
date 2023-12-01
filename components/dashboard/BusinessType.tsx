// TipoDeNegocio.tsx
import { useEffect, useState } from 'react';

interface TipoDeNegocioProps {
  setBusinessType: (newType: string) => void;
  selectedValue: string;
  onChange: (newValue: string) => void;
}


export interface BusinessInfoType {
  // Definición de los campos del tipo BusinessInfoType
  businessId?: string;
  businessName?: string;
  address?: string;
  logo?: string;
}

const TipoDeNegocio: React.FC<TipoDeNegocioProps> = ({ setBusinessType, selectedValue, onChange }) => {
  const [businessTypes, setBusinessTypes] = useState<string[]>([]);
  
  useEffect(() => {
    async function fetchBusinessTypes() {
      try {
        const response = await fetch('/api/getBusinessTypes');
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        setBusinessTypes(data);
      } catch (error) {
        console.error('Error al obtener los tipos de negocio:', error);
      }
    }

    fetchBusinessTypes();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setBusinessType(newValue);
  };

  return (
    <div>
      <label htmlFor="businessType" className="block text-sm font-medium text-gray-600">
        Tipo de Negocio:
      </label>
      <select 
        id="businessType" 
        name="businessType" 
        value={selectedValue}
        onChange={handleChange}
        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option disabled value="">
          Tipo de negocio
        </option>
        {businessTypes.map((type, index) => (
          <option key={`${type}-${index}`} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TipoDeNegocio;
