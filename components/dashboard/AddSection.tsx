import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BusinessInfo, AddSectionProps } from '@/types/types'; // Ajusta la ruta según la estructura de tu proyecto
import MenuSectionPreview from '../MenuSectionPreview'; // Ajusta la ruta según sea necesario

// Interfaces adicionales para los estados del formulario
interface SectionFormState {
  sectionName: string;
  description: string;
}

// Componente principal
const AddSection: React.FC<AddSectionProps> = ({ businessId, businessInfoProp }) => {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
  const [section, setSection] = useState<SectionFormState>({ sectionName: '', description: '' });

  // Función para manejar el cambio en los campos del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSection((prev) => ({ ...prev, [name]: value }));
  };

  // Función para manejar la presentación del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessId) return; // Verificar que el businessId está presente

    try {
      const response = await axios.post('/api/menu-sections', {
        ...section,
        businessId: businessId,
      });

      console.log(response.data);
      setSection({ sectionName: '', description: '' }); // Resetear el formulario
    } catch (error) {
      console.error('Error al agregar la sección del menú', error);
    }
  };

  // Obtener la información del negocio cuando el componente se monta
  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        if (businessId) {
          const response = await axios.get(`/api/getBusinessInfo?businessId=${businessId}`);
          setBusinessInfo(response.data);
        }
      } catch (error) {
        console.error('Error fetching business info', error);
      }
    };

    fetchBusinessInfo();
  }, [businessId]);

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-semibold text-gray-900">Agregar Sección al Menú</h1>
      {businessInfo && (
        <div className="mt-4">
          <h2 className="text-lg font-medium text-gray-700">Información del Negocio: {businessInfo.businessName}</h2>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div>
          <label htmlFor="sectionName" className="block text-sm font-medium text-gray-700">Nombre de la Sección:</label>
          <input
            id="sectionName"
            name="sectionName"
            type="text"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={section.sectionName}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción (Opcional):</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={section.description}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Agregar Sección
        </button>
      </form>
    </div>
  );
};

export default AddSection;
