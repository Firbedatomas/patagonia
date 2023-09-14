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
        
        let imageSrc = null;
        if (previewImages.length > 0) {
            imageSrc = previewImages[0];
        }

        const response = await fetch('/api/createBusiness', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                businessName,
                businessType,
                address,
                imageSrc,
            }),
        });

        const data = await response.json();
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <NombreDelNegocio 
                businessName={businessName} 
                onBusinessNameChange={onBusinessNameChange}
            />
           <TipoDeNegocio 
            setBusinessTypes={setBusinessTypes} 
            selectedValue={selectedBusinessType} 
            onChange={(newValue: string) => setSelectedBusinessType(newValue)}
        />
            {isGoogleApiLoaded && <CampoDeDireccion onChange={(newValue: string) => setAddress(newValue)}/>}
            <AcceptMaxFiles 
                onPreviewAvailable={handlePreviewAvailable} 
                onFileUpload={(file) => setLogo(file)}
                logo={logo}
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
