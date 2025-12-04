import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { forwardRef, useState } from 'react'

const PasswordInput = forwardRef(
  ({ placeholder = 'Digite a sua senha', ...props }, ref) => {
    const [passwordIsVisible, setPasswordIsVisible] = useState(false)
    return (
      <div className="relative">
        <Input
          type={passwordIsVisible ? 'text' : 'password'}
          ref={ref}
          {...props}
          placeholder={placeholder}
        />
        <Button
          type="button"
          variant="ghost"
          className="absolute bottom-0 right-0 top-0 my-auto mr-1 h-8 w-8 text-muted-foreground"
          onClick={() => setPasswordIsVisible((prev) => !prev)}
          aria-label={passwordIsVisible ? 'Esconder senha' : 'Mostrar senha'}
        >
          {passwordIsVisible ? <EyeOffIcon /> : <EyeIcon />}
        </Button>
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
