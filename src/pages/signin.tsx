
import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import Signin from '../../components/Signin';

export default function LoginPage() {
  return (
    <div>
      <Signin />
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context);
    if (session) {
      if (!session.user.verified) {
        return {
          redirect: {
            destination: '/verify-email', // Redirigir al usuario a una página de verificación de correo electrónico
            permanent: false,
          },
        }
      }
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      }
    }
    return {
      props: {},
    }
  }
  