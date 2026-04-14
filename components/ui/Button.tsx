'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'text'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-rl-red text-white hover:bg-[#d91f5b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rl-red',
  secondary:
    'border border-current bg-transparent hover:bg-current/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current',
  ghost:
    'bg-transparent hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current',
  text: 'bg-transparent p-0 h-auto',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-4 text-body-sm',
  md: 'h-10 px-6 text-body-md',
  lg: 'h-12 px-8 text-body-lg',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center font-sans font-medium transition-all duration-200 cursor-pointer rounded',
    variant !== 'text' && sizeStyles[size],
    variantStyles[variant],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  const content =
    variant === 'text' ? (
      <span className="inline-flex items-center gap-2 group">
        {children}
        <motion.span
          className="inline-block"
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          &rarr;
        </motion.span>
      </span>
    ) : (
      children
    )

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {content}
    </button>
  )
}
