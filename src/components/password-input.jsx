import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useState } from 'react'

const PasswordInput = ({ placeholder = 'Digite a sua senha' }) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)
  return (
    <div className="relative">
      <Input
        type={passwordIsVisible ? 'text' : 'password'}
        placeholder={placeholder}
      />
      <Button
        variant="ghost"
        className="buttom-0 absolute right-0 top-0 my-auto mr-1 h-8 w-8 text-muted-foreground"
        onClick={() => setPasswordIsVisible((prev) => !prev)}
      >
        {passwordIsVisible ? <EyeOffIcon /> : <EyeIcon />}
      </Button>
    </div>
  )
}

export default PasswordInput
