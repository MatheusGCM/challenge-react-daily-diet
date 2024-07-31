import { forwardRef } from 'react'

interface RadioInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isSelected: boolean
}

const RadioInput = forwardRef<HTMLInputElement, RadioInputProps>(
  ({ value, isSelected, ...props }, ref) => {
    const isYesValue = value === 'yes'
    const selectedRadio = isSelected
      ? isYesValue
        ? 'border-green-dark bg-green-light'
        : 'border-red-dark bg-red-light'
      : null
    const bgCicle = isYesValue ? 'bg-green-dark' : 'bg-red-dark'

    return (
      <label
        className={`flex flex-1 items-center justify-center gap-2 rounded-md border bg-gray-6 p-4 ${selectedRadio}`}
      >
        <input
          {...props}
          type="radio"
          value={value}
          className="sr-only"
          ref={ref}
        />
        <div className={`size-2 rounded-full ${bgCicle}`} />
        <span className="text-sm font-bold text-gray-1">
          {isYesValue ? 'Sim' : 'Não'}
        </span>
      </label>
    )
  },
)
RadioInput.displayName = 'RadioInput'

export { RadioInput }
