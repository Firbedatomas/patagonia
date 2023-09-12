import React, { useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import BusinessForm from './dashboard/BusinessForm';
import VerificationAlert from './VerificationAlert';
import LoadingSpinner from './LoadingSpinner';
import { isVerified } from './isVerified';
import PhonePreview from './dashboard/PhonePreview';
import { getMenuPreviewContent } from './dashboard/MenuPreview';

export default function Dashboard() {
    
    const { data: session } = useSession();
    const isUserVerified = isVerified(session);

    const [businessName, setBusinessName] = useState(
        (session?.user.businessName as string)?.toLowerCase() || ""  // Modificada
    );

    const [headerImage, setHeaderImage] = useState<string | null>(null); // Nueva variable de estado para guardar la imagen del encabezado

    const handleHeaderImageChange = useCallback((newHeaderImage: string | null) => {
        setHeaderImage(newHeaderImage);
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-white shadow">
                {/* Tu contenido de encabezado aquí */}
            </header>
            <main className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">  {/* Modificado a 2 columnas */}
                        <div className="md:col-span-1">
                            <VerificationAlert isVerified={isUserVerified} />
    
                            {session?.user ? (
                                <BusinessForm
                                    userId={session.user.id?.toString() ?? ''}
                                    businessName={businessName}
                                    onBusinessNameChange={setBusinessName}
                                    onHeaderImageChange={handleHeaderImageChange}
                                />
                            ) : (
                                <LoadingSpinner />
                            )}
                        </div>
                        <div className="md:col-span-1 relative h-[750px] space-y-8">  
                            <nav className="space-y-4 h-full">
                                <div className="h-[350px]">  
                                <PhonePreview imageSrc={headerImage} businessName={businessName} /> 
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}




