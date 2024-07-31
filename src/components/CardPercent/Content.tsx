import { useCardPercentContext } from './Root'

export function Content() {
  const { percent } = useCardPercentContext()
  return (
    <>
      <h1 className="text-[2rem]/[2.6rem] font-bold">{percent.toFixed()}%</h1>
      <span className="text-sm">das refeições dentro da dieta</span>
    </>
  )
}
