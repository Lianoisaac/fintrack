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
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, Navigate } from 'react-router'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import PasswordInput from '@/components/password-input'
import { useAuthContext } from '@/context/auth'

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
  const { user, login, isInitializing } = useAuthContext()

  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = (data) => login(data)

  if (isInitializing) return null
  if (user) {
    return <Navigate to="/" />
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      {/* <h1>{user}</h1> */}
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
