import React from 'react'

import { Flexbox, Button, Text } from '@stage-ui/core'
import { Trash } from '@stage-ui/icons'

import { EnititiesActions } from '~/data/enitities'

type DeleteServiceModalProps = {
  serviceId: number
  category: string
  onClose: () => void
}

export const DeleteServiceModal = ({
  serviceId,
  category,
  onClose,
}: DeleteServiceModalProps) => {
  const handleClickDelete = () => {
    EnititiesActions.serviceDelete(serviceId)
  }

  return (
    <Flexbox column w="16rem">
      <Text>Вы действительно хотете удалить «{category}»?</Text>
      <Flexbox justifyContent="flex-end" mt="m">
        <Button label="Отменить" onClick={onClose} decoration="plain" />
        <Flexbox w="1rem" />
        <Button textColor="surface" onClick={handleClickDelete}>
          <Trash h="1.125rem" /> <Text ml="s">Удалить</Text>
        </Button>
      </Flexbox>
    </Flexbox>
  )
}
