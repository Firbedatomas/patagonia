import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import Dashboard from '../../components/Dashboard';

export default function LandingPage() {
  return (
    <div>
      <Dashboard />
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
