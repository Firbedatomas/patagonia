import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import moment from 'moment-timezone';
import LogoImage from './LogoImage';
export default function Registro() {
  const [businessName, setBusinessName] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [languagePreference, setLanguagePreference] = useState(
    typeof window !== 'undefined' ? navigator.language || navigator.language : 'en'
  );
  const timezones = moment.tz.names(); // Obtener todas las zonas horarias

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Establecer el estado de carga antes de iniciar la operación
  
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName, fullName, phoneNumber, email, password, timezone, languagePreference }),
      });
  
      if (res.status === 201) {
        // Aquí puedes redirigir al usuario a una página que le indique que debe verificar su correo electrónico
        router.push('/verify-email-instruction');
      } else {
        const data = await res.json();
        setError(data.error || 'Ocurrió un error al registrarse');
      }
    } catch (error) {
      setError('Ocurrió un error al registrarse');
      console.error(error);
    } finally {
      setIsLoading(false); // Restablecer el estado de carga después de completar la operación
    }
  };


  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <LogoImage />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Regístrate en tu cuenta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="text-red-500">{error}</div>}
          {/* Aquí van los campos del formulario */}
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium leading-6 text-gray-900">
              Nombre del Negocio
            </label>
            <div className="mt-2">
            <input
              type="text"
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
          </div>
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">
              Tu Nombre
            </label>
            <div className="mt-2">
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
              Número de Teléfono
            </label>
            <div className="mt-2">
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
          </div>
          <div>
          <label htmlFor="timezone" className="block text-sm font-medium leading-6 text-gray-900">
            Zona Horaria
          </label>
          <div className="mt-2">
            <select
              id="timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            >
              {timezones.map((zone, index) => (
                <option key={index} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="languagePreference" className="block text-sm font-medium leading-6 text-gray-900">
            Preferencia de Idioma
          </label>
          <div className="mt-2">
            <select
              id="languagePreference"
              value={languagePreference}
              onChange={(e) => setLanguagePreference(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            >
              <option value="es">Español</option>
              <option value="en">Inglés</option>
            </select>
          </div>
        </div>



          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Contraseña
            </label>
            <div className="mt-2">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
          </div>
          <div>
          <button
    type="submit"
    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    disabled={isLoading} // Deshabilitar el botón mientras se está cargando
  >
    {isLoading ? (
      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
    ) : (
      'Registrarse'
    )}
  </button>
          </div>
        </form>
      </div>
    </div>
  );
}
