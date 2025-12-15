import Header from '@/components/Header'
import { useAuthContext } from '@/context/auth'
import { Navigate } from 'react-router'

const HomePage = () => {
  const { user, isInitializing, signOut } = useAuthContext()

  if (isInitializing) return null
  if (!user) {
    return <Navigate to="/login" />
  }
  return <Header />
}

export default HomePage
