import React, { useEffect } from 'react'

import { useLocation, useNavigate, Outlet } from 'react-router-dom'

import { Block } from '@stage-ui/core'

import useSelector from '~/hooks/useSelector'
import { Background } from '~/components/Backgorund'
import { Role } from '~/generated/graphql'

export const MainView = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const role = useSelector(({ user }) => user.data?.role)

  useEffect(() => {
    switch (role) {
      case Role.Master: {
        if (pathname.startsWith('/auth') || pathname === '/') navigate('master')
        break
      }
      default: {
        if (!pathname.startsWith('/auth')) navigate('auth')
      }
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
