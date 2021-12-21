import React from 'react'

import { TextField, Button, Flexbox } from '@stage-ui/core'
import { Plus } from '@stage-ui/icons'

type AddServiceModalProps = {
  onClose: () => void
}

export const AddServiceModal = ({ onClose }: AddServiceModalProps) => (
  <>
    <TextField label="Услуга" />
    <Flexbox justifyContent="flex-end" mt="m">
      <Button label="Отменить" onClick={onClose} decoration="plain" />
      <Flexbox w="1rem" />
      <Button label="Добавить" textColor="surface" leftChild={<Plus />} />
    </Flexbox>
  </>
)
