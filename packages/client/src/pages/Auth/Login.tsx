import React, { useState } from 'react'

import { Flexbox, Grid, TextField, Button, Text } from '@stage-ui/core'

import CompanyLogo from '~/components/CompanyLogo'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value)
    } else if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }

  return (
    <Flexbox column h="100%" justifyContent="center">
      <Flexbox column pb="1.75rem">
        <CompanyLogo />
        <Text mb="s" size="2rem" color="surface" align="center">
          Вход
        </Text>
        <Text
          px="1.25rem"
          color="surface"
          size="1.25rem"
          lineHeight="1.25rem"
          align="center"
        >
          Войдите, чтобы использовать все возможности системы
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
        />
        <TextField
          value={password}
          name="password"
          onChange={handleChangeTextField}
          placeholder="Пароль"
          decoration="underline"
          type="password"
          color="surface"
          css={{ borderBottomColor: 'white' }}
        />
        <Button
          w="100%"
          label="Вход"
          css={{ fontWeight: 600 }}
          textColor={(c) => c.palette.orange}
        />
        <Button
          w="100%"
          label="Регистрация"
          css={{ fontWeight: 600 }}
          textColor={(c) => c.palette.orange}
        />
      </Grid>
    </Flexbox>
  )
}

export default Login
