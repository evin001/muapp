import React from 'react'

import { Flexbox, Text } from '@stage-ui/core'
import FlexboxTypes from '@stage-ui/core/layout/Flexbox/types'

type HintErrorProps = {
  error?: string
  ellipsis?: boolean
} & FlexboxTypes.Props

export const HintError: React.FC<HintErrorProps> = ({
  error,
  ellipsis,
  ...flexboxProps
}) => (
  <Flexbox
    css={{ minHeight: '1rem' }}
    alignItems="center"
    justifyContent="center"
    {...flexboxProps}
  >
    <Text color="error" ellipsis={ellipsis}>
      {error || '\u200B'}
    </Text>
  </Flexbox>
)

HintError.defaultProps = {
  ellipsis: true,
}
