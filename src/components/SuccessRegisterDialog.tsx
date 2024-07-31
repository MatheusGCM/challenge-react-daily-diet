import { useNavigate } from 'react-router-dom'

import { Button } from './Button'
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogDescription,
} from './ui/alert-dialog'

export function SuccessRegisterDialog() {
  const navigate = useNavigate()

  function onConfirm() {
    // navigate('/sign-in')
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Cadastro realizado com sucesso!</AlertDialogTitle>
        <AlertDialogDescription />
      </AlertDialogHeader>
      <AlertDialogFooter className="gap-3">
        <AlertDialogAction asChild>
          <Button label="Ok" onClick={onConfirm} />
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
