import React from 'react'

import { Block } from '@stage-ui/core'
import { Outlet } from 'react-router-dom'

export const Master = () => (
  <Block>
    master
    <Outlet />
  </Block>
)
