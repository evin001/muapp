import React from 'react'

import { Flexbox, Text, useTheme } from '@stage-ui/core'
import PhoneInput from 'react-phone-input-2'

import { font } from '~/theme'

type PhoneFieldProps = {
  label?: string
  value: string
  rightChild?: React.ReactNode
  onChange: (value: string) => void
}

export const PhoneField = ({ value, label, rightChild, onChange }: PhoneFieldProps) => {
  const { color } = useTheme()

  const handleChange = (v: string) => {
    onChange(`+${v}`)
  }

  return (
    <Flexbox column flex={1}>
      {label && (
        <Text mb="0.25rem" size="s" color="hard">
          {label}
        </Text>
      )}
      <Flexbox
        flex={1}
        css={{
          '& > div:first-child': {
            width: '100%',
            '& ::placeholder': { color: color.light.hex() },
            '& > input:focus': {
              borderColor: `${color.error.rgb().fade(0.6).toString()} !important`,
            },
          },
        }}
      >
        <PhoneInput
          country="ru"
          value={value}
          placeholder="+7 (999) 999-99-99"
          onChange={handleChange}
          specialLabel=""
          inputStyle={{
            background: color.surface.hex(),
            width: '100%',
            minHeight: '2.5rem',
            borderWidth: '0.0625rem',
            borderRadius: '1.5rem',
            padding: '0 0.75rem',
            borderColor: color.light.rgb().fade(0.6).toString(),
            boxShadow: 'inset 0px 1px 1px rgb(0 0 0 / 8%)',
            color: color.onBackground.hex(),
            fontSize: '1rem',
            fontFamily: `${font.regular}, sans-serif`,
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'border 0.125s',
          }}
        />
        {rightChild && (
          <Flexbox
            css={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              paddingRight: '0.75rem',
            }}
          >
            {rightChild}
          </Flexbox>
        )}
      </Flexbox>
    </Flexbox>
  )
}
