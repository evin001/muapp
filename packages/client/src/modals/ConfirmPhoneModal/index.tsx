import React, { useState } from 'react'

import { Grid, Flexbox, Text, TextField, Button, Link, Spinner } from '@stage-ui/core'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { UserActions } from '~/data/user'
import { Call } from '~/generated/graphql'
import { HintError } from '~/components/HintError'

type ConfirmPhoneModalProps = {
  phone: string
  onClose: () => void
}

type ConfrimPhoneFields = {
  code: string
}

const schema = yup.object({
  code: yup
    .string()
    .required()
    .matches(/^[0-9]{4}$/)
    .trim(),
})

export const ConfirmPhoneModal = ({ phone, onClose }: ConfirmPhoneModalProps) => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<ConfrimPhoneFields>({
    defaultValues: { code: '' },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })
  const [call, setCall] = useState<Call>()
  const [loading, setLoading] = useState(false)
  const [errorResponse, setErrorResponse] = useState('')
  console.log({ call, errorResponse })
  const handleForm = (data: ConfrimPhoneFields) => {}

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault()
    onClose()
  }

  const handleMakeCall = async () => {
    setLoading(true)
    setErrorResponse('')
    const res = await UserActions.makeCall(phone)
    setLoading(false)

    if (typeof res !== 'string') {
      setCall(res)
    } else {
      setErrorResponse(res)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleForm)}>
      <Grid gap="0.5rem">
        <Text>
          На указанный номер телефона поступит звонок. Звонок бесплатный, отвечать на него
          не нужно. Введите последние четыре цифры.
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
              rightChild={
                loading ? <Spinner /> : <Link onClick={handleMakeCall}>Отправить</Link>
              }
            />
          )}
        />
      </Grid>
      <HintError mt="0.25rem" error={errorResponse} />
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
