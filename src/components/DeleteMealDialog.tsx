import { Button } from './Button'
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
} from './ui/alert-dialog'

interface DeleteMealDialogProps {
  onDelete?(): void
}

export function DeleteMealDialog({ onDelete }: DeleteMealDialogProps) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Deseja realmente excluir o registro da refeição?
        </AlertDialogTitle>
        <AlertDialogDescription />
      </AlertDialogHeader>
      <AlertDialogFooter className="gap-3">
        <AlertDialogCancel asChild>
          <Button label="Cancelar" variant="secondary" />
        </AlertDialogCancel>
        <AlertDialogAction asChild>
          <Button label="Sim, exluir" onClick={onDelete} />
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
