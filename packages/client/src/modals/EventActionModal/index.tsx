import React, { useState } from 'react'

import { Grid, Flexbox, Button, Text } from '@stage-ui/core'

type EventActionModalProps = {
  label: string
  onClose: () => void
  onConfirm: (variant: EventVariant) => void
}

type EventVariant = 'current' | 'next' | 'all'

const variantOptions: { text: string; value: EventVariant }[] = [
  { text: 'Текущее событие', value: 'current' },
  { text: 'Текущие и все последующие события', value: 'next' },
  { text: 'Все события', value: 'all' },
]

export const EventActionModal = ({
  label,
  onClose,
  onConfirm,
}: EventActionModalProps) => {
  const [variant, setVariant] = useState<EventVariant>('current')

  const handleClickConfirm = () => {
    onConfirm(variant)
    onClose()
  }

  return (
    <Flexbox column>
      <Grid gap="0.5rem">
        {variantOptions.map((option) => (
          <Flexbox key={option.value} onClick={() => setVariant(option.value)}>
            <Text
              color={variant === option.value ? 'primary' : undefined}
              css={{ transition: 'color .2' }}
            >
              {option.text}
            </Text>
          </Flexbox>
        ))}
      </Grid>
      <Flexbox justifyContent="flex-end" mt="m">
        <Button label="Отменить" onClick={onClose} decoration="plain" />
        <Flexbox w="1rem" />
        <Button textColor="surface" onClick={handleClickConfirm}>
          <Text ml="s">{label}</Text>
        </Button>
      </Flexbox>
    </Flexbox>
  )
}
