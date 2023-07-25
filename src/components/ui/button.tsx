import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-tertiary-100-800-token transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary-300-600-token focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-on-primary-token hover:bg-primary-600',
        secondary: 'bg-secondary-500 text-on-secondary-token hover:bg-secondary-600',
        tertiary: 'bg-tertiary-500 text-on-tertiary-token hover:bg-tertiary-600',
        outline: 'bg-tertiary-500 text-on-tertiary-token hover:bg-tertiary-600',
        error: 'bg-error-500 text-on-error-token hover:bg-error-600',
        ghost: 'hover:bg-primary-500 hover:text-on-primary-token',
        link: 'hover:underline underline-offset-4',
      },
      size: {
        xs: 'h-6 rounded-md px-3',
        sm: 'h-9 rounded-md px-3',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
