import React, { useEffect, useMemo, useState } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
import { Grid, Button, TextField, Text, Link, Select, dialog } from '@stage-ui/core'
import { ArrowLeft, Plus, Save } from '@stage-ui/icons'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useMasterContext } from '..'

import { Page } from '~/components/Page'
import { useTitle } from '~/hooks/useTitle'
import { AddCategoryModal } from '~/modals/AddCategoryModal'
import { AddServiceModal } from '~/modals/AddServiceModal'
import { EnititiesActions } from '~/data/enitities'
import {
  selectCategoriesWithParent,
  selectCategoriesWithFreeChild,
} from '~/data/enitities/select'
import { useSelector } from '~/hooks/useSelector'
import { HintError } from '~/components/HintError'

type EditFormType = {
  category?: number | null
  service: number
  duration: number
  price: number
}

const schema = yup.object({
  service: yup.number().required('Пожалуйста, укажите услугу'),
  duration: yup
    .number()
    .typeError('Пожалуйста, введите число')
    .positive('Пожалуйста, укажите положительную длительность')
    .integer('Пожалуйста, целое число')
    .required('Пожалуйста, укажите корректную длительность'),
  price: yup
    .number()
    .typeError('Пожалуйста, введите число')
    .positive('Пожалуйста, укажите положительную стоимость')
    .integer('Пожалуйста, целое число')
    .required('Пожалуйста, укажите корректную стоимость'),
})

export const MasterEditService = () => {
  const navigate = useNavigate()
  const [category, setCategory] = useState<EditFormType['category']>()
  const { setMenu } = useMasterContext()
  const { id } = useParams<{ id: string }>()
  const title = id ? 'Редактирование услуги' : 'Добавление услуги'

  useTitle(title)

  useEffect(() => {
    setMenu('services')
    EnititiesActions.categoriesFetch()
  }, [])

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<EditFormType>({
    defaultValues: { duration: 0, price: 0 },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const categories = useSelector(selectCategoriesWithParent)
  const services = useSelector(selectCategoriesWithFreeChild)

  const categoryOptions = useMemo(
    () => categories.map((c) => ({ text: c.name, value: c.id })),
    [categories.length],
  )
  const serviceOptions = useMemo(() => {
    return services
      .filter((s) => s.parentId === (category || null))
      .map((s) => ({ text: s.name, value: s.id }))
  }, [services.length, category])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'category') setCategory(value.category)
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const fetchService = async () => {
    if (!id) return

    const service = await EnititiesActions.service(parseInt(id, 10))

    if (!service) return

    setValue('duration', service.duration)
    setValue('price', service.price)
    setValue('category', service.category.parentId)
    setValue('service', service.category.id)
  }

  useEffect(() => {
    fetchService()
  }, [id])

  const handleSubmitForm = (data: EditFormType) => {
    EnititiesActions.serviceCreate({
      categoryId: data.service,
      duration: data.duration,
      price: data.price,
    })
  }

  const handleClickAddCategory = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    dialog({
      title: 'Новая категория',
      render: (close) => <AddCategoryModal onClose={close} />,
    })
  }

  const handleClickAddService = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    dialog({
      title: 'Новая услуга',
      render: (close) => <AddServiceModal onClose={close} />,
    })
  }

  return (
    <Page
      title={title}
      titleLeftChild={
        <Button color="lightest" onClick={() => navigate('..')}>
          <ArrowLeft />
        </Button>
      }
    >
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Grid gap="0.25rem">
          <Controller
            name="category"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Select
                clearable
                label="Категория"
                placeholder="Выберите категорию"
                values={categoryOptions.filter((c) => c.value === value)}
                options={categoryOptions}
                onChange={(_, option) => {
                  onChange(option?.value as number)
                }}
                rightChild={
                  <Link mr="s" onClick={handleClickAddCategory}>
                    Добавить
                  </Link>
                }
                hint={<HintError error={error?.message} />}
              />
            )}
          />
          <Controller
            name="service"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Select
                clearable
                label="Услуга"
                placeholder="Выберите услугу"
                values={serviceOptions.filter((s) => s.value === value)}
                options={serviceOptions}
                onChange={(_, option) => {
                  onChange(option?.value as number)
                }}
                hint={<HintError error={error?.message} />}
                rightChild={
                  <Link mr="s" onClick={handleClickAddService}>
                    Добавить
                  </Link>
                }
              />
            )}
          />

          <Controller
            name="duration"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <TextField
                  value={value}
                  onChange={(e) => onChange(e.target.value.trim())}
                  label="Длительность"
                  rightChild={<Text>мин</Text>}
                  hint={<HintError error={error?.message} />}
                />
              )
            }}
          />

          <Controller
            name="price"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextField
                value={value}
                onChange={onChange}
                label="Стоимость"
                rightChild={<Text>₽</Text>}
                hint={<HintError error={error?.message} />}
              />
            )}
          />

          <Button
            textColor="surface"
            label={id ? 'Сохранить' : 'Добавить'}
            leftChild={id ? <Save /> : <Plus />}
            type="submit"
            disabled={!isValid}
          />
        </Grid>
      </form>
    </Page>
  )
}
