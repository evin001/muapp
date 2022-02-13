import React from 'react'

import { Flexbox, Text, Button } from '@stage-ui/core'
import { CheckmarkCircle } from '@stage-ui/icons'

type ChangeSuccessPasswordProps = {
  onClose: () => void
}

export const ChangeSuccessPassword = ({ onClose }: ChangeSuccessPasswordProps) => (
  <Flexbox column>
    <Flexbox alignItems="center">
      <CheckmarkCircle color="success" size="xl" />
      <Text ml="s" size="1.125rem">
        Пароль успешно изменён!
      </Text>
    </Flexbox>
    <Button
      mt="m"
      w="7rem"
      label="Готово"
      textColor="surface"
      alignSelf="flex-end"
      onClick={onClose}
    />
  </Flexbox>
)
