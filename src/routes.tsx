import { createBrowserRouter } from 'react-router-dom'

import { DefaultScreen } from './components/DefaultScreen'
import { AppLayout } from './screens/_layout/app'
import { AuthLayout } from './screens/_layout/auth'
import { Dashboard } from './screens/app/Dashboard'
import { EditMeal } from './screens/app/EditMeal'
import { Feedback } from './screens/app/Feedback'
import { Home } from './screens/app/Home'
import { Meal } from './screens/app/Meal'
import { NewMeal } from './screens/app/NewMeal'
import { SignIn } from './screens/auth/SignIn'
import { SignUp } from './screens/auth/SignUp'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/feedback', element: <Feedback /> },
      {
        path: '/meal',
        element: <DefaultScreen />,
        children: [
          { path: '/meal/:mealId', element: <Meal /> },
          { path: 'new', element: <NewMeal /> },
          { path: 'edit/:mealId', element: <EditMeal /> },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  },
])
