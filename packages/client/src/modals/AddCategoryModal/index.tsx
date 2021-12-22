import React, { useState } from 'react'

import { TextField, Button, Flexbox } from '@stage-ui/core'
import { Plus } from '@stage-ui/icons'

import { EnititiesActions } from '~/data/enitities'

type AddCategoryModalProps = {
  onClose: () => void
}

export const AddCategoryModal = ({ onClose }: AddCategoryModalProps) => {
  const [categoryName, setCategoryName] = useState('')

  const handleForm = () => {
    EnititiesActions.categoryCreate(categoryName)
  }
  const handleChangeCategoryName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value.trim())
  }

  return (
    <>
      <TextField
        label="Категория"
        value={categoryName}
        onChange={handleChangeCategoryName}
      />
      <Flexbox justifyContent="flex-end" mt="m">
        <Button label="Отменить" onClick={onClose} decoration="plain" />
        <Flexbox w="1rem" />
        <Button
          label="Добавить"
          textColor="surface"
          leftChild={<Plus />}
          disabled={!categoryName}
          onClick={handleForm}
        />
      </Flexbox>
    </>
  )
}
