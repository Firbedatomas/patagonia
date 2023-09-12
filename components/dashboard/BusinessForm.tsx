import React, { useState, useEffect } from 'react';
import NombreDelNegocio from './BusinessName';
import TipoDeNegocio from './BusinessType';
import CampoDeDireccion from './AddressField';
import AcceptMaxFiles from './AcceptMaxFiles';
import Image from 'next/image';

interface BusinessFormProps {
    userId: string;
    businessName: string;
    onBusinessNameChange: (newName: string) => void;
    onHeaderImageChange: (newImage: string | null) => void; // Nueva prop para manejar el cambio de la imagen del encabezado
}

const BusinessForm: React.FC<BusinessFormProps> = ({ userId, businessName, onBusinessNameChange, onHeaderImageChange }) => {

    const [isPreviewAvailable, setPreviewAvailable] = useState(false);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
   
    const [businessTypes, setBusinessTypes] = useState<string[]>([]);
    const [selectedBusinessType, setSelectedBusinessType] = useState<string>("");
  
    const [isGoogleApiLoaded] = useState(true);
    
    const handlePreviewAvailable = (isAvailable: boolean, images: string[]) => {
        setPreviewAvailable(isAvailable);
        setPreviewImages(images);
        if (images.length > 0) {
            onHeaderImageChange(images[0]); // Llamar al método onHeaderImageChange con la nueva imagen
        } else {
            onHeaderImageChange(null); // Resetear a null si no hay imágenes
        }
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        onBusinessNameChange(newName); // Llama a la función proporcionada por Dashboard
    };

    return (
        <form className="space-y-4">
            {/* El bloque siguiente se ha eliminado porque la vista previa de la imagen ahora se maneja en otro lugar */}
            {/*
            {isPreviewAvailable && (
                <aside className="flex flex-wrap w-1/3">
                    {previewImages.map((src, index) => (
                        <div key={index} className="w-1/2 p-2">
                            <img src={src} alt={`Preview ${index}`} className="max-w-full h-auto rounded" />
                        </div>
                    ))}
                </aside>
            )}
            */}
            <NombreDelNegocio 
                businessName={businessName} 
                onBusinessNameChange={onBusinessNameChange} // Pasar el callback aquí
            />
            <TipoDeNegocio 
                setBusinessTypes={setBusinessTypes} 
                selectedValue={selectedBusinessType} 
                onChange={(newValue) => setSelectedBusinessType(newValue)}
            />
            {isGoogleApiLoaded && <CampoDeDireccion />}
            <AcceptMaxFiles onPreviewAvailable={handlePreviewAvailable} />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Continuar
            </button>
        </form>
    );
};

export default BusinessForm;