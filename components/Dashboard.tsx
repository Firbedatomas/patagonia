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

export default function Dashboard() {
  const [currentStep, setCurrentStep] = useState('01');
  const [isGoogleMapLoaded, setIsGoogleMapLoaded] = useState(false);  // Nuevo estado

  const [steps, setSteps] = useState([
    { id: '01', name: 'Datos del negocio', description: 'Cargaremos la informacion basica.', href: '#', status: 'upcoming' },
    { id: '02', name: 'Secciones del menu', description: 'Carga las secciones de tus productos.', href: '#', status: 'upcoming' },
    { id: '03', name: 'Productos', description: 'Carguemos tus primeros productos.', href: '#', status: 'upcoming' },
  ]);

  const updateStepStatus = (newCurrentStep: string) => {
    setSteps(prevSteps => prevSteps.map(step => {
      if (step.id === newCurrentStep) {
        return { ...step, status: 'current' };
      } else if (parseInt(step.id) < parseInt(newCurrentStep)) {
        return { ...step, status: 'complete' };
      } else {
        return { ...step, status: 'upcoming' };
      }
    }));
  };

  const { data: session, status } = useSession();
  const [sessionData, setSessionData] = useState<Session | null>(null);
  const [localLogo, setLocalLogo] = useState<File | null>(null); // para el logo local
  const [dbLogoUrl, setDbLogoUrl] = useState<string | null>(null); // para el logo de la base de datos
  
  useEffect(() => {
    if (session) {
      setSessionData(session);
    }
  }, [session]);

  useEffect(() => {
    const fetchBusiness = async () => {
        try {
          const userId = sessionData?.user?.id;
          const res = await fetch(`/api/getBusinessByUserId?userId=${userId}`);
          const data = await res.json();
          if (res.ok && data.businessId) {
            if (data.business && data.business.logo) {
                setDbLogoUrl(data.business.logo);
              }
            setCurrentStep('02');
            updateStepStatus('02');
            setIsGoogleMapLoaded(false);  // No cargar Google Maps
          } else {
            setCurrentStep('01');
            updateStepStatus('01');
            setIsGoogleMapLoaded(true);  // Cargar Google Maps
          }
        } catch (error) {
          console.error('Error fetching business:', error);
        }
      };
    if (sessionData) {
      fetchBusiness();
    }
  }, [sessionData]);

  const isUserVerified = isVerified(sessionData);
  const [businessName, setBusinessName] = useState((sessionData?.user?.businessName as string)?.toLowerCase() || '');
  const [headerImage, setHeaderImage] = useState<string | null>(null);

  const handleHeaderImageChange = useCallback((newHeaderImage: string | null) => {
    setHeaderImage(newHeaderImage);
  }, []);

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
              {currentStep === '01' && sessionData ? (
                sessionData.user?.id ? (
                  <BusinessForm
                    userId={sessionData.user.id.toString()}
                    businessName={businessName}
                    onBusinessNameChange={setBusinessName}
                    onHeaderImageChange={handleHeaderImageChange}
                    setCurrentStep={setCurrentStep}
                    updateStepStatus={updateStepStatus}
                    isGoogleMapLoaded={isGoogleMapLoaded}  // Nueva prop
                  />
                ) : (
                  <LoadingSpinner />
                )
              ) : null}
              {currentStep === '02' && <AddSection />}
            </div>
            <div className="md:col-span-1 relative h-[750px] space-y-8">
              <nav className="space-y-4 h-full">
                <div className="h-[350px]">
                <PhonePreview 
  imageSrc={headerImage} 
  businessName={businessName} 
  logo={localLogo ? URL.createObjectURL(localLogo) : dbLogoUrl}
/>

                </div>
              </nav>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}