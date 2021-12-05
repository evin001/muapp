import React from 'react'

import { Viewport, Block } from '@stage-ui/core'

import Auth from './pages/Auth'
import Background from './components/Backgorund'
import GlobalStyles from './components/GlobalStyles'
import theme from './theme'

const App = () => {
  return (
    <>
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
          <Auth />
        </Block>
      </Viewport>
    </>
  )
}

export default App
