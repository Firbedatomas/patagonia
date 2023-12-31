import Link from 'next/link';

export default function VerifyEmailInstruction() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      {/* ... (tu diseño de Tailwind UI aquí) ... */}
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Verifica tu correo electrónico
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Hemos enviado un enlace de verificación a tu correo electrónico. Haz clic en el enlace para completar el proceso de verificación.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link 
              href="/login" 
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Ir a inicio de sesión
            </Link>
          </div>
        </div>
      </div>
      {/* ... (más de tu diseño de Tailwind UI aquí, si es necesario) ... */}
    </div>
  );
}
