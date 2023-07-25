import plugin from 'tailwindcss/plugin'

import generateBackgroundColors from './utilities/background'
import generateBorderRadiusTokens from './utilities/border-radius'
import generateBorderTokens from './utilities/borders'
import generateFillTokens from './utilities/fills'
import generateRingTokens from './utilities/rings'
import generateTextTokens from './utilities/text'

import generateColorShadePalette from './extend/colors'

export default plugin(
  ({ addUtilities }) => {
    addUtilities({
      ...generateBackgroundColors(),
      ...generateBorderRadiusTokens(),
      ...generateBorderTokens(),
      ...generateFillTokens(),
      ...generateRingTokens(),
      ...generateTextTokens(),
    })
  },
  {
    theme: {
      extend: {
        colors: generateColorShadePalette(),
      },
    },
  },
)
