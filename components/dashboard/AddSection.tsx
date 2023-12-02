// AddSection.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BusinessInfo, AddSectionProps } from '@/types/types';

interface SectionFormState {
  sectionName: string;
  description: string;
}

const AddSection: React.FC<AddSectionProps> = ({ businessId, businessInfoProp, onSectionNameChange }) => {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
  const [section, setSection] = useState<SectionFormState>({ sectionName: '', description: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSection(prev => ({ ...prev, [name]: value }));
    if (name === 'sectionName') {
      onSectionNameChange(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessId) return;

    try {
      const response = await axios.post('/api/menu-sections', {
        ...section,
        businessId: businessId,
      });
      console.log(response.data);
      setSection({ sectionName: '', description: '' });
    } catch (error) {
      console.error('Error al agregar la sección del menú', error);
    }
  };

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      if (businessId) {
        try {
          const response = await axios.get(`/api/getBusinessInfo?businessId=${businessId}`);
          setBusinessInfo(response.data);
        } catch (error) {
          console.error('Error fetching business info', error);
        }
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
