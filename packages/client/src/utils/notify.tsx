import React from 'react'

import { Block, Flexbox, Header } from '@stage-ui/core'
import stageNotify from '@stage-ui/core/utils/notify'
import { Close } from '@stage-ui/icons'

const notify = (
  title: string,
  message: React.ReactNode,
  type: 'success' | 'error' | 'warning' | 'info',
  timeout = 5,
) => {
  stageNotify({
    title: '',
    message: '',
    timeout: timeout * 1000,
    decoration: 'mediumShadow',
    render: (close) => (
      <Flexbox p="1rem" w="16rem">
        <Flexbox column flex={1}>
          <Header color={type} m={0} size="xs" lineHeight="1.5rem">
            {title}
          </Header>
          {message && <Block mt="0.5rem">{message}</Block>}
        </Flexbox>
        <Block pl="0.5rem">
          <Close
            onClick={() => close()}
            size="1.25rem"
            alignSelf="flex-end"
            color="light"
          />
        </Block>
      </Flexbox>
    ),
  })
}

export default notify
