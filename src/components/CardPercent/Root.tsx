import { HTMLAttributes, createContext, useContext } from 'react'
import { twMerge } from 'tailwind-merge'

interface RootProps extends HTMLAttributes<HTMLDivElement> {
  percent: number
}

interface CardPercentContextProps {
  percent: number
}

const CardPercentContext = createContext({} as CardPercentContextProps)

export function Root({ percent, ...props }: RootProps) {
  const isPositiveStatus = percent > 50
  const bgColor = isPositiveStatus ? 'bg-green-light' : 'bg-red-light'

  return (
    <CardPercentContext.Provider value={{ percent }}>
      <div
        {...props}
        className={twMerge(
          'relative flex w-full cursor-pointer flex-col items-center px-4 py-5',
          bgColor,
          props.className,
        )}
      />
    </CardPercentContext.Provider>
  )
}

export const useCardPercentContext = () => useContext(CardPercentContext)
