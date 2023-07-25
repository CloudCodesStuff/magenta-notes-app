// Design Tokens: Borders
// Doc: https://www.skeleton.dev/docs/tokens

import type { CSSRuleObject } from 'tailwindcss/types/config'
import { colorNames, colorPairings } from '../settings'

export default function generateBorderTokens(): CSSRuleObject {
  const borderTokens: CSSRuleObject = {
    // Border Width - ex: .border-token
    '.border-token': { 'border-width': 'var(--theme-border-base)' },
  }

  colorNames.forEach((colorName) => {
    // Color Pairings
    // Example: .border-primary-50-900-token | .border-primary-900-50-token
    colorPairings.forEach((colorPairing) => {
      borderTokens[`.border-${colorName}-${colorPairing.light}-${colorPairing.dark}-token`] = {
        'border-color': `rgb(var(--color-${colorName}-${colorPairing.light}))`,
      }
      borderTokens[`.dark .border-${colorName}-${colorPairing.light}-${colorPairing.dark}-token`] =
        { 'border-color': `rgb(var(--color-${colorName}-${colorPairing.dark}))` }
    })
  })

  return borderTokens
}
