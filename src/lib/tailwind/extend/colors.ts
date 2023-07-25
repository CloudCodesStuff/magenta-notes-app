// Extends Tailwind with Skeleton theme-specific colors values
// Doc: https://tailwindcss.com/docs/customizing-colors#using-css-variables

import { ThemeConfig } from 'tailwindcss/types/config'
import { colorShades, colorNames } from '../settings'

/**
 * @example `50: 'rgb(var(--color-primary-50) / <alpha-value>)'`
 */
function generatePaletteShades(colorName: string): Record<string, string> {
  const paletteShades: Record<string, string> = {}

  colorShades.forEach((s) => (paletteShades[s] = `rgb(var(--color-${colorName}-${s}) / 1)`))

  return paletteShades
}

/**
 * Generate a color shade palette 50-900 per each color available.
 */
export default function generateColorShadePalette(): ThemeConfig['colors'] {
  const colorShadePalette: ThemeConfig['colors'] = {}

  colorNames.forEach((n) => (colorShadePalette[n] = generatePaletteShades(n)))

  return colorShadePalette
}
