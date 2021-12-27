import { light } from '@stage-ui/core/themes'

declare global {
  namespace Stage {
    interface Palette<Color> {
      orange: Color
    }
  }
}

export const font = {
  regular: 'OfficinaSans Regular',
  medium: 'OfficinaSans Medium',
  bold: 'OfficinaSans Bold',
}

const theme = light.replace({
  main: {
    color: {
      // accent
      primary: [227, 133, 107],
      success: [163, 227, 107],
      error: [227, 113, 107],

      // dominant
      background: [245, 239, 237],
      onPrimary: [250, 246, 245],

      // content
      onBackground: [102, 79, 72],
      onSecondary: [140, 122, 116],
      hard: [64, 42, 36],
      lightest: [222, 218, 217],

      // other
      secondary: [255, 228, 137],
      palette: {
        orange: [168, 124, 51],
      },
    },
    radius: {
      xs: '0.5rem',
      s: '1rem',
      m: '1.5rem',
      l: '1.75rem',
      xl: '2rem',
    },
  },
  overrides: (main) => ({
    Button: () => ({
      container: [
        {
          fontFamily: font.regular,
        },
      ],
    }),
    TextField: (props) => ({
      input: [
        props.decoration === 'underline' && {
          color: main.color.surface.string(),
          '&:-webkit-autofill': {
            WebkitTextFillColor: main.color.surface.string(),
            transition: 'background-color 5000s ease-in-out 0s',
          },
          '&::placeholder': {
            color: main.color.surface.string(),
          },
        },
      ],
    }),
  }),
})

export default theme
