// Design Tokens: SVG Fill
// Doc: https://www.skeleton.dev/docs/tokens

import type { CSSRuleObject } from 'tailwindcss/types/config'
import { colorNames } from '../settings'

export default function generateFillTokens(): CSSRuleObject {
  const fillTokens: CSSRuleObject = {
    '.fill-base-token': { fill: 'rgba(var(--theme-font-color-base))' },
    '.fill-dark-token': { fill: 'rgba(var(--theme-font-color-dark))' },
    // Fill Token - ex: .fill-token
    '.fill-token': { fill: 'rgba(var(--theme-font-color-base))' },
    '.dark .fill-token': { fill: 'rgba(var(--theme-font-color-dark))' },
  }

  colorNames.forEach((n) => {
    // On-X Fill Colors
    // Example: .fill-on-primary-token
    fillTokens[`.fill-on-${n}-token`] = { fill: `rgb(var(--on-${n}))` }
  })

  return fillTokens
}
