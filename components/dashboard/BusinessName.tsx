import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface NombreDelNegocioProps {
  businessName: string;
  onBusinessNameChange: (newName: string) => void;
}

const NombreDelNegocio: React.FC<NombreDelNegocioProps> = ({ businessName, onBusinessNameChange }) => {
  const [inputValue, setInputValue] = useState(businessName);
  const [isNameAvailable, setIsNameAvailable] = useState<boolean | null>(null); // Cambio aquí: Ahora puede ser null, true o false

  useEffect(() => {
    let cancelToken = axios.CancelToken;
    let source = cancelToken.source();

    const checkBusinessNameAvailability = async () => {
      try {
        const response = await axios.get(`/api/checkBusinessName?name=${inputValue}`, {
          cancelToken: source.token,
        });
        setIsNameAvailable(response.data.isAvailable);
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          console.error('Error al verificar la disponibilidad del nombre', error);
        }
      }
    };

    if (inputValue) { // Solo verifica si hay algo escrito
      checkBusinessNameAvailability();
    } else {
      setIsNameAvailable(null); // Reset si el campo está vacío
    }

    return () => {
      source.cancel();
    };
  }, [inputValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const normalizedValue = e.target.value.toLowerCase(); // Nueva línea
    setInputValue(normalizedValue); // Modificada
    onBusinessNameChange(normalizedValue); // Modificada
  };

  return (
    <div>
      <label htmlFor="businessName" className="block text-sm font-medium text-gray-600">
        Nombre del Negocio:
      </label>
      <input 
  type="text" 
  id="businessName"  
  name="businessName" 
  style={{ textTransform: 'capitalize' }}
  value={inputValue}
  onChange={handleChange}
  maxLength={15}  // Cambiado a 15
  className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:border sm:text-sm ${isNameAvailable === false ? 'border-red-600' : isNameAvailable === true ? 'border-green-600' : 'border-gray-300'}`}
/>

{isNameAvailable === true && <p className="text-green-600">Este nombre está disponible.</p>}
{isNameAvailable === false && <p className="text-red-600">Este nombre no está disponible.</p>}

    </div>
  );
};

export default NombreDelNegocio;