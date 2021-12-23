import React, { useState, useEffect } from 'react'

import { TextField, Button, Flexbox, Spinner } from '@stage-ui/core'
import { Plus } from '@stage-ui/icons'

import { EnititiesActions } from '~/data/enitities'
import { useSelector } from '~/hooks/useSelector'
import { HintError } from '~/components/HintError'

type AddCategoryModalProps = {
  onClose: () => void
}

export const AddCategoryModal = ({ onClose }: AddCategoryModalProps) => {
  const [clear, setClear] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const { fetch, error } = useSelector(({ entities }) => ({
    fetch: entities.categories.fetch,
    error: entities.categories.error,
  }))

  useEffect(() => {
    // EnititiesActions.categoriesClear()
    setClear(true)
  }, [])

  useEffect(() => {
    if (fetch === 'resolved' && clear) {
      onClose()
    }
  }, [fetch])

  const handleForm = () => {
    EnititiesActions.categoryCreate(categoryName)
  }
  const handleChangeCategoryName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value.trim())
  }

  return (
    <Flexbox column w="16rem">
      <TextField
        label="Категория"
        value={categoryName}
        onChange={handleChangeCategoryName}
      />
      <HintError>{error}</HintError>
      <Flexbox justifyContent="flex-end" mt="m">
        <Button label="Отменить" onClick={onClose} decoration="plain" />
        <Flexbox w="1rem" />
        <Button
          label="Добавить"
          textColor="surface"
          leftChild={fetch === 'pending' ? <Spinner /> : <Plus />}
          disabled={!categoryName}
          onClick={handleForm}
        />
      </Flexbox>
    </Flexbox>
  )
}
