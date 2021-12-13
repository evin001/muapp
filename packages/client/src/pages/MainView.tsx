import React, { useEffect } from 'react'

import { useLocation, useNavigate, Outlet } from 'react-router-dom'

import { Block } from '@stage-ui/core'

import useSelector from '~/hooks/useSelector'
import Background from '~/components/Backgorund'

export const MainView = () => {
  const role = useSelector(({ user }) => user.data?.role)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!role && !pathname.startsWith('/auth')) {
      navigate('auth')
    }
  }, [pathname, role])

  return (
    <>
      <Background />
      <Block
        css={{
          maxWidth: '30rem',
          margin: '0 auto',
          height: '100vh',
        }}
      >
        <Outlet />
      </Block>
    </>
  )
}
