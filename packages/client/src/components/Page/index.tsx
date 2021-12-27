import React from 'react'

import { Flexbox, Header, ScrollView, Block } from '@stage-ui/core'
import FlexboxTypes from '@stage-ui/core/layout/Block/types'

import { font } from '~/theme'

type PageProps = {
  title: string
  titleLeftChild?: React.ReactNode
} & FlexboxTypes.Props

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
        { fontFamily: font.medium },
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
    <ScrollView>
      <Block
        pb="m"
        css={{
          '& :last-child': { margin: 0 },
        }}
      >
        {children}
      </Block>
    </ScrollView>
  </Flexbox>
)
