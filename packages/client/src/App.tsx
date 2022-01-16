import React, { useEffect } from 'react'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Viewport } from '@stage-ui/core'

import { AppRoutes } from './AppRoutes'
import GlobalStyles from './components/GlobalStyles'
import theme from './theme'
import store from './data/store'
import { UserActions } from './data/user'

const App = () => {
  useEffect(() => {
    UserActions.init()
  }, [])

  return (
    <Provider store={store}>
      <GlobalStyles />
      <Viewport theme={theme}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Viewport>
    </Provider>
  )
}

export default App
