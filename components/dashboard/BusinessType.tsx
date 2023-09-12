import { useEffect, useState } from 'react';

interface TipoDeNegocioProps {
  setBusinessTypes: (types: string[]) => void;
  selectedValue: string;
  onChange: (newValue: string) => void;
}

const TipoDeNegocio: React.FC<TipoDeNegocioProps> = ({ setBusinessTypes, selectedValue, onChange }) => {
  // Declara el estado local businessTypes para mantener los tipos de negocio
  // También mantenemos un estado local que es un reflejo del estado externo para 
  // permitir que este componente manipule los datos sin afectar otros componentes
  const [businessTypes, setLocalBusinessTypes] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchBusinessTypes = async () => {
      try {
        const response = await fetch('/api/getBusinessTypes');
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        setBusinessTypes(data);
        setLocalBusinessTypes(data);
      } catch (error) {
        console.error('Error al obtener los tipos de negocio:', error);
      }
    };

    fetchBusinessTypes();
  }, [setBusinessTypes]);

  return (
    <div>
      <label htmlFor="businessType" className="block text-sm font-medium text-gray-600">
        Tipo de Negocio:
      </label>
      <select 
        id="businessType" 
        name="businessType" 
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
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
