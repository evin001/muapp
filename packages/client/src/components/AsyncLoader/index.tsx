/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from 'react'

import { Spinner } from '@stage-ui/core'

type AsyncLoaderProps = {
  component: React.LazyExoticComponent<() => any>
}

export const AsyncLoader = ({ component }: AsyncLoaderProps) => {
  const Component = component
  return (
    <Suspense fallback={<Spinner />}>
      <Component />
    </Suspense>
  )
}
