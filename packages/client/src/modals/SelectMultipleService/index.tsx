import React, { useState } from 'react'

import { Flexbox, Grid, Button, Text, Header, Checkbox, ScrollView } from '@stage-ui/core'

import { Category, Service } from '~/generated/graphql'
import { useSelector } from '~/hooks/useSelector'
import { selectServicesByParentCategory } from '~/data/enitities/select'

export type SelectMultipleServiceProps = {
  services?: string[]
  onClose: () => void
  onChange: (items: string[]) => void
}

export const SelectMultipleService = ({
  services,
  onChange,
  onClose,
}: SelectMultipleServiceProps) => {
  const servicesWithCategories = useSelector(selectServicesByParentCategory)
  const [items, setItems] = useState(services || [])

  const handleClickSelect = () => {
    onChange(items)
    onClose()
  }

  const handleClickItem = (id: string) => () => {
    const nextItems = [...items]
    if (nextItems.includes(id)) {
      setItems(nextItems.filter((item) => item !== id))
    } else {
      setItems(nextItems.concat(id))
    }
  }

  return (
    <Flexbox column>
      <ScrollView mb="0.5rem" xBarPosition="none" css={{ maxHeight: '50vh' }}>
        <Grid gap="0.5rem">
          {servicesWithCategories.map((serviceOrCategory) => {
            if (!serviceOrCategory) return null
            const category = (serviceOrCategory as Service)?.category
              ? null
              : (serviceOrCategory as Category)
            if (category) {
              return (
                <Header key={category.id} size="s" mt="s">
                  {category.name}
                </Header>
              )
            }

            const service = serviceOrCategory as Service

            return (
              <Flexbox key={service.id} onClick={handleClickItem(`${service.id}`)}>
                <Checkbox checked={items.includes(`${service.id}`)} />
                <Text ml="s">{service.category.name}</Text>
              </Flexbox>
            )
          })}
        </Grid>
      </ScrollView>
      <Flexbox justifyContent="flex-end" mt="m">
        <Button label="Отменить" onClick={onClose} decoration="plain" />
        <Flexbox w="1rem" />
        <Button textColor="surface" onClick={handleClickSelect}>
          <Text ml="s">Выбрать</Text>
        </Button>
      </Flexbox>
    </Flexbox>
  )
}
