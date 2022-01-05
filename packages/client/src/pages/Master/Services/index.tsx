import React, { useEffect } from 'react'

import { Button, Spinner, Text, Header, Flexbox, Grid, dialog } from '@stage-ui/core'
import { Plus, Timer, Trash } from '@stage-ui/icons'
import { useNavigate } from 'react-router-dom'

import { Page } from '~/components/Page'
import { useTitle } from '~/hooks/useTitle'
import { useSelector } from '~/hooks/useSelector'
import { EnititiesActions } from '~/data/enitities'
import { font } from '~/theme'
import { DeleteServiceModal } from '~/modals/DeleteServiceModal'
import { ListPlaceholder } from '~/components/ListPlaceholder'
import PlaceholderImage from '~/assets/images/casual-life-3d-freelancer-workspace.png'

export const Services = () => {
  useTitle('Список услуг')

  const navigate = useNavigate()
  const { services, categories, loading } = useSelector(({ entities }) => ({
    services: entities.services.data,
    categories: entities.categories.data,
    loading:
      entities.services.fetch === 'pending' ||
      entities.services.fetch === 'idle' ||
      entities.categories.fetch === 'pending' ||
      entities.categories.fetch === 'idle',
  }))

  useEffect(() => {
    EnititiesActions.categoriesFetch()
    EnititiesActions.servicesFetch()
  }, [])

  const handleClickService = (serviceId: number) => () => {
    navigate(`edit/${serviceId}`)
  }

  const handleClickDelete = (serviceId: number, category: string) => () => {
    dialog({
      title: 'Удаление услуги',
      render: (close) => (
        <DeleteServiceModal serviceId={serviceId} category={category} onClose={close} />
      ),
    })
  }

  let parentId: number

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
      {!services.length && (
        <ListPlaceholder
          title="Вы ещё не добавили ни одной услуги"
          image={PlaceholderImage}
        />
      )}
      {services.map((service) => {
        const { category } = service
        let categoryName = ''
        if (category.parentId && parentId !== category.parentId) {
          parentId = category.parentId
          categoryName = categories.find((c) => c.id === parentId)?.name || ''
        }

        return (
          <React.Fragment key={service.id}>
            {categoryName && (
              <Header size="s" m="0.25rem 0 s" css={{ fontFamily: font.medium }}>
                {categoryName}
              </Header>
            )}
            <Flexbox
              mb="s"
              p="s m"
              alignItems="center"
              justifyContent="space-between"
              backgroundColor="onPrimary"
              borderColor="surface"
              borderStyle="solid"
              borderWidth="0.0625rem"
              borderRadius="0.3125rem"
              css={{ minHeight: '3rem' }}
            >
              <Grid templateColumns="1fr 2.875rem 3.375rem" flex={1} alignItems="center">
                <Text
                  pr="m"
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
              <Trash
                size="m"
                color="primary"
                onClick={handleClickDelete(service.id, service.category.name)}
              />
            </Flexbox>
          </React.Fragment>
        )
      })}
    </Page>
  )
}
