import React from 'react'
import type { OnlyMutableProperties } from '@/lib/utils/properties'

/**
 * A utility class that makes it marginally easier to create the weird looking forward refs.
 *
 * @example
 *
 * BEFORE:
 *
 * ```tsx
 * const AccordionItem = React.forwardRef<
 *  React.ElementRef<typeof AccordionPrimitive.Item>,
 *  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
 * >(({ className, ...props }, ref) => (
 *    <AccordionPrimitive.Item ref={ref} className={cn('border-b', className)} {...props} />
 * ))
 *
 * ```
 *
 * AFTER:
 *
 * ```tsx
 * const AccordionItem = UiForwardRef<typeof AccordionPrimitive.Item>(
 * ({ className, ...props }, ref) => (
 *   <AccordionPrimitive.Item ref={ref} className={cn('border-b', className)} {...props} />
 * ))
 * ```
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function UiForwardRef<T extends React.ForwardRefExoticComponent<any>>(
  render: React.ForwardRefRenderFunction<React.ElementRef<T>, React.ComponentPropsWithoutRef<T>>,
  properties: Partial<
    OnlyMutableProperties<
      React.ForwardRefExoticComponent<
        React.PropsWithoutRef<React.ElementRef<T>> &
        React.RefAttributes<React.ComponentPropsWithoutRef<T>>
      >
    >
  > = {},
) {
  const componentWithForwardedRef = React.forwardRef<
    React.ElementRef<T>,
    React.ComponentPropsWithoutRef<T>
  >(render)

  Object.keys(properties).forEach((property) => {
    componentWithForwardedRef[property as keyof typeof properties] = properties[
      property as keyof typeof properties
    ] as any // eslint-disable-line @typescript-eslint/no-explicit-any
  })

  return componentWithForwardedRef
}
