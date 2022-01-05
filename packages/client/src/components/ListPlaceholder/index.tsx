import React from 'react'

import { Flexbox, Text } from '@stage-ui/core'

type ListPlaceholderProps = {
  title: string
  image: string
}

export const ListPlaceholder = ({ title, image }: ListPlaceholderProps) => (
  <Flexbox
    column
    alignItems="center"
    justifyContent="center"
    backgroundColor="onPrimary"
    borderColor="surface"
    borderStyle="solid"
    borderWidth="0.0625rem"
    borderRadius="0.3125rem"
    css={{ overflow: 'hidden' }}
  >
    <Text p="0.625rem 1rem" color="onSecondary" textAlign="center">
      {title}
    </Text>
    <img
      alt=""
      src={image}
      css={{ width: '100%', height: 'auto', pointerEvents: 'none', userSelect: 'none' }}
    />
  </Flexbox>
)
