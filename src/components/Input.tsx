import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  isError?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, type, label, isError = false, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="text-sm font-bold text-gray-2">
          {label}
        </label>
        <input
          {...props}
          id={id}
          type={type}
          className={twMerge(
            'rounded-md border border-gray-5 bg-transparent px-3 py-2 text-base text-gray-1 outline-none focus-visible:border-gray-3',
            isError && 'border-red-500',
            className,
          )}
          ref={ref}
        />
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
