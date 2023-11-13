// BusinessForm.tsx
import React, { useState, useEffect } from 'react';
import NombreDelNegocio from './BusinessName';
import TipoDeNegocio from './BusinessType';
import CampoDeDireccion from './AddressField';
import AcceptMaxFiles from './AcceptMaxFiles';
import axios from 'axios';

interface BusinessFormProps {
  userId: string | null;
  businessName: string;
  onBusinessNameChange: (newName: string) => void;
  onHeaderImageChange: (newImage: string | null) => void;
  setCurrentStep: (step: string) => void;
  updateStepStatus: (newCurrentStep: string) => void;
  isGoogleMapLoaded: boolean;
  handleFileUpload: (file: File | null) => void;
}

const BusinessForm: React.FC<BusinessFormProps> = ({
  userId,
  businessName,
  onBusinessNameChange,
  onHeaderImageChange,
  setCurrentStep,
  updateStepStatus,
  isGoogleMapLoaded,

}) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [businessType, setBusinessType] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [logo, setLogo] = useState<File | null>(null);
  const [isNameAvailable, setIsNameAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handleFileUpload = (file: File | null) => {
    setLogo(file); // Actualiza el estado logo con el archivo seleccionado
  };
  useEffect(() => {
    const checkNameAvailability = async () => {
      if (!businessName) {
        setIsNameAvailable(null);
        return;
      }

      try {
        const response = await axios.get('/api/checkBusinessName', { params: { name: businessName } });
        setIsNameAvailable(response.data.isAvailable);
      } catch (error) {
        console.error('Error verificando la disponibilidad del nombre', error);
        setError('Error verificando la disponibilidad del nombre');
      }
    };

    checkNameAvailability();
  }, [businessName]);

  const isFormComplete = businessName && businessType && address && isNameAvailable;

  const handlePreviewAvailable = (isAvailable: boolean, images: string[]) => {
    onHeaderImageChange(isAvailable && images.length > 0 ? images[0] : null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!userId) {
      setError('userId no está definido');
      return;
    }

    try {
      const formData = new FormData();
      
      formData.append('userId', userId);
      formData.append('businessName', businessName);
      formData.append('businessType', businessType);
      formData.append('address', address);
      if (logo) formData.append('logo', logo);
      if (previewImages.length > 0) formData.append('imageSrc', previewImages[0]);

      // Inspeccionando el contenido de formData
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
  
      if (previewImages.length > 0) formData.append('imageSrc', previewImages[0]);

      const response = await axios.post('/api/createBusiness', formData);
      if (response.status === 200) {
        setCurrentStep('02');
        updateStepStatus('02');
      } else {
        setError("Respuesta inesperada del servidor");
      }
    } catch (error) {
      setError('Error al enviar el formulario');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <NombreDelNegocio businessName={businessName} onBusinessNameChange={onBusinessNameChange} />
      <TipoDeNegocio
        setBusinessType={setBusinessType}
        selectedValue={businessType}
        onChange={setBusinessType}  
      />
      <CampoDeDireccion onChange={setAddress} isGoogleMapLoaded={isGoogleMapLoaded} />
      <AcceptMaxFiles onFileUpload={handleFileUpload} logo={logo} onPreviewAvailable={handlePreviewAvailable} />
      <button 
        type="submit" 
        className={`px-4 py-2 rounded font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${isFormComplete ? 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600' : 'bg-indigo-500 hover:bg-indigo-400 focus-visible:outline-indigo-500'}`} 
        disabled={!isFormComplete}
      >
        Continuar
      </button>
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
};

export default BusinessForm;
