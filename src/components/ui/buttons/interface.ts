import { type VariantProps, cva } from 'class-variance-authority';
import { c } from '../../../utils/css';

type ButtonProps = VariantProps<typeof buttonVariants>;
const buttonVariants = cva(c('rounded focus-visible:outline-none'), {
  variants: {
    variant: {
      primary: 'bg-sky-500 hover:bg-sky-600',
      success: 'bg-green-500 hover:bg-green-600',
      ghost: 'bg-gray-500 hover:bg-gray-600',
      question: 'p-2 rounded-lg border'
    },
    size: {
      normal: 'px-3 py-2 text-base',
      lg: 'px-5 py-4 text-lg',
    },
    disabled: {
      true: 'opacity-50 pointer-events-none',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'normal',
  },
});

export { type ButtonProps, buttonVariants };
