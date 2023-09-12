// useRequireAuth.js
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export const useRequireAuth = (redirectTo = '/login') => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace(redirectTo);
    }
  }, [status, redirectTo]); // Añadido 'redirectTo' a la lista de dependencias

  return status;
};
