import { HTMLAttributes } from 'react'

import { useCardPercentContext } from './Root'

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

export function Header(props: HeaderProps) {
  const { percent } = useCardPercentContext()
  const isPositiveStatus = percent > 50
  const iconColor = isPositiveStatus ? 'text-green-dark' : 'text-red-dark'

  return <div className={`${iconColor}`} {...props} />
}
