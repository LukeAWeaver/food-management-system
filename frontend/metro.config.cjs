/* eslint-env node */
/* global require, module, __dirname, process */
const { getDefaultConfig } = require('expo/metro-config')
const { withTamagui } = require('@tamagui/metro-plugin')

const config = getDefaultConfig(__dirname)

module.exports = withTamagui(
  config,
  {
    config: './tamagui.config.ts',
    components: ['tamagui', '@tamagui/lucide-icons'],
    // Disable extraction in dev to reduce flakiness while iterating
    disableExtraction:
      process.env.TAMAGUI_DISABLE_EXTRACTION === '1' ||
      process.env.NODE_ENV === 'development',
  }
)
