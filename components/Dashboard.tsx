import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import BusinessForm from './dashboard/BusinessForm';
import VerificationAlert from './VerificationAlert';
import LoadingSpinner from './LoadingSpinner';
import { isVerified } from './isVerified';
import StepNavigation from './StepNavigation';
import PhonePreview from './dashboard/PhonePreview';
import AddSection from './dashboard/AddSection';
import { Session } from 'next-auth';
import { BusinessInfo } from '@/types/types'; 

interface BusinessInfoType {
  businessId?: string;
  businessName?: string;
  address?: string;
  logo?: string;
}

// Asegúrate de que la interfaz AddSectionProps incluya currentStep
interface AddSectionProps {
  businessId: string;
  businessInfoProp: BusinessInfo;
  currentStep: string; // Agrega esta propiedad
}


export default function Dashboard() {
  const [currentStep, setCurrentStep] = useState('01');
  const [businessInfo, setBusinessInfo] = useState<BusinessInfoType | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isGoogleMapLoaded, setIsGoogleMapLoaded] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [steps, setSteps] = useState([
    { id: '01', name: 'Datos del negocio', description: 'Cargaremos la información básica.', href: '#', status: 'upcoming' },
    { id: '02', name: 'Secciones del menú', description: 'Carga las secciones de tus productos.', href: '#', status: 'upcoming' },
    { id: '03', name: 'Productos', description: 'Carguemos tus primeros productos.', href: '#', status: 'upcoming' },
  ]);

  const { data: session } = useSession();
  const [sectionName, setSectionName] = useState('');
  useEffect(() => {
    if (session) {
      setBusinessName(session.user?.businessName?.toLowerCase() || '');
      const fetchBusiness = async () => {
        try {
          const userId = session.user?.id;
          const res = await fetch(`/api/getBusinessByUserId?userId=${userId}`);
          const data = await res.json();

          if (res.ok && data.businessId) {
            setBusinessInfo(data);
            setCurrentStep('02'); // Cambia a '02' cuando el negocio existe
            updateStepStatus('02');
            setIsGoogleMapLoaded(false);
          } else {
            setCurrentStep('01');
            updateStepStatus('01');
            setIsGoogleMapLoaded(true);
          }
        } catch (error) {
          console.error('Error fetching business:', error);
        }
      };

      fetchBusiness();
    }
  }, [session]);

  const updateStepStatus = useCallback((newCurrentStep: string) => {
    setSteps(prevSteps => prevSteps.map(step => ({
      ...step,
      status: step.id === newCurrentStep ? 'current' : parseInt(step.id) < parseInt(newCurrentStep) ? 'complete' : 'upcoming'
    })));
  }, []);

  const handleFileUpload = useCallback((file: File | null) => {
    setSelectedImage(file);
  }, []);

  const selectedImageUrl = selectedImage ? URL.createObjectURL(selectedImage) : null;

  const isUserVerified = isVerified(session);

  const handleHeaderImageChange = useCallback((newHeaderImage: string | null) => {
    setBusinessInfo(previous => ({ ...previous, logo: newHeaderImage || undefined }));
  }, []);

  const businessInfoConverted: BusinessInfo | null = businessInfo && businessInfo.businessId ? {
    businessId: parseInt(businessInfo.businessId) || 0,
    businessName: businessInfo.businessName || '',
    logo: businessInfo.logo || '',
    // Asegúrate de incluir aquí todas las propiedades adicionales requeridas por BusinessInfo
  } : null;
  // Función para manejar el cambio en el nombre de la sección
  const handleSectionNameChange = (newSectionName: string) => {
    setSectionName(newSectionName);
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <StepNavigation steps={steps} currentStep={currentStep} />
      </header>
      <main className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1">
              <VerificationAlert isVerified={isUserVerified} />
              {currentStep === '01' && (
                <BusinessForm
                  userId={session?.user?.id?.toString() || ''}
                  businessName={businessName}
                  onBusinessNameChange={setBusinessName}
                  onHeaderImageChange={handleHeaderImageChange}
                  setCurrentStep={setCurrentStep}
                  updateStepStatus={updateStepStatus}
                  isGoogleMapLoaded={isGoogleMapLoaded} 
                  handleFileUpload={handleFileUpload}
                />
              )}
                {currentStep === '02' && businessInfoConverted && (
                <AddSection
                businessId={businessInfoConverted.businessId.toString()}
                businessInfoProp={businessInfoConverted}
                onSectionNameChange={handleSectionNameChange} // Asegúrate de pasar esta prop
              />
                )}


          
            </div>
            <div className="md:col-span-1 relative space-y-8">
            <PhonePreview 
                businessName={businessInfo?.businessName || businessName} 
                logo={selectedImageUrl || businessInfo?.logo}
                businessInfo={businessInfo}
                currentStep={currentStep}
                sectionName={sectionName} // Pasar el nombre de la sección
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
