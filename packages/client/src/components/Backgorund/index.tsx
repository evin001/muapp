import React from 'react'

import { Block } from '@stage-ui/core'
import { useLocation } from 'react-router-dom'

import Bg from '~/assets/images/auth-bg.svg'

export const Background = () => {
  const { pathname } = useLocation()

  if (!pathname.startsWith('/auth') && pathname !== '/') {
    return null
  }

  return (
    <Block
      w="100%"
      h="100vh"
      position="fixed"
      css={{
        background: `url(${Bg})`,
        backgroundSize: 'cover',
      }}
    />
  )
}
