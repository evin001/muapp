import React from 'react'

import { Flexbox, Text } from '@stage-ui/core'
import FlexboxTypes from '@stage-ui/core/layout/Flexbox/types'

export const HintError: React.FC<FlexboxTypes.Props> = ({
  children,
  ...flexboxProps
}) => (
  <Flexbox css={{ minHeight: '1rem' }} {...flexboxProps}>
    <Text color="error">{children}</Text>
  </Flexbox>
)
