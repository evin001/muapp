import React, { useState } from 'react'

import { TextField, Button, Flexbox, Spinner } from '@stage-ui/core'
import { Plus } from '@stage-ui/icons'

import { EnititiesActions } from '~/data/enitities'
import { useSelector } from '~/hooks/useSelector'
import { HintError } from '~/components/HintError'

type AddCategoryModalProps = {
  onClose: () => void
}

export const AddCategoryModal = ({ onClose }: AddCategoryModalProps) => {
  const [categoryName, setCategoryName] = useState('')
  const { mutationPending, error } = useSelector(({ entities }) => ({
    mutationPending: entities.mutationPending,
    error: entities.categories.error,
  }))

  const handleClickSave = () => {
    EnititiesActions.categoryCreate({ name: categoryName, callback: onClose })
  }

  const handleChangeCategoryName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value.trim())
  }

  return (
    <Flexbox column w="16rem" css={{ maxWidth: '100%' }}>
      <TextField
        label="Категория"
        value={categoryName}
        onChange={handleChangeCategoryName}
      />
      <HintError error={error} />
      <Flexbox justifyContent="flex-end" mt="m">
        <Button label="Отменить" onClick={onClose} decoration="plain" />
        <Flexbox w="1rem" />
        <Button
          label="Добавить"
          textColor="surface"
          leftChild={mutationPending ? <Spinner /> : <Plus />}
          disabled={!categoryName}
          onClick={handleClickSave}
        />
      </Flexbox>
    </Flexbox>
  )
}
