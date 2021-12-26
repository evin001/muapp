import React, { useEffect } from 'react'

import { Button, Spinner, Text, Flexbox, Grid } from '@stage-ui/core'
import { Plus, Timer, Trash } from '@stage-ui/icons'
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
        <Flexbox
          key={service.id}
          mb="m"
          p="0 m"
          h="3rem"
          alignItems="center"
          justifyContent="space-between"
          backgroundColor="onPrimary"
          borderColor="surface"
          borderStyle="solid"
          borderWidth="0.0625rem"
          borderRadius="0.3125rem"
        >
          <Grid templateColumns="70% 1fr 1fr" flex={1} alignItems="center">
            <Text
              size="m"
              onClick={handleClickService(service.id)}
              css={{ '&:hover': { textDecoration: 'underline' } }}
            >
              {service.category.name}
            </Text>
            <Flexbox alignItems="center">
              <Text color="onSecondary" size="m" mr="0.25rem">
                {service.duration}
              </Text>
              <Timer size="m" color="onSecondary" />
            </Flexbox>
            <Text color="onSecondary" size="m">
              {service.price} ₽
            </Text>
          </Grid>
          <Trash size="m" color="primary" />
        </Flexbox>
      ))}
    </Page>
  )
}
