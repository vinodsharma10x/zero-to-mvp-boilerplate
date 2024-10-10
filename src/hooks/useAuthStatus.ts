import { useAuth } from '@/context/AuthContext'

export const useAuthStatus = () => {
  const { user } = useAuth()
  return {
    isLoggedIn: !!user,
    userEmail: user?.email
  }
}
