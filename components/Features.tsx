import React, { FC } from 'react';
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid';

const Features: FC = () => {
  const features = [
    {
      name: 'Gestión de ventas',
      description: 'Administra tus ventas de forma eficiente y sencilla.',
      icon: CloudArrowUpIcon,
    },
    {
      name: 'Seguridad',
      description: 'Tus datos están seguros con nuestro sistema de encriptación avanzado.',
      icon: LockClosedIcon,
    },
    {
      name: 'Backups de base de datos',
      description: 'Realiza backups automáticos de tu base de datos.',
      icon: ServerIcon,
    },
  ];

  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Despliega más rápido</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Un flujo de trabajo mejorado</p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque,
            iste dolor cupiditate blanditiis ratione.
          </p>
          <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="inline font-semibold text-gray-900">
                  <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                  {feature.name}
                </dt>{' '}
                <dd className="inline">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
