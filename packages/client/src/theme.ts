import { light } from '@stage-ui/core/themes'

declare global {
  namespace Stage {
    interface Palette<Color> {
      orange: Color
    }
  }
}

const baseFontSize = (size: string | undefined) =>
  !size && {
    fontSize: '1.125rem',
  }

const theme = light.replace({
  main: {
    color: {
      primary: [255, 228, 137],
      error: [173, 20, 87],
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
    Button: (props) => ({
      container: [
        {
          fontFamily: 'OfficinaSansBookC',
        },
        baseFontSize(props.size),
      ],
    }),
    TextField: (props) => ({
      input: [
        baseFontSize(props.size),
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
