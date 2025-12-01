import PasswordInput from '@/components/password-input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router'

const SignupPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Crie a sua conta</CardTitle>
          <CardDescription>Insira os seus dados abaixo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Digite o seu nome" />
          <Input placeholder="Digite o seu sobrenome" />
          <Input placeholder="Digite o seu email" />
          <PasswordInput placeholder="Digite a senha" />
          <PasswordInput placeholder="Digite a senha novamente" />

          <div className="items-top flex space-x-2">
            <Checkbox id="terms1" />
            <div className="grid gap-1 leading-none">
              <label
                htmlFor="terms"
                className="text-xs text-muted-foreground opacity-75"
              >
                Ao clicar em "criar a conta",
                <a href="#" className="text-white underline">
                  você aceita nosso termo de uso e política de privacidade
                </a>
              </label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Criar conta</Button>
        </CardFooter>
      </Card>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Já possui uma conta?</p>
        <Button variant="link" asChild>
          <Link to="/login">Faça login</Link>
        </Button>
      </div>
    </div>
  )
}

export default SignupPage
