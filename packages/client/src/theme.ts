import { light } from '@stage-ui/core/themes'

declare global {
  namespace Stage {
    interface Palette<Color> {
      orange: Color

      content1: Color
      content2: Color
      content3: Color

      accent1: Color

      amber100: Color
      amber500: Color
      green100: Color
      green500: Color
      purple100: Color
      purple500: Color
      cyan100: Color
      cyan500: Color
      pink100: Color
      pink500: Color
      indigo100: Color
      indigo500: Color
      blue100: Color
      blue500: Color
      red100: Color
      red500: Color
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

        content1: [222, 218, 217],
        content2: [255, 216, 205],
        content3: [205, 193, 190],

        accent1: [255, 154, 125],

        amber100: [255, 235, 204],
        amber500: [250, 175, 63],
        green100: [214, 249, 240],
        green500: [13, 208, 149],
        purple100: [236, 221, 255],
        purple500: [163, 97, 235],
        cyan100: [208, 251, 255],
        cyan500: [34, 195, 210],
        pink100: [255, 229, 238],
        pink500: [253, 95, 155],
        indigo100: [229, 238, 255],
        indigo500: [95, 149, 253],
        blue100: [229, 245, 255],
        blue500: [95, 196, 253],
        red100: [255, 229, 229],
        red500: [253, 95, 95],
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
    Checkbox: () => ({
      check: [
        {
          borderRadius: '0.25rem',
        },
      ],
    }),
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
    // Select: (props) => ({
    //   input: [
    //     props.disabled && {
    //       // color: 'rgb(150,150,150)',
    //       '&:disabled': {
    //         // opacity: '1 !important',
    //       },
    //     },
    //   ],
    // }),
  }),
})

export default theme
