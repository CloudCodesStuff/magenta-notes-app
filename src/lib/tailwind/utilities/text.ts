// Design Tokens: Text
// Doc: https://www.skeleton.dev/docs/tokens

import type { CSSRuleObject } from 'tailwindcss/types/config'
import { colorNames, colorPairings } from '../settings'

export default function generateTextTokens(): CSSRuleObject {
  const textTokens: CSSRuleObject = {
    // Font Family
    '.font-heading-token': { 'font-family': 'var(--theme-font-family-heading)' },
    '.font-token': { 'font-family': 'var(--theme-font-family-base)' },

    // Default Text Colors
    '.text-base-token': { color: 'rgba(var(--theme-font-color-base))' },
    '.text-dark-token': { color: 'rgba(var(--theme-font-color-dark))' },

    // Light/Dark Text Color  - ex: .text-token
    '.text-token': { color: 'rgba(var(--theme-font-color-base))' },
    '.dark .text-token': { color: 'rgba(var(--theme-font-color-dark))' },
  }

  colorNames.forEach((colorName) => {
    // On-X Text Colors
    // Example: .text-on-primary-token
    textTokens[`.text-on-${colorName}-token`] = { color: `rgb(var(--on-${colorName}))` }

    // Color Pairings
    // Example: .text-primary-50-900-token | .text-primary-900-50-token
    colorPairings.forEach((colorPairing) => {
      textTokens[`.text-${colorName}-${colorPairing.light}-${colorPairing.dark}-token`] = {
        color: `rgb(var(--color-${colorName}-${colorPairing.light}))`,
      }
      textTokens[`.dark .text-${colorName}-${colorPairing.light}-${colorPairing.dark}-token`] = {
        color: `rgb(var(--color-${colorName}-${colorPairing.dark}))`,
      }
    })
  })

  return textTokens
}
