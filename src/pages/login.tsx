import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import Login from '../../components/Login';

export default function LoginPage() {
  return (
    <div>
      <Login />
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)
  if (session) {
    return {
      redirect: {
        destination: '/dashboard', // Redirigir al usuario al panel de control
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
