export const messages = [
  [
    'A user with this email address or phone number already exists',
    'Пользователь с таким адресом электронной почты или номером телефона уже существует',
  ],
  ['Network request failed', 'Сетевой запрос не выполнен'],
]

export const translate = (message: string) => {
  const trans = messages.find(([a]) => a === message)?.[1]
  return trans || message
}
