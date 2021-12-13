import React, { useState } from 'react'

import { Outlet, useOutletContext } from 'react-router-dom'
import { Flexbox, Text, Grid } from '@stage-ui/core'

import CompanyLogo from '~/components/CompanyLogo'

export type AuthHeaders = { title: string; subtitle: string }
export type HeaderContext = React.Dispatch<React.SetStateAction<AuthHeaders>>

export function useHeaders() {
  return useOutletContext<HeaderContext>() as HeaderContext
}

export const Auth = () => {
  const [headers, setHeaders] = useState<AuthHeaders>({ title: '', subtitle: '' })

  return (
    <Flexbox column h="100%" justifyContent="center">
      <Flexbox column pb="1.75rem">
        <CompanyLogo />
        <Text mb="s" size="2rem" color="surface" align="center">
          {headers.title}
        </Text>
        <Text
          px="1.25rem"
          color="surface"
          size="1.25rem"
          lineHeight="1.25rem"
          align="center"
        >
          {headers.subtitle}
        </Text>
      </Flexbox>
      <Grid p="2rem" gap="1rem">
        <Outlet context={setHeaders} />
      </Grid>
    </Flexbox>
  )
}
