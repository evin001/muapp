import React from 'react'

import { TextField, Button, Flexbox } from '@stage-ui/core'
import { Plus } from '@stage-ui/icons'
import { useForm } from 'react-hook-form'

type AddCategoryModalProps = {
  onClose: () => void
}

export const AddCategoryModal = ({ onClose }: AddCategoryModalProps) => {
  const { handleSubmit } = useForm()
  const onSubmit = (data) => console.log(data)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField label="Категория" />
      <Flexbox justifyContent="flex-end" mt="m">
        <Button label="Отменить" onClick={onClose} decoration="plain" />
        <Flexbox w="1rem" />
        <Button label="Добавить" textColor="surface" leftChild={<Plus />} />
      </Flexbox>
    </form>
  )
}
