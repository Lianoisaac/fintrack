import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/context/auth'
import { Navigate } from 'react-router'

const HomePage = () => {
  const { user, isInitializing, signOut } = useAuthContext()

  if (isInitializing) return null
  if (!user) {
    return <Navigate to="/login" />
  }
  return (
    <div>
      <h1>Home Page - {user.first_name}</h1>
      <Button onClick={signOut}>Sair</Button>
    </div>
  )
}

export default HomePage
