import React from 'react'

import { Flexbox, Text, Grid } from '@stage-ui/core'

import CompanyLogo from '~/components/CompanyLogo'

type AuthPageProps = {
  title: string
  subtitle: string
}

const AuthPage: React.FC<AuthPageProps> = ({ title, subtitle, children }) => (
  <Flexbox column h="100%" justifyContent="center">
    <Flexbox column pb="1.75rem">
      <CompanyLogo />
      <Text mb="s" size="2rem" color="surface" align="center">
        {title}
      </Text>
      <Text
        px="1.25rem"
        color="surface"
        size="1.25rem"
        lineHeight="1.25rem"
        align="center"
      >
        {subtitle}
      </Text>
    </Flexbox>
    <Grid p="2rem" gap="1rem">
      {children}
    </Grid>
  </Flexbox>
)

export default AuthPage
