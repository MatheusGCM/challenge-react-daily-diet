import { Icon, CircleNotch } from '@phosphor-icons/react'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  icon?: Icon
  isLoading?: boolean
  label: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { label, isLoading, icon: Icon, className, variant = 'primary', ...props },
    ref,
  ) => {
    const isPrimaryButton = variant === 'primary'
    const dynamicButtonStyle = isPrimaryButton
      ? 'bg-gray-2 text-white active:bg-gray-1'
      : 'bg-transparent text-gray-1 active:bg-gray-5 border border-gray-1'

    return (
      <button
        {...props}
        ref={ref}
        className={twMerge(
          'flex w-full cursor-pointer items-center justify-center gap-3 rounded-md px-6 py-4',
          dynamicButtonStyle,
          className,
        )}
      >
        {isLoading ? (
          <>
            <CircleNotch className="size-5 animate-spin" />
          </>
        ) : (
          <>
            {Icon && <Icon className="size-5" />}
            <span className="text-sm font-bold">{label}</span>
          </>
        )}
      </button>
    )
  },
)
Button.displayName = 'Button'

export { Button }
