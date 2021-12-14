import React, { useState } from 'react'

import { Outlet, useOutletContext } from 'react-router-dom'
import { Flexbox, Text, Grid } from '@stage-ui/core'

import CompanyLogo from '~/components/CompanyLogo'

export type AuthContext = { title: string; subtitle: string }
export type AuthOutletContext = (ctx: AuthContext) => void

export const Auth = () => {
  const [context, setContext] = useState<AuthContext>({ title: '', subtitle: '' })

  return (
    <Flexbox column h="100%" justifyContent="center">
      <Flexbox column pb="1.75rem">
        <CompanyLogo />
        <Text mb="s" size="2rem" color="surface" align="center">
          {context.title}
        </Text>
        <Text
          px="1.25rem"
          color="surface"
          size="1.25rem"
          lineHeight="1.25rem"
          align="center"
        >
          {context.subtitle}
        </Text>
      </Flexbox>
      <Grid p="2rem" gap="1rem">
        <Outlet context={setContext} />
      </Grid>
    </Flexbox>
  )
}

export function useAuthContext() {
  return useOutletContext<AuthOutletContext>()
}
