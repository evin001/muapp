import * as yup from 'yup'

import { TIME_FORMAT } from '~/components/TimeField'

export const colorSaturation = 500

export const colorOptions = [
  { text: 'Оранжевый', value: 'amber' },
  { text: 'Зелёный', value: 'green' },
  { text: 'Фиолетовый', value: 'purple' },
  { text: 'Голубой', value: 'cyan' },
  { text: 'Розовый', value: 'pink' },
  { text: 'Индиго', value: 'indigo' },
  { text: 'Синий', value: 'blue' },
  { text: 'Красный', value: 'red' },
]

export const schema = yup.object({
  date: yup.string().required('Пожалуйста, укажите дату'),
  intervalStart: yup
    .string()
    .required('Пожалуйста, временной интервал')
    .matches(TIME_FORMAT, 'Пожалуйста, введите корректное время'),
  intervalEnd: yup
    .string()
    .required('Пожалуйста, временной интервал')
    .matches(TIME_FORMAT, 'Пожалуйста, введите корректное время')
    .test('time', 'Пожалуйста, введите корректный интервал', function (value) {
      return !!value && this.parent.intervalStart < value
    }),
  color: yup.string().required('Пожалуйста, укажите цвет'),
  type: yup.string().required('Пожалуйста, укажите повторение'),
})
