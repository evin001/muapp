import React, { useEffect } from 'react'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Viewport } from '@stage-ui/core'

import { MainView } from './pages/MainView'
import GlobalStyles from './components/GlobalStyles'
import theme from './theme'
import store from './data/store'
import UserActions from './data/user'

import { Master } from './pages/Master'
import { Services } from './pages/Master/Services'

import { Auth } from './pages/Auth'
import { Login } from './pages/Auth/Login'
import { Register } from './pages/Auth/Register'

const App = () => {
  useEffect(() => {
    UserActions.init()
  }, [])

  return (
    <Provider store={store}>
      <GlobalStyles />
      <Viewport theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainView />}>
              <Route path="master" element={<Master />}>
                <Route path="services" element={<Services />} />
                <Route path="" element={<Navigate replace to="services" />} />
              </Route>
              <Route path="auth" element={<Auth />}>
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="" element={<Navigate replace to="login" />} />
              </Route>
              <Route path="*" element={<Navigate replace to="auth" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Viewport>
    </Provider>
  )
}

export default App
