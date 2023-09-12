import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function VerifyCode() {
  const router = useRouter();
  const { token } = router.query;
  
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch(`/api/confirmEmail?token=${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.status === 200) {
          router.push('/'); // Redirigir al inicio o a una página de éxito
        } else {
          const errorMessage = await res.text();
          console.error('Error en la verificación del token: ', errorMessage);
          setError(errorMessage);
        }
      } catch (error: any) {
        console.error('Error en la verificación del token: ', error);
        setError(error.message);
      }
    };

    if (token) {
      verifyToken();
    }
  }, [router, token]);

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      {/* ... (tu UI aquí) ... */}
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Verificando tu correo electrónico...
          </h1>
          {error && (
            <div className="mt-4 text-red-600">
              <p>Ha ocurrido un error: {error}</p>
            </div>
          )}
          {!error && (
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Por favor, espera un momento mientras verificamos tu correo electrónico.
            </p>
          )}
        </div>
      </div>
      {/* ... (tu UI aquí) ... */}
    </div>
  );
}
