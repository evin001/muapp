import React from 'react'

import { TextField } from '@stage-ui/core'
import TextFieldTypes from '@stage-ui/core/control/TextField/types'

type TimeFieldProps = { onChange: (value: string) => void } & TextFieldTypes.Props

export const TIME_FORMAT = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/

export const TimeField = ({ onChange, ...props }: TimeFieldProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let nextValue = event.target.value
    const sourceValue = props.value?.toString() || ''

    const more = sourceValue.length > nextValue.length
    const less = sourceValue.length < nextValue.length

    if (/[^\d:]/.test(nextValue)) {
      nextValue = sourceValue
    }

    if (nextValue.length === 3) {
      nextValue = more
        ? nextValue.substring(0, 2)
        : `${nextValue.substring(0, 2)}:${nextValue.substring(2, 3)}`
    } else if (nextValue.length === 2) {
      nextValue = more ? nextValue.substring(0, 1) : `${nextValue}:`
    } else if (nextValue.length === 1) {
      if (less && +nextValue > 2 && +nextValue <= 9) {
        nextValue = `0${nextValue}`
      }
    }

    onChange(nextValue)
  }
  return (
    <TextField
      {...props}
      placeholder="00:00"
      pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
      onChange={handleChange}
    />
  )
}
