import { User } from '~/generated/graphql'

export const PASSWORD_MIN_LEN = 6

export const PHONE_FORMAT = /^\+[1-9]\d{1,14}$/
export const EMAIL_FORMAT =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export const verify = (
  value: string,
  type: 'email' | 'phone' | 'password',
): { ok: boolean; error: string } => {
  if (type === 'email' && !EMAIL_FORMAT.test(value)) {
    return { ok: false, error: 'Пожалуйста, укажите корректный адрес электронной почты' }
  }
  if (type === 'password' && !PHONE_FORMAT.test(`+${value}`)) {
    return { ok: false, error: 'Пожалуйста, укажите корректный номер телефона' }
  }
  if (type === 'password' && value.length < PASSWORD_MIN_LEN) {
    return {
      ok: false,
      error: `Пароль не может быть короче ${PASSWORD_MIN_LEN} символов`,
    }
  }
  return { ok: true, error: '' }
}

export const UserStorage = {
  get: () => {
    const storageUser = localStorage.getItem('user')
    return storageUser ? (JSON.parse(storageUser) as User) : null
  },
  set: (data: User) => {
    localStorage.setItem('user', JSON.stringify(data))
  },
  reset: () => {
    localStorage.removeItem('user')
  },
}
