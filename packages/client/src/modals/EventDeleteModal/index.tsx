import React from 'react'

import { Flexbox, Button, Text } from '@stage-ui/core'
import { Trash } from '@stage-ui/icons'

type DeleteServiceModalProps = {
  onClose: () => void
  onConfirm: () => void
}

export const EventDeleteModal = ({ onClose, onConfirm }: DeleteServiceModalProps) => {
  return (
    <Flexbox column w="16rem" css={{ maxWidth: '100%' }}>
      <Text>Вы действительно хотете удалить событие?</Text>
      <Flexbox justifyContent="flex-end" mt="m">
        <Button label="Отменить" onClick={onClose} decoration="plain" />
        <Flexbox w="1rem" />
        <Button
          textColor="surface"
          onClick={() => {
            onClose()
            onConfirm()
          }}
        >
          <Trash h="1.125rem" /> <Text ml="s">Удалить</Text>
        </Button>
      </Flexbox>
    </Flexbox>
  )
}
