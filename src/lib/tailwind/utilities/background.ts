import type { CSSRuleObject } from 'tailwindcss/types/config'
import { colorNames, colorPairings } from '../settings'

const backdropAlpha = 0.7
const hoverAlpha = 0.1

export default function generateBackgroundColors() {
  const backgroundColors: CSSRuleObject = {}

  colorNames.forEach((n) => {
    // Backdrops
    // Example: .bg-primary-backdrop-token
    backgroundColors[`.bg-${n}-backdrop-token`] = {
      'background-color': `rgb(var(--color-${n}-400) / ${backdropAlpha})`,
    }
    backgroundColors[`.dark .bg-${n}-backdrop-token`] = {
      'background-color': `rgb(var(--color-${n}-900) / ${backdropAlpha})`,
    }

    // Hover
    // Example: .bg-primary-hover-token
    backgroundColors[`.bg-${n}-hover-token:hover`] = {
      'background-color': `rgb(var(--color-${n}-500) / ${hoverAlpha})`,
    }
    backgroundColors[`.dark .bg-${n}-hover-token:hover`] = {
      'background-color': `rgb(var(--color-${n}-200) / ${hoverAlpha})`,
    }

    // Active
    // Example: .bg-primary-active-token
    backgroundColors[`.bg-${n}-active-token`] = {
      'background-color': `rgb(var(--color-${n}-500)) !important`,
      color: `rgb(var(--on-${n}))`,
      fill: `rgb(var(--on-${n}))`,
    }

    // Color Pairings
    // Example: .bg-primary-50-900-token | .bg-primary-900-50-token
    colorPairings.forEach((p) => {
      backgroundColors[`.bg-${n}-${p.light}-${p.dark}-token`] = {
        'background-color': `rgb(var(--color-${n}-${p.light}))`,
      }
      backgroundColors[`.dark .bg-${n}-${p.light}-${p.dark}-token`] = {
        'background-color': `rgb(var(--color-${n}-${p.dark}))`,
      }
    })
  })

  return backgroundColors
}
