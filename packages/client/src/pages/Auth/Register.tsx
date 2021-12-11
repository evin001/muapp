import React, { useState } from 'react'

import AuthPage from '.'

import { TextField, Button, Spinner, Flexbox, Text, useTheme } from '@stage-ui/core'
import PhoneInput from 'react-phone-input-2'

import useSelector from '~/hooks/useSelector'
import UserActions from '~/data/user'
import { PASSWORD_MIN_LEN, PHONE_FORMAT, EMAIL_FORMAT } from '~/utils/auth'

const Register = () => {
  const { color } = useTheme()
  const { fetchError, loading } = useSelector(({ user }) => ({
    fetchError: user.error,
    loading: user.fetch === 'pending',
  }))

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value)
    } else if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }

  const handleChangePhone = (value: string) => setPhone(value)

  const validate = () => {
    if (emailError) setEmailError('')
    if (phoneError) setPasswordError('')
    if (passwordError) setPasswordError('')

    if (!EMAIL_FORMAT.test(email)) {
      setEmailError('Пожалуйста, укажите корректный адрес электронной почты')
      return false
    }
    if (!PHONE_FORMAT.test(`+${phone}`)) {
      setPhoneError('Пожалуйста, укажите корректный номер телефона')
      return false
    }
    if (password.length < PASSWORD_MIN_LEN) {
      setPasswordError(`Пароль не может быть короче ${PASSWORD_MIN_LEN} символов`)
      return false
    }
    return true
  }

  const handleClickRegister = () => {
    if (validate()) {
      UserActions.register(email, `+${phone}`, password)
    }
  }

  return (
    <AuthPage
      title="Регистрация"
      subtitle="Создайте аккаунт, чтобы клиенты могли записаться к вам"
    >
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
        value={phone}
        placeholder="+7 (999) 999-99-99"
        onChange={handleChangePhone}
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
      <TextField
        value={password}
        name="password"
        onChange={handleChangeTextField}
        placeholder="Пароль"
        decoration="underline"
        color="surface"
        type="password"
        css={{ borderBottomColor: 'white' }}
        autoComplete="off"
      />
      <Button
        w="100%"
        label="Зарегистрироваться"
        css={{ fontWeight: 600 }}
        textColor={(c) => c.palette.orange}
        onClick={handleClickRegister}
        disabled={!(email && phone && password) || loading}
        leftChild={loading ? <Spinner /> : undefined}
      />
      <Flexbox h="1rem" justifyContent="center">
        <Text align="center" color="error">
          {emailError || passwordError || phoneError || fetchError}
        </Text>
      </Flexbox>
    </AuthPage>
  )
}

export default Register
