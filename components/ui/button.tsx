import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'relative text-white',
        outline: 'border border-white/15 bg-transparent text-text',
        ghost: 'bg-transparent hover:bg-white/5',
      },
      shape: {
        pill: 'rounded-full',
        rounded: 'rounded-lg',
      },
      size: {
        sm: 'h-9 px-4',
        md: 'h-11 px-6',
        lg: 'h-12 px-8',
      },
      dotted: {
        true: 'dotted-ring',
        false: '',
      },
      gradient: {
        true: 'relative',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      shape: 'pill',
      size: 'md',
      dotted: false,
      gradient: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, shape, size, dotted, gradient, children, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, shape, size, dotted, gradient }), className)} ref={ref} {...props}>
        {gradient ? (
          <>
            <span className="absolute inset-0 rounded-full bg-brandGradient blur-sm opacity-60" />
            <span className="relative rounded-full bg-brandGradient px-1 py-0.5">{children}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';

