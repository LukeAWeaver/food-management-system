import { createTamagui, createTokens } from '@tamagui/core'
import { themes, tokens as defaultTokens } from '@tamagui/themes'
import { createAnimations } from '@tamagui/animations-react-native'

const animations = createAnimations({
  quick: {
    type: 'spring',
    damping: 20,
    mass: 1,
    stiffness: 250,
  },
  slower: {
    type: 'timing',
    duration: 600,
  },
})

const tokens = createTokens({
  ...defaultTokens,
  color: {
    ...defaultTokens.color,
    // Core brand palette (edit to match your brand)
    brand1: '#101113',
    brand2: '#17181B',
    brand3: '#23252A',
    brand4: '#2E3137',
    brand5: '#3B3F47',
    brand6: '#4A4F59',
    brand7: '#5B616D',
    brand8: '#6E7584',
    brand9: '#8A91A0',
    brand10: '#A7AEBB',
    // Waste meter colors (fresh → rotten)
    wasteFresh: '#6EE7B7',
    wasteWarn: '#FCD34D',
    wasteBad: '#F59E0B',
    wasteRotten: '#EF4444'
  },
  radius: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 24,
    6: 32,
    round: 9999
  },
  size: {
    0: 0,
    1: 2,
    2: 4,
    3: 6,
    4: 8,
    5: 10,
    6: 12,
    7: 14,
    8: 16,
    9: 18,
    10: 20,
    12: 24,
    14: 28,
    16: 32,
    20: 40,
    24: 48,
    28: 56,
    32: 64,
    40: 80
  },
  zIndex: {
    0: 0,
    1: 1,
    2: 5,
    3: 10,
    4: 50,
    5: 100,
    modal: 1000,
    toast: 1100
  },
  space: {
    ...defaultTokens.space,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    '2xl': 32
  }
})

const config = createTamagui({
  tokens,
  animations,
  themes: {
    ...themes,
    // Optional custom theme for raccoon profile screen
    panda: {
      background: tokens.color.brand1,
      color: '#EAECEE',
      borderColor: '#2E3137'
    }
  },
  shorthands: {
    f: 'flex',
    ai: 'alignItems',
    jc: 'justifyContent',
    fd: 'flexDirection',
    br: 'borderRadius',
    px: 'paddingHorizontal',
    py: 'paddingVertical',
    mx: 'marginHorizontal',
    my: 'marginVertical',
    mt: 'marginTop',
    mb: 'marginBottom',
    pt: 'paddingTop',
    pb: 'paddingBottom',
    ml: 'marginLeft',
    mr: 'marginRight',
    pl: 'paddingLeft',
    pr: 'paddingRight',
    bc: 'backgroundColor',
    bw: 'borderWidth',
    boc: 'borderColor',
    btrr: 'borderTopRightRadius',
    btlr: 'borderTopLeftRadius',
    bbrr: 'borderBottomRightRadius',
    bblr: 'borderBottomLeftRadius',
    bg: 'backgroundColor',
    brw: 'borderRightWidth',
    blw: 'borderLeftWidth',
    btw: 'borderTopWidth',
    bbw: 'borderBottomWidth'
  },
  settings: {
    defaultTheme: 'light',
    shouldAddPrefersColorThemes: true,
    fastSchemeChange: true,
    excludeReactNativeWebExports: true,
  }
})
export type AppConfig = typeof config
/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config