import React from 'react'

import { css, Global } from '@emotion/react'

import BaseFont from '../../assets/fonts/OfficinaSansBookC-regular.ttf'
import LogoFont from '../../assets/fonts/Moonbright-regular.ttf'

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
      FontFace(BaseFont, 'regular', 400, 'OfficinaSansBookC'),
      FontFace(LogoFont, 'regular', 400, 'Moonbright'),
      {
        'html,body,#app': {
          fontFamily: 'OfficinaSansBookC, sans-serif',
          fontWeight: 400,
        },
      },
    ]}
  />
)

export default GlobalStyles
