import React from 'react'

import { Flexbox, Text } from '@stage-ui/core'
import FlexboxTypes from '@stage-ui/core/layout/Flexbox/types'

type HintErrorProps = {
  error?: string
} & FlexboxTypes.Props

export const HintError: React.FC<HintErrorProps> = ({ error, ...flexboxProps }) => (
  <Flexbox
    css={{ minHeight: '1rem' }}
    alignItems="center"
    justifyContent="center"
    {...flexboxProps}
  >
    <Text color="error" ellipsis>
      {error || '\u200B'}
    </Text>
  </Flexbox>
)
