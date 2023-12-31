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
import AddProduct from './dashboard/AddProduct';

interface BusinessInfoType {
  businessId?: string;
  businessName?: string;
  address?: string;
  logo?: string;
}

interface CurrentSectionType {
  sectionId: number;
  sectionName: string;
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
  const [currentSection, setCurrentSection] = useState<CurrentSectionType | null>(null);
  const { data: session } = useSession();
  const [sectionName, setSectionName] = useState('');
  const [loading, setLoading] = useState(false); // Agregamos estado para el feedback al usuario

  useEffect(() => {
    const fetchData = async () => {
      if (!session) return;

      setBusinessName(session.user?.businessName?.toLowerCase() || '');

      try {
        // Obtener información del negocio
        const resBusiness = await fetch(`/api/getBusinessByUserId?userId=${session.user?.id}`);
        const dataBusiness = await resBusiness.json();

        if (resBusiness.ok && dataBusiness && dataBusiness.businessId) {
          setBusinessInfo(dataBusiness);
          setCurrentStep('02');
          updateStepStatus('02');
          setIsGoogleMapLoaded(false);
        } else {
          setCurrentStep('01');
          updateStepStatus('01');
          setIsGoogleMapLoaded(true);
          setLoading(false);
          return; // Detener la ejecución si no se obtiene información del negocio
        }

        // Verificar secciones
        const resSections = await fetch(`/api/menu-sections?businessId=${dataBusiness.businessId}`);
        const sectionsData = await resSections.json();
        if (resSections.ok && sectionsData.length > 0) {
          setCurrentStep('03');
          updateStepStatus('03');
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
        setLoading(false);
        // Manejar errores de red, errores en la API, etc.
        // Puedes mostrar un mensaje de error al usuario o realizar otras acciones apropiadas.
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchData();
  }, [session]);

  const updateStepStatus = useCallback((newCurrentStep: string) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) => ({
        ...step,
        status:
          step.id === newCurrentStep
            ? 'current'
            : parseInt(step.id) < parseInt(newCurrentStep)
            ? 'complete'
            : 'upcoming',
      }))
    );
  }, []);

  const handleFileUpload = useCallback((file: File | null) => {
    setSelectedImage(file);
  }, []);

  const selectedImageUrl = selectedImage ? URL.createObjectURL(selectedImage) : null;

  const isUserVerified = isVerified(session);

  const handleHeaderImageChange = useCallback((newHeaderImage: string | null) => {
    setBusinessInfo((previous) => ({ ...previous, logo: newHeaderImage || undefined }));
  }, []);

  const businessInfoConverted: BusinessInfo | null =
    businessInfo && businessInfo.businessId
      ? {
          businessId: parseInt(businessInfo.businessId) || 0,
          businessName: businessInfo.businessName || '',
          logo: businessInfo.logo || '',
          sectionName: '',
          sectionId: '',
        }
      : null;

  const handleSectionNameChange = (newSectionName: string) => {
    setSectionName(newSectionName);
  };

  const handleSectionCreated = (sectionData: CurrentSectionType) => {
    setCurrentSection(sectionData);
    setCurrentStep('03');
    updateStepStatus('03');
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
                  businessId={businessInfoConverted?.businessId.toString() || ''}
                  businessInfoProp={businessInfoConverted}
                  onSectionNameChange={handleSectionNameChange}
                  onSectionCreated={handleSectionCreated}
                  currentStep={''}
                />
              )}
              {currentStep === '03' && currentSection && (
                <AddProduct sectionId={currentSection.sectionId.toString()} sectionName={currentSection.sectionName} />
              )}
            </div>
            <div className="md:col-span-1 relative space-y-8">
              {loading ? (
                <LoadingSpinner /> // Feedback visual durante la carga de datos
              ) : (
                <PhonePreview
                  businessName={businessInfo?.businessName || businessName}
                  logo={selectedImageUrl || businessInfo?.logo}
                  businessInfo={businessInfo}
                  currentStep={currentStep}
                  sectionName={sectionName}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
