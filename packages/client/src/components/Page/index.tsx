import React from 'react'

import { Flexbox, Header } from '@stage-ui/core'
import FlexboxTypes from '@stage-ui/core/layout/Block/types'

type PageProps = { title: string; titleLeftChild?: React.ReactNode } & FlexboxTypes.Props

export const Page: React.FC<PageProps> = ({
  title,
  titleLeftChild,
  children,
  ...flexboxTypes
}) => (
  <Flexbox px="m" flex={1} column {...flexboxTypes}>
    <Header
      size="1.75rem"
      my="1.125rem"
      css={[
        { fontWeight: 400 },
        !!titleLeftChild && {
          display: 'inline-flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      ]}
    >
      {title}
      {titleLeftChild}
    </Header>
    {children}
  </Flexbox>
)
