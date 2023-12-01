import React, { useEffect, useState } from 'react';
import { LoadScript, StandaloneSearchBox, Libraries } from '@react-google-maps/api';

interface CampoDeDireccionProps {
  onChange: (newValue: string) => void; 
  isGoogleMapLoaded: boolean;  // Nueva prop
}
const libraries: Libraries = ['places'];
 
const CampoDeDireccion: React.FC<CampoDeDireccionProps> = ({ onChange, isGoogleMapLoaded }) => {
  

  const [isGoogleApiLoaded, setGoogleApiLoaded] = useState(false);
  const [address, setAddress] = useState("");
  const googleMapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || "";

  useEffect(() => {
    if (googleMapApiKey) {
      setGoogleApiLoaded(true);
    } else {
      console.error('API Key no definida');
    }
  }, [googleMapApiKey]);

  return (
    isGoogleMapLoaded && (  // Utilizando la nueva prop
      <div className="relative">
        <label htmlFor="address" className="block text-sm font-medium text-gray-600">
          Dirección:
        </label>
        <LoadScript
          googleMapsApiKey={googleMapApiKey}
          libraries={libraries}
        >
          <StandaloneSearchBox
            onLoad={(ref) => ref && ref.addListener('places_changed', () => {
              const place = ref.getPlaces()?.[0];
              if (place && place.formatted_address) {
                setAddress(place.formatted_address);
                onChange(place.formatted_address);
              }
            })}
          >
            <input
              type="text"
              placeholder="Escribe la dirección"
              className="block w-full px-4 py-2 border border-gray-300 rounded-l-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </StandaloneSearchBox>
        </LoadScript>
      </div>
    )
  );
};

export default CampoDeDireccion;
