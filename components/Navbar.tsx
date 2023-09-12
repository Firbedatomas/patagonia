import NavbarNotLoggedIn from './NavbarNotLoggedIn';
import NavbarLoggedIn from './NavbarLoggedIn';
import { useSession } from 'next-auth/react';
import LoadingSpinner from './LoadingSpinner';

export default function MainComponent() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
    <LoadingSpinner />
    );
  }

  return (
    <div>
      {session ? <NavbarLoggedIn /> : <NavbarNotLoggedIn />}
    </div>
  );
}
