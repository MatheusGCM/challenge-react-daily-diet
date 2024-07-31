import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface DietStatsProps extends HTMLAttributes<HTMLDivElement> {
  value: number
  description: string
}

export function DietStats({ value, description, ...props }: DietStatsProps) {
  return (
    <div
      {...props}
      className={twMerge(
        'flex flex-col gap-2 rounded-lg bg-gray-6 p-4 text-center',
        props.className,
      )}
    >
      <h1 className="text-2xl font-bold text-gray-1">{value}</h1>
      <span className="text-sm text-gray-2">{description}</span>
    </div>
  )
}
