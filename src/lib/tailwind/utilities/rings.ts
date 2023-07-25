// Design Tokens: Rings
// Doc: https://www.skeleton.dev/docs/tokens

import type { CSSRuleObject } from 'tailwindcss/types/config'
import { colorNames, colorPairings } from '../settings'

// Local
const ringTokenTheme = {
  '--tw-ring-offset-shadow': `var(--tw-ring-inset) 0 0 0 var(--theme-border-base) var(--tw-ring-offset-color)`,
  '--tw-ring-shadow': `var(--tw-ring-inset) 0 0 0 calc(2px + var(--theme-border-base)) var(--tw-ring-color)`,
  'box-shadow': `var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)`,
}

const ringOutlineShared = {
  // .ring-[1px]
  '--tw-ring-offset-shadow':
    'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
  '--tw-ring-shadow':
    'var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
  'box-shadow': 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',

  // .ring-inset
  '--tw-ring-inset': 'inset',
}

export default function generateRingTokens() {
  const classes: CSSRuleObject = {
    '.ring-token': {
      ...ringTokenTheme,
    },
    // Ring Outline (for cards)
    // Example: .ring-outline-token
    '.ring-outline-token': {
      ...ringOutlineShared,
      '--tw-ring-color': 'rgb(23 23 23 / 0.05);', // neutral-900, 5% opacity
    },
    '.dark .ring-outline-token': {
      ...ringOutlineShared,
      '--tw-ring-color': 'rgb(250 250 250 / 0.05)', // neutral-50, 5% opacity
    },
  }

  colorNames.forEach((colorName) => {
    // Color Pairings
    // Example: .ring-primary-50-900-token | .ring-primary-900-50-token
    colorPairings.forEach((colorPairing) => {
      classes[`.ring-${colorName}-${colorPairing.light}-${colorPairing.dark}-token`] = {
        '--tw-ring-color': `rgb(var(--color-${colorName}-${colorPairing.light}) / 1)`,
      }
      classes[`.dark .ring-${colorName}-${colorPairing.light}-${colorPairing.dark}-token`] = {
        '--tw-ring-color': `rgb(var(--color-${colorName}-${colorPairing.dark}) / 1)`,
      }
    })
  })

  return classes
}
