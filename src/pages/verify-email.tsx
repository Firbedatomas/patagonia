// pages/verify-email.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function VerifyEmail() {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const res = await fetch(`/api/confirmEmail?token=${token}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (res.status === 200) {
            // Redirigir al usuario a la página de inicio de sesión
            router.push('/login');
          } else {
            // Obtén el mensaje de error de la respuesta
            const errorMessage = await res.text();
            console.error('Error verificando el correo electrónico:', errorMessage);
            // Manejar el error aquí, tal vez redirigir a una página de error
            router.push('/error');
          }
        } catch (error) {
          console.error('Error en la solicitud de verificación:', error);
          // Manejar el error aquí, tal vez redirigir a una página de error
          router.push('/error');
        }
      }
    };

    verifyToken();
  }, [router, token]);

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      {/* ... (tu diseño de Tailwind UI aquí) ... */}
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Verificando correo electrónico...
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Por favor, espera mientras verificamos tu correo electrónico.
          </p>
        </div>
      </div>
      {/* ... (más de tu diseño de Tailwind UI aquí, si es necesario) ... */}
    </div>
  );
}
