import { useRoutes } from 'react-router-dom'

import { mainRoutes } from './pages/routes'

export const AppRoutes = () => {
  const mainElements = useRoutes(mainRoutes)

  return mainElements
}
