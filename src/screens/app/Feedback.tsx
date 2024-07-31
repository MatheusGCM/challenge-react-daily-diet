import { useLocation, useNavigate } from 'react-router-dom'

import image1 from '@/assets/feedback-1.png'
import image2 from '@/assets/feedback-2.png'
import { Button } from '@/components/Button'

export function Feedback() {
  const { state } = useLocation()
  const navigate = useNavigate()

  const isOnDiet = state === 'yes'

  const image = isOnDiet ? image1 : image2
  const titleColor = isOnDiet ? 'text-green-dark' : 'text-red-dark'

  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h1 className={`mb-2 text-2xl font-bold ${titleColor}`}>
        {isOnDiet ? 'Continue asssim!' : 'Que pena!'}
      </h1>
      <p className="mb-10 text-base font-bold text-gray-1">
        {isOnDiet ? (
          <>
            Você continua <strong>dentro da dieta</strong>. Muito bem!
          </>
        ) : (
          <>
            Você <strong>saiu da dieta</strong> dessa vez, mas continue se
            esforçando e não desista!
          </>
        )}
      </p>
      <img src={image} alt="" className="mb-8" />

      <div>
        <Button
          label="Ir para a página inicial"
          onClick={() => navigate('/', { replace: true })}
        />
      </div>
    </div>
  )
}
