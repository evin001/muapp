import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Text } from '@stage-ui/core'

const CompanyLogo = () => {
  const navigate = useNavigate()
  return (
    <Text
      color="surface"
      size="5rem"
      lineHeight="6.25rem"
      textAlign="center"
      css={{ fontFamily: 'Moonbright' }}
      onClick={() => navigate('/')}
    >
      MuApp
    </Text>
  )
}

export default CompanyLogo
