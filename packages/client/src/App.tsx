import React from 'react'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Viewport, Block } from '@stage-ui/core'

import AuthRoutes from './pages/Auth/Routes'
import Background from './components/Backgorund'
import GlobalStyles from './components/GlobalStyles'
import theme from './theme'
import store from './data/store'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyles />
        <Viewport theme={theme}>
          <Background />
          <Block
            css={{
              maxWidth: '30rem',
              margin: '0 auto',
              height: '100vh',
            }}
          >
            <AuthRoutes />
          </Block>
        </Viewport>
      </BrowserRouter>
    </Provider>
  )
}

export default App
