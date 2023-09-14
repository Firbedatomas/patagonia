import React, { useState, useEffect } from 'react';
import NombreDelNegocio from './BusinessName';
import TipoDeNegocio from './BusinessType';
import CampoDeDireccion from './AddressField';
import AcceptMaxFiles from './AcceptMaxFiles';
import axios from 'axios';

interface BusinessFormProps {
    userId: string;
    businessName: string;
    onBusinessNameChange: (newName: string) => void;
    onHeaderImageChange: (newImage: string | null) => void;
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

const BusinessForm: React.FC<BusinessFormProps> = ({ userId, businessName, onBusinessNameChange, onHeaderImageChange }) => {
    
    const [isPreviewAvailable, setPreviewAvailable] = useState(false);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [businessTypes, setBusinessTypes] = useState<string[]>([]);
    const [selectedBusinessType, setSelectedBusinessType] = useState<string>("");
    const [isGoogleApiLoaded] = useState(true);
    const [businessType, setBusinessType] = useState("");
    const [address, setAddress] = useState("");
    const [logo, setLogo] = useState<File | null>(null); // Aquí está el cambio
    const { isNameAvailable, error } = useNameAvailability(businessName);

    const [isFormComplete, setIsFormComplete] = useState(false);

    useEffect(() => {
        console.log('businessName:', businessName);
        console.log('businessType:', businessType);
        console.log('address:', address);
        console.log('logo:', logo);
        console.log('isNameAvailable:', isNameAvailable);
    
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

    return (
        <form className="space-y-4">
            <NombreDelNegocio 
                businessName={businessName} 
                onBusinessNameChange={onBusinessNameChange}
            />
            <TipoDeNegocio 
                setBusinessTypes={setBusinessTypes} 
                selectedValue={selectedBusinessType} 
                onChange={(newValue: string) => setBusinessType(newValue)}
            />
            {isGoogleApiLoaded && <CampoDeDireccion onChange={(newValue: string) => setAddress(newValue)}/>}
            <AcceptMaxFiles 
                onPreviewAvailable={handlePreviewAvailable} 
                onFileUpload={(file) => setLogo(file)}
                logo={logo}  // Aquí estás pasando la propiedad logo
            />

            <button 
                type="submit" 
                className="px-4 py-2 bg-blue-500 text-white rounded" 
                disabled={!isFormComplete}
            >
                Continuar
            </button>
        </form>
    );
};

export default BusinessForm;
