import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface NombreDelNegocioProps {
  businessName: string;
  onBusinessNameChange: (newName: string) => void;
}

const NombreDelNegocio: React.FC<NombreDelNegocioProps> = ({ businessName, onBusinessNameChange }) => {
  const [inputValue, setInputValue] = useState(businessName);
  const [isNameAvailable, setIsNameAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
  
    const checkBusinessNameAvailability = async () => {
      if (!inputValue) {
        setIsNameAvailable(null);
        return;
      }

      try {
        const response = await axios.get(`/api/checkBusinessName?name=${inputValue}`, {
          cancelToken: source.token,
        });
        setIsNameAvailable(response.data.isAvailable);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error('Error while checking name availability:', error);
        }
      }
    };
  
    checkBusinessNameAvailability();

    return () => source.cancel();
  }, [inputValue]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const normalizedValue = e.target.value.toLowerCase();
    setInputValue(normalizedValue);
    onBusinessNameChange(normalizedValue);
  };

  const inputClassName = `block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:border sm:text-sm ${
    isNameAvailable === false ? 'border-red-600' : 
    isNameAvailable === true ? 'border-green-600' : 'border-gray-300'
  }`;

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
        maxLength={15}  
        className={inputClassName}
      />
      {isNameAvailable !== null && (
        <p className={isNameAvailable ? "text-green-600" : "text-red-600"}>
          {isNameAvailable ? "Este nombre está disponible." : "Este nombre no está disponible."}
        </p>
      )}
    </div>
  );
};

export default NombreDelNegocio;
