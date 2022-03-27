import React, { useEffect } from 'react'

import { Flexbox, Button, Text, Grid, TextField } from '@stage-ui/core'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

type ConfirmPhoneModalProps = {
  onClose: () => void
}

type ConfrimEmailFields = {
  code: string
}

const schema = yup.object({
  code: yup
    .string()
    .required()
    .matches(/^[0-9]{4}$/)
    .trim(),
})

export const ConfirmEmailModal = ({ onClose }: ConfirmPhoneModalProps) => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<ConfrimEmailFields>({
    defaultValues: { code: '' },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    console.log(1)
  }, [])

  const handleForm = (data: ConfrimEmailFields) => {
    console.log(data)
  }

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault()
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(handleForm)}>
      <Grid>
        <Text>
          На указанный адрес электронной почты отправлено письмо с кодом подтверждения.
          Введите последние четыре цифры.
        </Text>
        <Controller
          name="code"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextField
              mt="s"
              placeholder="Введите код"
              value={value}
              onChange={(e) => {
                onChange(e.target.value)
              }}
            />
          )}
        />
      </Grid>
      <Flexbox justifyContent="flex-end" mt="m">
        <Button label="Отменить" onClick={handleClose} decoration="plain" />
        <Flexbox w="1rem" />
        <Button textColor="surface" disabled={!isValid} type="submit">
          <Text>Подтвердить</Text>
        </Button>
      </Flexbox>
    </form>
  )
}
