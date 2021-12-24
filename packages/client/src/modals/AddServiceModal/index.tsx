import React, { useMemo, useState } from 'react'

import { TextField, Button, Grid, Flexbox, Select, Spinner } from '@stage-ui/core'
import SelectTypes from '@stage-ui/core/control/Select/types'
import { Plus } from '@stage-ui/icons'

import { HintError } from '~/components/HintError'
import { useSelector } from '~/hooks/useSelector'
import { selectCategoriesWithFreeParent } from '~/data/enitities/select'
import { EnititiesActions } from '~/data/enitities'

type AddServiceModalProps = {
  onClose: () => void
}

export const AddServiceModal = ({ onClose }: AddServiceModalProps) => {
  const [category, setCategory] = useState<number>()
  const [serviceName, serServiceName] = useState('')
  const categories = useSelector(selectCategoriesWithFreeParent)
  const { mutationPending, error } = useSelector(({ entities }) => ({
    mutationPending: entities.mutationPending,
    error: entities.error,
  }))
  const categoryOptions = useMemo(
    () => categories.map((c) => ({ text: c.name, value: c.id })),
    [categories.length],
  )

  const handleChangeCagegory = (
    values: SelectTypes.Option[],
    option?: SelectTypes.Option,
  ) => {
    setCategory((option?.value as number) || undefined)
  }

  const handleChangeServiceName = (e: React.ChangeEvent<HTMLInputElement>) => {
    serServiceName(e.target.value.trim())
  }

  const handleClickSave = () => {
    EnititiesActions.categoryCreate({
      name: serviceName,
      parentId: category,
      callback: onClose,
    })
  }

  return (
    <Flexbox column w="16rem">
      <Grid gap="1rem">
        <Select
          clearable
          label="Категория"
          placeholder="Выберите категорию"
          options={categoryOptions}
          values={categoryOptions.filter((c) => c.value === category)}
          onChange={handleChangeCagegory}
        />
        <TextField
          label="Услуга"
          value={serviceName}
          onChange={handleChangeServiceName}
        />
      </Grid>
      <HintError>{error}</HintError>
      <Flexbox justifyContent="flex-end" mt="m">
        <Button label="Отменить" onClick={onClose} decoration="plain" />
        <Flexbox w="1rem" />
        <Button
          label="Добавить"
          textColor="surface"
          leftChild={mutationPending ? <Spinner /> : <Plus />}
          disabled={!serviceName}
          onClick={handleClickSave}
        />
      </Flexbox>
    </Flexbox>
  )
}
