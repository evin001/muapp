import React from 'react'

import { Block } from '@stage-ui/core'

import Bg from '../../assets/images/auth-bg.svg'

const background = () => (
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

export default background
