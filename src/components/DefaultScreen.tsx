import { ArrowLeft } from '@phosphor-icons/react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

export function DefaultScreen() {
  const navigate = useNavigate()
  const { pathname, state } = useLocation() as {
    pathname: string
    state: { isOnDiet: boolean }
  }

  let title

  if (pathname.includes('new')) {
    title = 'Nova refeição'
  } else if (pathname.includes('edit')) {
    title = 'Editar refeição'
  } else {
    title = 'Refeição'
  }

  return (
    <div
      className={`flex h-screen flex-1 flex-col pt-9 ${title === 'Refeição' ? (state.isOnDiet ? 'bg-green-light' : 'bg-red-light') : 'bg-gray-5'}`}
    >
      <div className="relative mx-6 mb-6 flex justify-center">
        <ArrowLeft
          className="absolute left-0 top-0 size-6"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-lg font-bold text-gray-1">{title}</h1>
      </div>

      <div className="flex h-full flex-1 flex-col rounded-t-[1.25rem] bg-white px-6 py-8">
        <Outlet />
      </div>
    </div>
  )
}
