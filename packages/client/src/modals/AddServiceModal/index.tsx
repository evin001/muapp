import React from 'react'

import { TextField, Button, Grid, Flexbox, Select } from '@stage-ui/core'
import { Plus } from '@stage-ui/icons'

import { useCategoryOptions } from '~/hooks/useCategoryOptions'

type AddServiceModalProps = {
  onClose: () => void
}

export const AddServiceModal = ({ onClose }: AddServiceModalProps) => {
  const categoryOptions = useCategoryOptions()

  return (
    <Grid w="16rem" gap="1rem">
      <Select
        clearable
        label="Категория"
        placeholder="Выберите категорию"
        options={categoryOptions}
      />
      <TextField label="Услуга" />
      <Flexbox justifyContent="flex-end" mt="m">
        <Button label="Отменить" onClick={onClose} decoration="plain" />
        <Flexbox w="1rem" />
        <Button label="Добавить" textColor="surface" leftChild={<Plus />} />
      </Flexbox>
    </Grid>
  )
}
