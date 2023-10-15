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
  updateStepStatus: (newCurrentStep: string) => void;  // Asegúrate de que este tipo esté correcto
  isGoogleMapLoaded: boolean;  // Nueva prop
}

  

interface TipoDeNegocioProps {
    setBusinessTypes: (types: string[]) => void;
    selectedValue: string;
    onChange: (newValue: string) => void;
}

interface CampoDeDireccionProps {
    onChange: (newValue: string) => void;
}

const useNameAvailability = (businessName: string) => {
    const [isNameAvailable, setIsNameAvailable] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkNameAvailability = async () => {
            try {
                const response = await axios.get('/api/checkBusinessName', { params: { name: businessName } });
                setIsNameAvailable(response.data.isAvailable);
            } catch (error) {
                console.error('Error verificando la disponibilidad del nombre', error);
                setError('Error verificando la disponibilidad del nombre');
            }
        };

        if (businessName !== "") {
            checkNameAvailability();
        }
    }, [businessName]);

    return { isNameAvailable, error };
};

  const BusinessForm: React.FC<BusinessFormProps> = ({ userId, businessName, onBusinessNameChange, onHeaderImageChange, setCurrentStep, updateStepStatus, isGoogleMapLoaded }) => {

 
    const [isPreviewAvailable, setPreviewAvailable] = useState(false);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [businessTypes, setBusinessTypes] = useState<string[]>([]);
    const [selectedBusinessType, setSelectedBusinessType] = useState<string>("");
    const [isGoogleApiLoaded] = useState(true);
    const [businessType, setBusinessType] = useState("");
    const [address, setAddress] = useState("");
    const [logo, setLogo] = useState<File | null>(null);
    const { isNameAvailable, error } = useNameAvailability(businessName);

    const [isFormComplete, setIsFormComplete] = useState(false);

    useEffect(() => {
       
        setIsFormComplete(
          businessName !== "" && 
          businessType !== "" && 
          address !== "" && 
          logo !== null && 
          isNameAvailable === true
        );
    }, [businessName, businessType, address, logo, isNameAvailable]);
    
    const handlePreviewAvailable = (isAvailable: boolean, images: string[]) => {
        setPreviewAvailable(isAvailable);
        setPreviewImages(images);
        if (images.length > 0) {
            onHeaderImageChange(images[0]);
        } else {
            onHeaderImageChange(null);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        if (userId) {
          try {
            let imageSrc = null;
            if (previewImages.length > 0) {
                imageSrc = previewImages[0];
            }
    
            // Aquí es donde creas un objeto FormData y agregas tus datos a él
            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('businessName', businessName);
            formData.append('businessType', businessType);
            formData.append('address', address);
            if (logo) {
              formData.append('logo', logo);
            }
            if (imageSrc) {
              formData.append('imageSrc', imageSrc);
            }
    
            // Y luego envías ese objeto FormData en tu solicitud POST
            const response = await axios.post('/api/createBusiness', formData);
    
            if (response.status === 200) {
              // Aquí, asumimos que una respuesta con estado 200 significa éxito
              console.log("Negocio creado exitosamente:", response.data);
              setCurrentStep('02');
              updateStepStatus('02');  // Actualizar el estado del paso aquí
              // Puedes redirigir al usuario o mostrar un mensaje de éxito aquí
            } else {
              // Puedes añadir aquí manejo para otros códigos de estado que consideres como éxito
              console.error("Respuesta inesperada del servidor:", response);
            }
          } catch (error) {
            if (axios.isAxiosError(error)) {
              // Aquí puedes manejar errores específicos de Axios
              console.error("Error de Axios:", error.response?.data);
            } else {
              // Aquí manejarías otros tipos de errores (no Axios)
              console.error("Error inesperado:", error);
            }
          }
 
        } else {
          console.error('userId no está definido');
        }
    };
    

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <NombreDelNegocio 
                businessName={businessName} 
                onBusinessNameChange={onBusinessNameChange}
            />
           <TipoDeNegocio 
            setBusinessTypes={setBusinessTypes} 
            selectedValue={businessType} 
            onChange={(newValue: string) => setBusinessType(newValue)}
        />
          {isGoogleApiLoaded && <CampoDeDireccion onChange={(newValue: string) => setAddress(newValue)} isGoogleMapLoaded={isGoogleMapLoaded} />}

            <AcceptMaxFiles 
                onPreviewAvailable={handlePreviewAvailable} 
                onFileUpload={(file) => setLogo(file)}
                logo={logo}
            />
        <button 
    type="submit" 
    className={`px-4 py-2 rounded font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${isFormComplete ? 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600' : 'bg-indigo-500 hover:bg-indigo-400 focus-visible:outline-indigo-500'}`} 
    disabled={!isFormComplete}
>
    Continuar
</button>

        </form>
    );
};

export default BusinessForm;