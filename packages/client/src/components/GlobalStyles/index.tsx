import React from 'react'

import { css, Global } from '@emotion/react'

import LogoFont from '~/assets/fonts/Moonbright-regular.ttf'
import OfficinaSansR from '~/assets/fonts/OfficinaSans-regular.ttf'
import OfficinaSansM from '~/assets/fonts/OfficinaSans-medium.ttf'
import OfficinaSansB from '~/assets/fonts/OfficinaSans-bold.ttf'

import { font } from '~/theme'

const FontFace = (url: string, style: string, weight: number, family: string) =>
  css(`
  @font-face {
    font-family: '${family}';
    font-weight: ${weight};
    font-style: ${style};
    src: url('${url}') format('truetype');
  }`)

const GlobalStyles = () => (
  <Global
    styles={[
      FontFace(OfficinaSansR, 'regular', 400, font.regular),
      FontFace(OfficinaSansM, 'regular', 600, font.medium),
      FontFace(OfficinaSansB, 'regular', 800, font.bold),
      FontFace(LogoFont, 'regular', 400, 'Moonbright'),
      {
        'html,body,#app': {
          fontFamily: `${font.regular}, sans-serif`,
          fontWeight: 400,
        },
        '*': {
          boxSizing: 'border-box',
        },
      },
    ]}
  />
)

export default GlobalStyles
