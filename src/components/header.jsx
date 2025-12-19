import { Card, CardContent } from './ui/card'
import logo from '@/assets/logo/logo.svg'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from './ui/dropdown-menu'
import { ChevronDownIcon, LogOutIcon } from 'lucide-react'
import { useAuthContext } from '@/context/auth'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Header = () => {
  const { user, signOut } = useAuthContext()
  return (
    <Card>
      <CardContent className="flex items-center justify-between px-8 py-4">
        <div>
          <img src={logo} width={150} alt="Logo" />
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="1234" />
                  <AvatarFallback>
                    {user.firstName[0]} {user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm">
                  {user.firstName} {user.lastName}
                </p>
                <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Meu Perfil</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  size="small"
                  className="w-full justify-start"
                  onClick={signOut}
                >
                  <LogOutIcon>Sair</LogOutIcon>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}

export default Header
