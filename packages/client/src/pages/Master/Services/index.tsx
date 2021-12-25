import React, { useEffect } from 'react'

import { Button, Spinner, Text, Flexbox } from '@stage-ui/core'
import { Plus } from '@stage-ui/icons'
import { useNavigate } from 'react-router-dom'

import { Page } from '~/components/Page'
import { useTitle } from '~/hooks/useTitle'
import { useSelector } from '~/hooks/useSelector'
import { EnititiesActions } from '~/data/enitities'

export const Services = () => {
  useTitle('Список услуг')

  const navigate = useNavigate()
  const { services, loading } = useSelector(({ entities }) => ({
    services: entities.services.data,
    loading: entities.services.fetch === 'pending' || entities.services.fetch === 'idle',
  }))

  useEffect(() => {
    EnititiesActions.servicesFetch()
  }, [])

  const handleClickService = (serviceId: number) => () => {
    navigate(`edit/${serviceId}`)
  }

  return (
    <Page
      title="Список услуг"
      titleLeftChild={
        <Button
          label="Добавить"
          textColor="surface"
          leftChild={<Plus color="surface" />}
          onClick={() => navigate('edit')}
        />
      }
    >
      {loading && (
        <Flexbox alignItems="center" justifyContent="center" h="7rem">
          <Spinner /> <Text ml="s">Загрузка услуг</Text>
        </Flexbox>
      )}
      {services.map((service) => (
        <Flexbox key={service.id} column mb="m" onClick={handleClickService(service.id)}>
          <Text>{service.category.name}</Text>
          <Text>Длительность: {service.duration} мин</Text>
          <Text>Стоимость: {service.price} ₽</Text>
        </Flexbox>
      ))}
    </Page>
  )
}
