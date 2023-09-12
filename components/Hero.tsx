import React from 'react';
import Link from 'next/link';
import Features from './Features';
import Stats from './Stats';

const Hero: React.FC = () => {



  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      {/* Sección Hero */}
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Software Gastronómico Inteligente
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Optimiza tu negocio de gastronomía con nuestro software de venta, stock e inteligencia artificial. 
            Ofrecemos suscripciones mensuales y anuales para adaptarnos a tus necesidades.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Comenzar
            </Link>
            <Link href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Aprender más <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
      

      {/* Sección Características */}
      <Features />

      {/* Sección Stats */}
    <Stats />
    </div>
  );
};

export default Hero;
