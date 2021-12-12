import React from 'react'

import { Flexbox, Text } from '@stage-ui/core'

const AuthError: React.FC = ({ children }) => (
  <Flexbox h="1rem" justifyContent="center">
    <Text align="center" color="error">
      {children}
    </Text>
  </Flexbox>
)

export default AuthError
