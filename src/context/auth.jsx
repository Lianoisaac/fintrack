import { api } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

export const AuthContext = createContext({
  user: null,
  isInitializing: true,
  login: () => {},
  signup: () => {},
})

export const useAuthContext = () => useContext(AuthContext)

const LOCAL_STORAGE_TOKEN_KEY = 'accessToken'
const LOCAL_STORAGE_REFRESH_TOKEN_KEY = 'refreshToken'

const setTokens = (tokens) => {
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, tokens.accessToken)
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refreshToken)
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [isInitializing, setIsInitializing] = useState(true)

  const signupMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables) => {
      const response = await api.post('/users', {
        first_name: variables.firstName,
        last_name: variables.lastName,
        email: variables.email,
        password: variables.password,
      })
      return response.data
    },
  })

  const signup = (data) => {
    signupMutation.mutate(data, {
      onSuccess: (createdUser) => {
        // const accessToken = createdUser.tokens.accessToken
        // const refreshToken = createdUser.tokens.refreshToken
        setUser(createdUser)
        setTokens(createdUser.tokens)
        toast.success('Conta criada com sucesso! Faça login para continuar.')
      },
      onError: () => {
        toast.error('Erro ao criar a conta. Tente novamente mais tarde.')
      },
    })
  }

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (variables) => {
      const response = await api.post('/users/login', {
        email: variables.email,
        password: variables.password,
      })
      return response.data
    },
  })

  const login = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (loginUser) => {
        setUser(loginUser)
        setTokens(loginUser.tokens)
        toast.success('Login realizado com sucesso!')
      },
      onError: () => {
        toast.error(error)
      },
    })
  }
  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializing(true)
        const accessToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
        const refreshToken = localStorage.getItem(
          LOCAL_STORAGE_REFRESH_TOKEN_KEY
        )
        if (!accessToken && !refreshToken) return
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setUser(response.data)
      } catch (error) {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
        localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)
        console.error(error)
      } finally {
        setIsInitializing(false)
      }
    }
    init()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        isInitializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
