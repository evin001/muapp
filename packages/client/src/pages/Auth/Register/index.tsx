import React, { useState } from 'react'

import { Flexbox, Grid, TextField, Button, Text, useTheme } from '@stage-ui/core'
import PhoneInput from 'react-phone-input-2'

import CompanyLogo from '~/components/CompanyLogo'

const Register = () => {
  const { color, assets, radius } = useTheme()
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneNumberError, setPhoneNumberError] = useState('')

  const handleChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value)
    } else if (e.target.name === 'phone') {
      setPhoneNumber(e.target.value)
    }
  }

  const handleChangePhoneNumber = () => {}

  return (
    <Flexbox column h="100%" justifyContent="center">
      <Flexbox column pb="1.75rem">
        <CompanyLogo />
        <Text mb="s" size="2rem" color="surface" align="center">
          Регистрация
        </Text>
        <Text
          px="1.25rem"
          color="surface"
          size="1.25rem"
          lineHeight="1.25rem"
          align="center"
        >
          Создайте аккаунт, чтобы клиенты могли записаться к вам
        </Text>
      </Flexbox>
      <Grid p="2rem" gap="1rem">
        <TextField
          value={email}
          name="email"
          onChange={handleChangeTextField}
          placeholder="Электронная почта"
          decoration="underline"
          color="surface"
          type="email"
          css={{ borderBottomColor: 'white' }}
          autoComplete="off"
        />
        <PhoneInput
          country="ru"
          value={phoneNumber}
          placeholder="+7 (999) 999-99-99"
          onChange={handleChangePhoneNumber}
          specialLabel=""
          inputStyle={{
            background: 'transparent',
            width: '100%',
            minHeight: '2.5rem',
            border: 'none',
            borderBottomWidth: '0.0625rem',
            borderBottomStyle: 'solid',
            borderColor: color.surface.hex(),
            display: 'flex',
            alignItems: 'center',
            color: color.surface.hex(),
            fontSize: '1.125rem',
            fontFamily: 'OfficinaSansBookC',
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'border 0.125s',
          }}
        />
        <Button
          w="100%"
          label="Зарегистрироваться"
          css={{ fontWeight: 600 }}
          textColor={(c) => c.palette.orange}
        />
      </Grid>
    </Flexbox>
  )
}

export default Register
