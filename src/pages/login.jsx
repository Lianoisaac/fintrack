import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import PasswordInput from '@/components/password-input'
import { useMutation } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { AuthContext } from '@/context/auth'

const loginSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Email inválido',
    })
    .trim()
    .min(1, {
      message: 'O email é obrigatório',
    }),
  password: z.string().trim().min(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  }),
})

const LoginPage = () => {
  const { user } = useContext(AuthContext)

  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    const init = async () => {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      try {
        if (!accessToken && !refreshToken) return
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setUser(response.data)
      } catch (error) {
        localStorage.removeItem('accessToken')
        console.error(error)
      }
    }
    init()
  }, [])

  const handleSubmit = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (loginUser) => {
        const accessToken = loginUser.tokens.accessToken
        const refreshToken = loginUser.tokens.refreshToken
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        setUser(loginUser)
        toast.success('Login realizado com sucesso!')
      },
      onError: () => {
        toast.error(error)
      },
    })
  }

  // if (user) {
  //   return <h1>Seja bem-vindo {user.first_name}</h1>
  // }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <h1>{userTest}</h1>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Card className="w-[500px]">
            <CardHeader className="flex items-center">
              <CardTitle>Entre na sua conta</CardTitle>
              <CardDescription>Insira os seus dados abaixo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FormField
                  control={methods.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o seu email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={methods.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Digite a senha"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">
                Fazer Login
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Ainda não possui uma conta?</p>
        <Button variant="link" asChild>
          <Link to="/signup">Crie uma conta</Link>
        </Button>
      </div>
    </div>
  )
}

export default LoginPage
